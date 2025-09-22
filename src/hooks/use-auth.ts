
'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, signInAnonymously, type User } from '@/lib/firebase/client';
import { auth } from '@/lib/firebase/client';
import { useToast } from './use-toast';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        signInAnonymously(auth).catch((error) => {
          console.error("Anonymous sign-in failed:", error);
          toast({
            title: "Authentication Failed",
            description: "Could not start a guest session. Please try refreshing the page.",
            variant: "destructive"
          });
        });
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [toast]);

  return { user, loading };
}
