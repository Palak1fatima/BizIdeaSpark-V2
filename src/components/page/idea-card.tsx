
'use client';
import type { BusinessIdea } from '@/ai/flows/generate-business-ideas';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion } from 'framer-motion';
import { Building, Globe, Newspaper, TrendingUp, BarChart, FileText, Loader2, Target, Lightbulb, AlertTriangle, CheckCircle, Bookmark, Sparkles } from 'lucide-react';
import { useMemo, useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';
import { summarizeTrend, type SummarizeTrendOutput } from '@/ai/flows/summarize-trend';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { useSavedIdeas } from '@/hooks/use-saved-ideas';
import Link from 'next/link';

const cardColors = [
    'from-[hsl(var(--card-color-1))] to-[hsl(var(--card-color-1)/0.8)]',
    'from-[hsl(var(--card-color-2))] to-[hsl(var(--card-color-2)/0.8)]',
    'from-[hsl(var(--card-color-3))] to-[hsl(var(--card-color-3)/0.8)]',
    'from-[hsl(var(--card-color-4))] to-[hsl(var(--card-color-4)/0.8)]',
];

const icons = [
    Globe,
    Building,
    TrendingUp,
    BarChart,
];

const summarySections = [
    { key: 'coreConcept', title: 'Core Concept', icon: Lightbulb },
    { key: 'marketRelevance', title: 'Market Relevance', icon: TrendingUp },
    { key: 'targetAudience', title: 'Target Audience', icon: Target },
    { key: 'challenges', title: 'Potential Challenges', icon: AlertTriangle },
    { key: 'opportunities', title: 'Key Opportunities', icon: CheckCircle },
] as const;

export function IdeaCard({ idea, index, isPro }: { idea: BusinessIdea, index: number, isPro: boolean }) {
    const { toast } = useToast();
    const { isIdeaSaved, toggleSaveIdea } = useSavedIdeas();
    const [isSummarizing, setIsSummarizing] = useState(false);
    const [summary, setSummary] = useState<SummarizeTrendOutput | null>(null);
    const [isSummaryOpen, setIsSummaryOpen] = useState(false);
    
    const isSaved = isIdeaSaved(idea);

    const color = useMemo(() => cardColors[index % cardColors.length], [index]);
    const Icon = useMemo(() => icons[index % icons.length], [index]);
    const categories = idea.category.split(',').map(c => c.trim().toLowerCase()).filter(Boolean);

    const handleSummarize = async () => {
        setIsSummarizing(true);
        try {
            const result = await summarizeTrend({ trend: idea.idea });
            setSummary(result);
            setIsSummaryOpen(true);
        } catch (error) {
            console.error("Failed to summarize trend:", error);
            toast({
                title: 'Error',
                description: 'Could not generate a summary for this trend. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsSummarizing(false);
        }
    };
    
    const handleSaveClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleSaveIdea(idea);
        toast({
            title: isSaved ? 'Idea Unsaved' : 'Idea Saved!',
            description: isSaved ? 'You can always find it again later.' : 'You can find all your saved ideas on the "Saved" page.',
        });
    }

    const planLink = isPro
      ? `/plan?idea=${encodeURIComponent(idea.idea)}&source=${encodeURIComponent(idea.source)}`
      : '/pro';

    return (
        <>
            <motion.div
                layout
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.98 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="h-full"
            >
                <Card className="flex flex-col h-full bg-secondary border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 group overflow-hidden relative">
                    <CardContent className={cn("p-6 flex-1 bg-gradient-to-br text-white flex flex-col justify-between", color)}>
                         <div className="flex-1">
                            <div className="p-3 bg-white/20 rounded-lg inline-block mb-4">
                               <Icon className="h-6 w-6 text-white" />
                           </div>
                           <p className="text-lg font-bold leading-tight">{idea.idea}</p>
                        </div>
                        <Button size="icon" variant="ghost" className="absolute top-2 right-2 text-white/70 hover:text-white hover:bg-white/20" onClick={handleSaveClick}>
                            <Bookmark className={cn("transition-colors", isSaved && 'fill-white')} />
                        </Button>
                    </CardContent>
                    <div className="p-4 flex flex-col gap-4">
                         <div className="flex items-start gap-3 text-sm text-muted-foreground w-full">
                            <Newspaper className="h-4 w-4 mt-0.5 shrink-0" />
                            <p className="italic flex-1">"'{idea.source}'"</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map(cat => (
                                <Badge key={cat} variant="outline" className="capitalize font-medium border-border">
                                    {cat}
                                </Badge>
                            ))}
                        </div>
                    </div>
                    <CardFooter className="p-4 pt-0 flex flex-wrap justify-end items-center gap-2">
                         <Button size="sm" variant="ghost" onClick={handleSummarize} disabled={isSummarizing}>
                            {isSummarizing ? <Loader2 className="animate-spin" /> : <FileText />}
                            <span className="ml-2">Summarize</span>
                        </Button>
                        <Button size="sm" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 hover:text-primary" asChild>
                             <Link href={planLink}>
                                <Sparkles />
                                <span className="ml-2">Generate Plan</span>
                                <Badge variant="secondary" className="ml-2 !text-xs bg-primary/20 text-primary border-primary/20">PRO</Badge>
                             </Link>
                        </Button>
                    </CardFooter>
                </Card>
            </motion.div>
            
            <Dialog open={isSummaryOpen} onOpenChange={setIsSummaryOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Trend Analysis</DialogTitle>
                        <DialogDescription className="whitespace-normal break-words">{idea.idea}</DialogDescription>
                    </DialogHeader>
                    {summary && (
                        <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-4 -mr-4">
                            {summarySections.map((section) => {
                                const content = summary[section.key];
                                if (!content || (Array.isArray(content) && content.length === 0)) return null;

                                return (
                                    <div key={section.key} className="flex items-start gap-4">
                                        <div className="p-2 bg-primary/10 rounded-full text-primary mt-1">
                                            <section.icon className="h-5 w-5" />
                                        </div>
                                        <div>
                                            <h4 className="font-semibold text-foreground">{section.title}</h4>
                                            {Array.isArray(content) ? (
                                                <ul className="list-disc pl-5 mt-1 text-muted-foreground space-y-1">
                                                    {content.map((item, i) => <li key={i}>{item}</li>)}
                                                </ul>
                                            ) : (
                                                <p className="text-muted-foreground mt-1">{content}</p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
