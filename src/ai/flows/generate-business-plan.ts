
'use server';

/**
 * @fileOverview Generates a one-page business plan for a given idea.
 *
 * - generateBusinessPlan - A function that generates a business plan.
 * - GenerateBusinessPlanInput - The input type for the function.
 * - GenerateBusinessPlanOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateBusinessPlanInputSchema = z.object({
  idea: z.string().describe('The core business idea.'),
  source: z.string().describe('The source that inspired the idea.'),
});
export type GenerateBusinessPlanInput = z.infer<typeof GenerateBusinessPlanInputSchema>;

const GenerateBusinessPlanOutputSchema = z.object({
    title: z.string().describe("A catchy and professional title for the business plan."),
    executiveSummary: z.string().describe('A concise, powerful overview of the business concept, its target market, and its primary goal. Should be 1-2 sentences.'),
    problemAndSolution: z.object({
        problem: z.string().describe("The specific problem this business solves for its target audience. Be specific and relatable."),
        solution: z.string().describe("How the business's product or service provides a clear and compelling solution to the problem."),
    }),
    targetAudience: z.string().describe("A description of the ideal customer, including demographics, needs, and behaviors."),
    marketingAndSales: z.array(z.string()).describe("A list of 3-5 actionable bullet points outlining key strategies for reaching and converting customers."),
    revenueModel: z.array(z.string()).describe("A list of 2-3 bullet points explaining the primary ways the business will make money (e.g., subscription fees, direct sales, commission)."),
});
export type GenerateBusinessPlanOutput = z.infer<typeof GenerateBusinessPlanOutputSchema>;

export async function generateBusinessPlan(input: GenerateBusinessPlanInput): Promise<GenerateBusinessPlanOutput> {
  return generateBusinessPlanFlow(input);
}

const generateBusinessPlanPrompt = ai.definePrompt({
  name: 'generateBusinessPlanPrompt',
  input: {schema: GenerateBusinessPlanInputSchema},
  output: {schema: GenerateBusinessPlanOutputSchema},
  prompt: `You are an expert business plan consultant. Your task is to generate a concise, compelling, and professional one-page business plan for the following business idea. The plan must be actionable and easy to understand.

  Business Idea: "{{idea}}"
  Inspiration Source: "{{source}}"
  
  Generate a plan that covers these sections:
  - title: A creative and professional name for the business.
  - executiveSummary: A brief, powerful summary (1-2 sentences).
  - problemAndSolution: Clearly define the customer's problem and how the business solves it.
  - targetAudience: Describe the ideal customer profile.
  - marketingAndSales: Provide a bulleted list of 3-5 high-impact strategies.
  - revenueModel: Provide a bulleted list of 2-3 primary revenue streams.
  
  The tone should be optimistic but realistic. Focus on clarity and actionable insights. Ensure the entire response is a single JSON object that strictly adheres to the output schema.
  `,
});

const generateBusinessPlanFlow = ai.defineFlow(
  {
    name: 'generateBusinessPlanFlow',
    inputSchema: GenerateBusinessPlanInputSchema,
    outputSchema: GenerateBusinessPlanOutputSchema,
  },
  async input => {
    const {output} = await generateBusinessPlanPrompt(input);
    return output!;
  }
);
