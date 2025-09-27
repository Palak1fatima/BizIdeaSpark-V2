
'use client';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Sparkles, Lock } from 'lucide-react';

const availableCategories = [
  'AI / ML',
  'B2B SaaS',
  'E-commerce',
  'Fintech',
  'Healthcare',
  'Sustainability',
  'Creator Economy',
  'Developer Tools',
];

type ProFiltersProps = {
  selectedCategories: string[];
  onCategoryChange: (categories: string[]) => void;
  isPro: boolean;
};

export function ProFilters({ selectedCategories, onCategoryChange, isPro }: ProFiltersProps) {
  const handleToggleCategory = (category: string) => {
    const newSelection = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    onCategoryChange(newSelection);
  };

  return (
    <div className="max-w-3xl mx-auto mb-8 p-4 border border-primary/20 bg-secondary rounded-lg">
      <div className="flex items-center justify-center gap-2 mb-4">
        {isPro ? <Sparkles className="h-5 w-5 text-primary" /> : <Lock className="h-5 w-5 text-primary" />}
        <h3 className="text-lg font-semibold text-foreground">Pro Filters</h3>
      </div>
      <p className="text-center text-muted-foreground text-sm mb-4">
        {isPro ? 'Focus your inspiration. Select categories to get tailored ideas.' : 'This is a Pro feature. Select categories below to use your one-time free trial.'}
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {availableCategories.map((category) => (
          <button
            key={category}
            onClick={() => handleToggleCategory(category)}
            className={cn(
              'px-4 py-2 text-sm font-medium rounded-full border transition-colors',
              selectedCategories.includes(category)
                ? 'bg-primary text-primary-foreground border-transparent'
                : 'bg-background hover:bg-accent border-border'
            )}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}
