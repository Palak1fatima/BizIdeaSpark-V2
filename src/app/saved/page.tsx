
'use client';

import { Header } from '@/components/page/header';
import { Bookmark, SearchX } from 'lucide-react';
import { useSavedIdeas } from '@/hooks/use-saved-ideas';
import { IdeaList } from '@/components/page/idea-list';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function SavedIdeasPage() {
  const { savedIdeas } = useSavedIdeas();

  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1">
        <div className="py-12 md:py-20 px-4 border-b">
           <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-headline mb-4 text-foreground tracking-tight text-center">
             Your Saved Ideas
           </h2>
           <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto text-center">
            A home for the brilliant ideas you want to explore later.
           </p>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-12">
           {savedIdeas.length > 0 ? (
             <IdeaList ideas={savedIdeas} />
           ) : (
            <div className="text-center py-20 px-4 bg-secondary border rounded-lg">
                <SearchX className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-4 text-lg font-semibold text-foreground">You haven't saved any ideas yet</h3>
                <p className="mt-1 text-sm text-muted-foreground">Click the bookmark icon on an idea to save it for later.</p>
                <Button asChild className="mt-6">
                    <Link href="/">Find Ideas</Link>
                </Button>
            </div>
           )}
        </div>
      </main>
    </div>
  );
}
