
'use client';

import type { BusinessIdea } from '@/ai/flows/generate-business-ideas';
import { IdeaCard } from './idea-card';
import { AnimatePresence, motion } from 'framer-motion';

type IdeaListProps = {
    ideas: BusinessIdea[];
};

export function IdeaList({ ideas }: IdeaListProps) {
    if (ideas.length === 0) {
        return (
            <div className="text-center py-24 bg-card rounded-lg border">
                <p className="text-muted-foreground">No ideas match your filters.</p>
                <p className="text-sm text-muted-foreground/80 mt-2">Try adjusting your search or filters.</p>
            </div>
        );
    }
    
    return (
        <AnimatePresence>
            <motion.div 
                layout 
                className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6"
            >
                {ideas.map((idea, index) => (
                    <IdeaCard key={`${idea.idea}-${index}`} idea={idea} index={index} />
                ))}
            </motion.div>
        </AnimatePresence>
    );
}
