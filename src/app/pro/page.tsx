
'use client';

import { useState } from 'react';
import { Header } from '@/components/page/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Sparkles, ArrowRight } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import Link from 'next/link';

const freeFeatures = [
    '3 ideas per generation',
    'Basic trend summary',
    'Save your favorite ideas',
];

const proFeatures = [
    '12 ideas per generation (or more!)',
    'Advanced pre-generation filters',
    'In-depth trend analysis',
    'One-click AI business plans',
    'Actionable prototyping tool suggestions',
    'Personalized recommendations (coming soon)',
    'Priority support',
];

export default function ProPage() {
    const [isYearly, setIsYearly] = useState(true);

    return (
        <div className="flex flex-col min-h-screen bg-background font-body">
            <Header />
            <main className="flex-1">
                <div className="py-12 md:py-20 px-4 border-b text-center">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-headline mb-4 text-foreground tracking-tight">
                        Choose Your Plan
                    </h2>
                    <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
                        Start for free, then unlock your full potential with Pro.
                    </p>
                    <div className="flex items-center justify-center space-x-4">
                        <Label htmlFor="billing-toggle" className={cn(!isYearly && "text-foreground")}>Monthly</Label>
                        <Switch
                            id="billing-toggle"
                            checked={isYearly}
                            onCheckedChange={setIsYearly}
                            aria-label="Toggle billing cycle"
                        />
                        <Label htmlFor="billing-toggle" className={cn(isYearly && "text-foreground")}>
                            Yearly <span className="text-primary font-bold">(-25%)</span>
                        </Label>
                    </div>
                </div>

                <div className="max-w-5xl mx-auto px-4 sm:px-8 py-12 md:py-20">
                    <div className="grid md:grid-cols-2 gap-8 items-start">

                        {/* Free Plan */}
                        <Card className="border-border/50">
                            <CardHeader>
                                <CardTitle className="text-2xl">Free</CardTitle>
                                <CardDescription>For getting started and exploring new ideas.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <p className="text-4xl font-bold">$0<span className="text-lg font-normal text-muted-foreground">/month</span></p>
                                <ul className="space-y-3">
                                    {freeFeatures.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3">
                                            <Check className="text-green-500" />
                                            <span className="text-muted-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button variant="outline" className="w-full" asChild>
                                    <Link href="/">Continue with Free</Link>
                                </Button>
                            </CardFooter>
                        </Card>

                        {/* Pro Plan */}
                        <Card className="border-primary shadow-lg shadow-primary/10 relative overflow-hidden">
                             <div className="absolute top-0 right-0 px-4 py-1 bg-primary text-primary-foreground font-semibold text-sm rounded-bl-lg">
                                RECOMMENDED
                            </div>
                            <CardHeader>
                                <div className="flex items-center gap-2">
                                     <Sparkles className="text-primary" />
                                     <CardTitle className="text-2xl">Pro</CardTitle>
                                </div>
                                <CardDescription>For serious entrepreneurs ready to build.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-baseline">
                                     <p className="text-4xl font-bold">${isYearly ? '89' : '9'}</p>
                                     <span className="text-lg font-normal text-muted-foreground">/{isYearly ? 'year' : 'month'}</span>
                                </div>
                                <ul className="space-y-3">
                                    {proFeatures.map((feature) => (
                                        <li key={feature} className="flex items-center gap-3">
                                            <Check className="text-primary" />
                                            <span className="text-foreground">{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                            <CardFooter>
                                 <Button className="w-full" asChild>
                                     <Link href="/contact?subject=Pro+Waitlist">
                                        Join the Waitlist <ArrowRight className="ml-2" />
                                    </Link>
                                </Button>
                            </CardFooter>
                        </Card>

                    </div>
                </div>
            </main>
        </div>
    );
}
