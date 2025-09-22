import { z } from 'zod';

export const SubmitFeedbackInputSchema = z.object({
  name: z.string().describe('The name of the user submitting feedback.'),
  email: z.string().email().describe('The email of the user.'),
  message: z.string().describe('The feedback message.'),
});
export type SubmitFeedbackInput = z.infer<typeof SubmitFeedbackInputSchema>;

export const SubmitFeedbackOutputSchema = z.object({
  success: z.boolean().describe('Whether the feedback submission was successful.'),
  message: z.string().describe('A message to return to the user.'),
});
export type SubmitFeedbackOutput = z.infer<typeof SubmitFeedbackOutputSchema>;
