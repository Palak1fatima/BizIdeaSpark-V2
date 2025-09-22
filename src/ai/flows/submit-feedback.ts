'use server';

/**
 * @fileOverview A flow for submitting user feedback.
 *
 * - submitFeedback - A function that handles the feedback submission process.
 */

import { ai } from '@/ai/genkit';
import { SubmitFeedbackInputSchema, SubmitFeedbackOutputSchema, type SubmitFeedbackInput, type SubmitFeedbackOutput } from '@/ai/schemas/feedback';
import { Resend } from 'resend';

export async function submitFeedback(input: SubmitFeedbackInput): Promise<SubmitFeedbackOutput> {
  return submitFeedbackFlow(input);
}

const submitFeedbackFlow = ai.defineFlow(
  {
    name: 'submitFeedbackFlow',
    inputSchema: SubmitFeedbackInputSchema,
    outputSchema: SubmitFeedbackOutputSchema,
  },
  async (input) => {
    const resend = new Resend(process.env.RESEND_API_KEY);
    console.log('New feedback received:', input);
    
    try {
      await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'mmohsinkhan3123@gmail.com',
        subject: 'New Feedback from BizIdeaSpark',
        text: `You have new feedback from ${input.name} (${input.email}):\n\n${input.message}`,
      });
      
      return {
        success: true,
        message: 'Thank you for your feedback! We have received your message and will get back to you if necessary.',
      };
    } catch (error) {
        console.error("Failed to send feedback email:", error);
        return {
            success: false,
            message: "Sorry, we couldn't send your feedback at this time. Please try again later."
        }
    }
  }
);
