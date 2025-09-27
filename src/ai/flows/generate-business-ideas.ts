
'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating business ideas based on current trends and news.
 *
 * The flow takes a count and optional categories and returns a list of business ideas.
 * - generateBusinessIdeas - A function that triggers the business idea generation process.
 * - BusinessIdea - The type definition for a single business idea.
 * - BusinessIdeasOutput - The output type for the generateBusinessIdeas function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const BusinessIdeaSchema = z.object({
  idea: z.string().describe('A business idea based on current trends and news.'),
  category: z.string().describe('The category of the business idea (e.g., online, offline, tech, food).'),
  source: z.string().describe('The credible source of the trend or news that inspired this idea (e.g., a news headline from a specific publication like Bloomberg, a recent event, a market report, or a discussion on Hacker News or Indie Hackers).'),
});

export type BusinessIdea = z.infer<typeof BusinessIdeaSchema>;

const GenerateBusinessIdeasInputSchema = z.object({
    count: z.number().default(3).describe('The number of business ideas to generate.'),
    categories: z.array(z.string()).optional().describe('A list of categories to focus on for idea generation.'),
});

export type GenerateBusinessIdeasInput = z.infer<typeof GenerateBusinessIdeasInputSchema>;


const BusinessIdeasOutputSchema = z.object({
  ideas: z.array(BusinessIdeaSchema).optional().describe('A list of business ideas.'),
  error: z.string().optional().describe('An error message if the operation failed, e.g. due to rate limiting.'),
});

export type BusinessIdeasOutput = z.infer<typeof BusinessIdeasOutputSchema>;


export async function generateBusinessIdeas(input: GenerateBusinessIdeasInput): Promise<BusinessIdeasOutput> {
  try {
    return await generateBusinessIdeasFlow(input);
  } catch (e: any) {
    return { error: e.message };
  }
}

const prompt = ai.definePrompt({
  name: 'businessIdeaPrompt',
  input: {schema: GenerateBusinessIdeasInputSchema},
  prompt: `You are a business idea generator. It is currently ${new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })}. The ideas you generate must be relevant to right now. Generate a list of innovative business ideas based on current trends and news from credible sources. For each idea, you must cite the specific source name (e.g., Bloomberg, TechCrunch, Hacker News, Indie Hackers, a specific market report).

  {{#if categories}}
  The generated ideas MUST be related to the following categories: {{{categories}}}.
  {{/if}}

  Structure your output in JSON format. Here are some examples of the desired output format:
  {
    "idea": "An AI-powered platform for personalized corporate training, adapting to employee learning styles.",
    "category": "Online, Tech, B2B",
    "source": "Trending on Hacker News"
  }
  {
    "idea": "Subscription box for artisanal and sustainable coffee from around the world.",
    "category": "Online, Food, Subscription",
    "source": "Reported by Bloomberg"
  }
  {
    "idea": "A marketplace for upcycled and refurbished furniture, focusing on sustainability.",
    "category": "Online, Retail, Eco-friendly",
    "source": "Inspired by a discussion on Indie Hackers"
  }
  
  Your entire response must be a single JSON object matching the schema.

  Focus on feasibility and profitability.
  Consider current events, new technologies, and discussions on platforms like Product Hunt, Hacker News, and Indie Hackers, as well as news from major financial publications.
  Be creative!
  Generate exactly {{{count}}} distinct ideas.
`,
  output: {schema: z.object({ideas: z.array(BusinessIdeaSchema)})},
  model: 'googleai/gemini-2.5-flash',
});

const generateBusinessIdeasFlow = ai.defineFlow(
  {
    name: 'generateBusinessIdeasFlow',
    inputSchema: GenerateBusinessIdeasInputSchema,
    outputSchema: BusinessIdeasOutputSchema,
  },
  async (input) => {
    let attempts = 0;
    const maxAttempts = 3;
    const delay = 2000;

    while (attempts < maxAttempts) {
      try {
        const {output} = await prompt(input);
        if (output?.ideas) {
          return { ideas: output.ideas };
        }
        // If output is null, retry.
        attempts++;
        if (attempts >= maxAttempts) {
          throw new Error('Flow failed to produce output after multiple attempts.');
        }
        await new Promise(resolve => setTimeout(resolve, delay * attempts));
      } catch (error) {
        attempts++;
        if (attempts >= maxAttempts) {
          console.error('Flow failed after maximum retry attempts', error);
          throw error;
        }
        await new Promise(resolve => setTimeout(resolve, delay * attempts));
      }
    }
    
    // This should not be reached, but as a fallback.
    throw new Error('Flow failed to produce a result.');
  }
);
