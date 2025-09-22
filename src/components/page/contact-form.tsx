'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { submitFeedback } from '@/ai/flows/submit-feedback';
import { SubmitFeedbackInputSchema } from '@/ai/schemas/feedback';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import { useUser } from '@clerk/nextjs';

type FormData = z.infer<typeof SubmitFeedbackInputSchema>;

export function ContactForm() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const { user } = useUser();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const subject = searchParams.get('subject');

  const form = useForm<FormData>({
    resolver: zodResolver(SubmitFeedbackInputSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  useEffect(() => {
    const message = subject === 'Pro Waitlist' ? "I'd like to join the waitlist for BizIdeaSpark Pro!" : '';
    const email = user?.primaryEmailAddress?.emailAddress ?? '';
    const name = user?.fullName ?? '';
    form.reset({ name: name || '', email: email || '', message });
  }, [subject, form, user]);


  async function onSubmit(data: FormData) {
    setIsSubmitting(true);
    try {
      const result = await submitFeedback(data);
      if (result.success) {
        toast({
          title: 'Message Sent!',
          description: result.message,
        });
        form.reset();
      } else {
        throw new Error(result.message);
      }
    } catch (error) {
      console.error('Feedback submission error:', error);
      toast({
        title: 'Error',
        description: 'There was an issue sending your message. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-8 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Send us a message</CardTitle>
          <CardDescription>Fill out the form below and we'll get back to you as soon as possible.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your@email.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Your message..." rows={6} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isSubmitting} className="w-full">
                {isSubmitting ? (
                    <>
                        <Loader2 className="animate-spin mr-2" />
                        Sending...
                    </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
