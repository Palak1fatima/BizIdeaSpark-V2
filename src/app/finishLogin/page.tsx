
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { auth, isSignInWithEmailLink, signInWithEmailLink } from '@/lib/firebase/client';
import { useToast } from '@/hooks/use-toast';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function FinishLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const completeSignIn = async () => {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = window.localStorage.getItem('emailForSignIn');
        if (!email) {
          // This can happen if the user opens the link on a different device.
          // We can ask them for their email again.
          email = window.prompt('Please provide your email for confirmation');
        }

        if (!email) {
            setError("Email is required to complete sign in.");
            setStatus('error');
            return;
        }

        try {
          await signInWithEmailLink(auth, email, window.location.href);
          window.localStorage.removeItem('emailForSignIn');
          setStatus('success');
          toast({
            title: 'Successfully Logged In!',
            description: "You're all set. Welcome back!",
          });
          router.push('/');
        } catch (err: any) {
          console.error('Sign in with email link error:', err);
          setError(err.message || 'An unknown error occurred.');
          setStatus('error');
        }
      } else {
        setError('This is not a valid sign-in link.');
        setStatus('error');
      }
    };

    completeSignIn();
  }, [router, toast]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="max-w-md w-full">
        <CardHeader className="text-center">
            <CardTitle>Completing Login...</CardTitle>
            <CardDescription>Please wait while we securely log you in.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center justify-center min-h-[150px]">
          {status === 'loading' && (
            <>
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
              <p className="mt-4 text-muted-foreground">Verifying link...</p>
            </>
          )}
          {status === 'error' && (
            <div className="text-center text-destructive">
                <AlertTriangle className="h-12 w-12 mx-auto" />
                <p className="mt-4 font-semibold">Login Failed</p>
                <p className="mt-2 text-sm">{error}</p>
                <Button onClick={() => router.push('/')} className="mt-6">Return to Homepage</Button>
            </div>
          )}
           {status === 'success' && (
            <div className="text-center text-green-500">
                <p className="mt-4 font-semibold">Success!</p>
                <p className="mt-2 text-sm text-muted-foreground">Redirecting you now...</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
