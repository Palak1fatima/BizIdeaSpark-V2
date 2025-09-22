'use client';

import { Header } from '@/components/page/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Hand, BarChart, FileText, InfinityIcon, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const proFeatures = [
    {
        icon: <InfinityIcon className="h-6 w-6" />,
        title: 'Unlimited Idea Generation',
        description: 'Never run out of inspiration. Generate endless business ideas on demand, 24/7.',
    },
    {
        icon: <BarChart className="h-6 w-6" />,
        title: 'In-depth Trend Analysis',
        description: 'Go beyond the idea with detailed market analysis and validation reports for each concept.',
    },
    {
        icon: <FileText className="h-6 w-6" />,
        title: 'AI-Powered Business Plans',
        description: 'Transform an idea into a professional, editable business plan with a single click.',
    },
    {
        icon: <Hand className="h-6 w-6" />,
        title: 'Personalized Recommendations',
        description: 'Receive business ideas tailored to your unique interests, skills, and market opportunities.',
    },
];

export default function ProPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1">
        <div className="py-12 md:py-20 px-4 border-b text-center">
           <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-headline mb-4 text-foreground tracking-tight">
             Unlock Your Full Potential
           </h2>
           <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Upcoming Pro features designed to give you a competitive edge and accelerate your journey from idea to launch.
           </p>
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 md:py-20">
            <div className="grid md:grid-cols-2 gap-8">
                {proFeatures.map((feature) => (
                    <div key={feature.title} className="flex items-start space-x-4">
                        <div className="flex-shrink-0 p-3 bg-primary/10 rounded-full text-primary">
                            {feature.icon}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-foreground">{feature.title}</h3>
                            <p className="mt-1 text-muted-foreground">{feature.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Card className="mt-16 bg-gradient-to-br from-secondary to-background border-primary/20 shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-3xl font-bold">Be the First to Go Pro</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                        Join the waitlist and we'll notify you as soon as BizIdeaSpark Pro is ready. Get early access and an exclusive launch-day discount.
                    </p>
                    <Button asChild size="lg">
                        <Link href="/contact?subject=Pro Waitlist">
                            Join the Waitlist <ArrowRight className="ml-2" />
                        </Link>
                    </Button>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
