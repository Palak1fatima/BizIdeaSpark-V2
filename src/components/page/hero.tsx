
'use client';

import { SpinWheel } from '@/components/page/spin-wheel';
import { SourceLogos } from './source-logos';
import { ProFilters } from './pro-filters';
import { Button } from '../ui/button';
import { Sparkles } from 'lucide-react';

type HeroProps = {
    onGenerate: (isProTrial?: boolean) => void;
    loading: boolean;
    disabled?: boolean;
    isPro?: boolean;
    isProTrialAvailable?: boolean;
    preselectedCategories: string[];
    setPreselectedCategories: (categories: string[]) => void;
};

export function Hero({ 
    onGenerate, 
    loading, 
    disabled = false, 
    isPro = false,
    isProTrialAvailable = false,
    preselectedCategories, 
    setPreselectedCategories 
}: HeroProps) {
    return (
        <div className="text-center py-12 md:py-20 px-4 border-b">
            <h2 className="relative inline-block text-4xl sm:text-5xl md:text-6xl font-black font-headline mb-4 text-foreground tracking-tight group">
                Unleash Your Inner Entrepreneur with Data-Validated Ideas
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2/3 h-1.5 bg-primary/80 rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-center"></span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto">
                Go from creative rut to confident founder. Get AI-powered business ideas backed by real market trends from Bloomberg, TechCrunch, and industry experts.
            </p>
            {(isPro || isProTrialAvailable) && (
                <ProFilters
                    selectedCategories={preselectedCategories}
                    onCategoryChange={setPreselectedCategories}
                    isPro={isPro}
                />
            )}
            <SpinWheel 
                onGenerate={() => onGenerate()} 
                loading={loading} 
                disabled={disabled} 
                isPro={isPro} 
            />
            {isProTrialAvailable && !isPro && (
                <div className="mt-4">
                    <Button 
                        variant="link" 
                        className="text-primary"
                        onClick={() => onGenerate(true)}
                        disabled={loading}
                    >
                       <Sparkles className="mr-2 h-4 w-4" />
                        Get One Free Pro Generation
                    </Button>
                </div>
            )}
            <SourceLogos />
        </div>
    );
}
