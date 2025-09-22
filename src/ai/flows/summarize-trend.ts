
'use server';

/**
 * @fileOverview Summarizes trends related to a business idea.
 *
 * - summarizeTrend - A function that summarizes trends for a given business idea.
 * - SummarizeTrendInput - The input type for the summarizeTrend function.
 * - SummarizeTrendOutput - The return type for the summarizeTrend function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeTrendInputSchema = z.object({
  trend: z.string().describe('The business idea or trend to summarize.'),
});
export type SummarizeTrendInput = z.infer<typeof SummarizeTrendInputSchema>;

const SummarizeTrendOutputSchema = z.object({
  coreConcept: z.string().describe("A concise explanation of the business idea's core concept."),
  marketRelevance: z.array(z.string()).describe("A list of bullet points explaining the idea's relevance in the current market."),
  targetAudience: z.string().describe("A description of the ideal target audience for this business idea."),
  challenges: z.array(z.string()).describe("A list of potential challenges or risks associated with this idea."),
  opportunities: z.array(z.string()).describe("A list of potential opportunities or unique selling points for this idea."),
});
export type SummarizeTrendOutput = z.infer<typeof SummarizeTrendOutputSchema>;

export async function summarizeTrend(input: SummarizeTrendInput): Promise<SummarizeTrendOutput> {
  return summarizeTrendFlow(input);
}

const summarizeTrendPrompt = ai.definePrompt({
  name: 'summarizeTrendPrompt',
  input: {schema: SummarizeTrendInputSchema},
  output: {schema: SummarizeTrendOutputSchema},
  prompt: `You are a business analyst. Provide a detailed analysis for the following business idea, structured in JSON.

  Business Idea: {{trend}}
  
  Break down your analysis into the following sections:
  - coreConcept: A concise explanation of the business idea's core concept.
  - marketRelevance: An array of strings (bullet points) explaining the idea's relevance in the current market.
  - targetAudience: A description of the ideal target audience.
  - challenges: An array of strings (bullet points) listing potential challenges.
  - opportunities: An array of strings (bullet points) listing potential opportunities.`,
});

const summarizeTrendFlow = ai.defineFlow(
  {
    name: 'summarizeTrendFlow',
    inputSchema: SummarizeTrendInputSchema,
    outputSchema: SummarizeTrendOutputSchema,
  },
  async input => {
    const {output} = await summarizeTrendPrompt(input);
    return output!;
  }
);
