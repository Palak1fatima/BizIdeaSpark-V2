
'use client';

import { Lightbulb, Mail, Sparkles, Bookmark } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { SignedIn, SignedOut, UserButton } from '@clerk/nextjs';

export function Header() {
  return (
    <header className="p-4 sm:p-6 flex items-center justify-between border-b bg-background shadow-sm sticky top-0 z-20">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-full">
            <Lightbulb className="h-6 w-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold font-headline text-foreground tracking-tight">BizIdeaSpark</h1>
        </Link>
      </div>
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost">
            <Link href="/saved">
                <Bookmark className="mr-2" />
                Saved
            </Link>
        </Button>
        <Button asChild>
            <Link href="/pro">
                <Sparkles className="mr-2" />
                Go Pro
            </Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/contact">
            <Mail className="mr-2" />
            Contact
          </Link>
        </Button>
        
        <SignedIn>
          <UserButton />
        </SignedIn>
        <SignedOut>
            <Button asChild variant="ghost">
                <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button asChild>
                <Link href="/sign-up">Sign Up</Link>
            </Button>
        </SignedOut>

      </div>
    </header>
  );
}
