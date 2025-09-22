
'use client';

import { SpinWheel } from '@/components/page/spin-wheel';

type HeroProps = {
    onGenerate: () => void;
    loading: boolean;
    disabled?: boolean;
};

export function Hero({ onGenerate, loading, disabled = false }: HeroProps) {
    return (
        <div className="text-center py-12 md:py-20 px-4 border-b">
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-headline mb-4 text-foreground tracking-tight">
                Unleash Your Inner Entrepreneur
            </h2>
            <p className="text-lg text-muted-foreground mb-4 max-w-2xl mx-auto">
                Stuck in a creative rut? Our AI-powered engine ignites your next big business idea based on today's hottest trends.
            </p>
             <p className="text-base text-muted-foreground/90 mb-4 max-w-3xl mx-auto">
                Get instant summaries of fresh startup ideas — from core concept to market opportunities.
            </p>
            <p className="text-base text-muted-foreground/90 mb-10 max-w-3xl mx-auto">
                Sourced from <span className="font-semibold text-blue-400">Bloomberg</span>, <span className="font-semibold text-green-400">TechCrunch</span>, discussions on <span className="font-semibold text-orange-400">Hacker News</span> & <span className="font-semibold text-purple-400">Indie Hackers</span>, and many more.
            </p>
            <SpinWheel onGenerate={onGenerate} loading={loading} disabled={disabled} />
        </div>
    );
}
