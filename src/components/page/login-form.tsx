
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { auth, sendSignInLinkToEmail, FirebaseError } from '@/lib/firebase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2 } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

const formSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

type FormData = z.infer<typeof formSchema>;

const actionCodeSettings = {
    url: `${process.env.NEXT_PUBLIC_URL || 'http://localhost:3000'}/finishLogin`,
    handleCodeInApp: true,
};

type LoginFormProps = {
    onLoginSuccess?: () => void;
};

export function LoginForm({ onLoginSuccess }: LoginFormProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '' },
  });

  async function onSubmit(data: FormData) {
    setIsSubmitting(true);
    try {
      await sendSignInLinkToEmail(auth, data.email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', data.email);
      setEmailSent(true);
    } catch (error) {
      console.error('Failed to send sign-in link:', error);
      const description = error instanceof FirebaseError 
        ? error.message 
        : 'An unknown error occurred. Please try again.';
      toast({
        title: 'Error Sending Link',
        description,
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  
  if (emailSent) {
      return (
          <div className="text-center p-4">
              <CardHeader>
                <CardTitle>Check Your Email</CardTitle>
                <CardDescription>
                    We've sent a magic login link to <span className="font-semibold text-primary">{form.getValues('email')}</span>. Click the link to complete your sign-in.
                </CardDescription>
              </CardHeader>
          </div>
      )
  }

  return (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <CardContent className="p-0">
            <CardDescription className="mb-4">
                Enter your email below and we'll send you a magic link to log in instantly. No password required.
            </CardDescription>
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
          </CardContent>
          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin mr-2" />
                Sending...
              </>
            ) : (
              'Send Magic Link'
            )}
          </Button>
        </form>
      </Form>
  );
}
