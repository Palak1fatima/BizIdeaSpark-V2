
'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import type { BusinessIdea } from '@/ai/flows/generate-business-ideas';
import { generateBusinessIdeas } from '@/ai/flows/generate-business-ideas';
import { useToast } from "@/hooks/use-toast";
import { Header } from '@/components/page/header';
import { Hero } from '@/components/page/hero';
import { Filters } from '@/components/page/filters';
import { IdeaList } from '@/components/page/idea-list';
import { IdeaListSkeleton } from '@/components/page/idea-list-skeleton';
import { Lightbulb } from 'lucide-react';
import { useClerk, useUser } from '@clerk/nextjs';

export default function Home() {
  const [ideas, setIdeas] = useState<BusinessIdea[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const { isSignedIn, isLoaded } = useUser();
  const { openSignIn } = useClerk();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (ideas.length > 0 && !loading) {
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [ideas, loading]);

  const handleGenerate = async () => {
    if (!isSignedIn) {
      openSignIn({
        appearance: {
          variables: {
            colorPrimary: '#FFC72C',
          },
          elements: {
            modalBackdrop: 'flex justify-center items-center',
          }
        },
      });
      return;
    }

    setLoading(true);
    setIdeas([]);

    try {
      const result = await generateBusinessIdeas();

      if (result.ideas && result.ideas.length > 0) {
        setIdeas(result.ideas);
      } else if (result.error) {
        toast({
            title: "An Error Occurred",
            description: result.error,
            variant: "destructive",
        });
      } else {
        toast({
            title: "No ideas generated",
            description: "The AI couldn't come up with ideas. Try again!",
            variant: "destructive",
        });
      }
    } catch (e: any) {
      console.error(e);
      const errorMessage = e.message || "Failed to generate ideas. Please try again later.";
       toast({
          title: "An error occurred",
          description: errorMessage,
          variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    ideas.forEach(idea => {
      idea.category.split(',').forEach(cat => {
        const trimmedCat = cat.trim();
        if (trimmedCat) {
          categories.add(trimmedCat.toLowerCase());
        }
      });
    });
    return Array.from(categories).sort();
  }, [ideas]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  const filteredIdeas = useMemo(() => {
    return ideas.filter(idea => {
      const ideaCategories = idea.category.split(',').map(c => c.trim().toLowerCase());
      const matchesSearch = idea.idea.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            idea.category.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || 
                              selectedCategories.some(cat => ideaCategories.includes(cat));
      return matchesSearch && matchesCategory;
    });
  }, [ideas, searchTerm, selectedCategories]);

  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1">
        <Hero 
          onGenerate={handleGenerate} 
          loading={loading || !isLoaded}
        />
        
        {loading && isClient && (
          <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8">
            <IdeaListSkeleton />
          </div>
        )}

        {!loading && ideas.length > 0 && (
          <div ref={resultsRef} className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
              <Filters 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                allCategories={allCategories}
                selectedCategories={selectedCategories}
                onCategoryChange={handleCategoryChange}
              />
              <div className="lg:col-span-3">
                <IdeaList ideas={filteredIdeas} />
              </div>
            </div>
          </div>
        )}

        {!loading && ideas.length === 0 && !isClient && (
           <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-8">
             <IdeaListSkeleton />
           </div>
        )}

        {!loading && ideas.length === 0 && isClient && (
           <div className="text-center py-20 px-4">
              <Lightbulb className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">Ready to find your spark?</h3>
              <p className="mt-1 text-sm text-muted-foreground">Click the button above to generate your first set of business ideas.</p>
           </div>
        )}
      </main>
    </div>
  );
}
