"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { generateBusinessPlan, type GenerateBusinessPlanOutput } from "@/ai/flows/generate-business-plan";
import { Header } from "@/components/page/header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Target, TrendingUp, BarChart, FileText, ArrowLeft, Download, Printer, DraftingCompass, MousePointerClick, AppWindow, Puzzle, Rocket } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import Link from "next/link";
import { cn } from "@/lib/utils";

const planSections = [
  { key: "executiveSummary", title: "Executive Summary", icon: FileText },
  { key: "problemAndSolution", title: "Problem & Solution", icon: Lightbulb },
  { key: "targetAudience", title: "Target Audience", icon: Target },
  { key: "marketingAndSales", title: "Marketing & Sales Strategies", icon: TrendingUp },
  { key: "revenueModel", title: "Revenue Model", icon: BarChart },
] as const;

const prototypingTools = [
  {
    name: "Carrd",
    description: "Build one-page sites for anything. Simple, free, and fully responsive.",
    url: "https://try.carrd.co/w5pf36m1",
    category: "Landing Page",
    icon: MousePointerClick,
    color: "border-blue-200 bg-blue-50/50 hover:bg-blue-100/70 dark:border-blue-800 dark:bg-blue-950/20 dark:hover:bg-blue-900/30",
  },
  {
    name: "Webflow",
    description: "The leading no-code platform for professional websites.",
    url: "https://webflow.com/",
    category: "Landing Page",
    icon: MousePointerClick,
    color: "border-sky-200 bg-sky-50/50 hover:bg-sky-100/70 dark:border-sky-800 dark:bg-sky-950/20 dark:hover:bg-sky-900/30",
  },
  {
    name: "Figma",
    description: "The collaborative interface design tool. Create, test, and ship better designs from start to finish.",
    url: "https://www.figma.com/",
    category: "Design Mockup",
    icon: AppWindow,
    color: "border-purple-200 bg-purple-50/50 hover:bg-purple-100/70 dark:border-purple-800 dark:bg-purple-950/20 dark:hover:bg-purple-900/30",
  },
  {
    name: "Bubble",
    description: "A no-code tool that lets you build SaaS platforms, marketplaces and CRMs without code.",
    url: "https://bubble.io/",
    category: "No-Code MVP",
    icon: Puzzle,
    color: "border-rose-200 bg-rose-50/50 hover:bg-rose-100/70 dark:border-rose-800 dark:bg-rose-950/20 dark:hover:bg-rose-900/30",
  },
];

function PlanSkeleton() {
  return (
    <div className="max-w-4xl mx-auto py-12 md:py-20 px-4 sm:px-8">
      <Skeleton className="h-6 w-48 mb-8" />
      <div className="space-y-4 mb-10">
        <Skeleton className="h-12 w-3/4" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
      </div>
      <div className="grid gap-8">
        {Array.from({ length: 5 }).map((_, i) => (
          <Card key={i}>
            <CardHeader>
              <div className="flex items-center gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <Skeleton className="h-6 w-1/3" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function BusinessPlanDisplay() {
  const searchParams = useSearchParams();
  const idea = searchParams.get("idea");
  const source = searchParams.get("source");

  const [plan, setPlan] = useState<GenerateBusinessPlanOutput | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (idea && source) {
      const fetchPlan = async () => {
        setLoading(true);
        setError(null);
        try {
          const result = await generateBusinessPlan({ idea, source });
          setPlan(result);
        } catch (e: any) {
          console.error(e);
          setError("Failed to generate the business plan. Please try again.");
        } finally {
          setLoading(false);
        }
      };
      fetchPlan();
    } else {
      setError("Business idea and source are required to generate a plan.");
      setLoading(false);
    }
  }, [idea, source]);

  if (loading) {
    return <PlanSkeleton />;
  }

  if (error) {
    return <div className="text-center py-20 text-destructive">{error}</div>;
  }

  if (!plan) {
    return <div className="text-center py-20 text-muted-foreground">No plan available.</div>;
  }

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-4xl mx-auto py-12 md:py-20 px-4 sm:px-8">
      <Button asChild variant="ghost" className="mb-8">
        <Link href="/">
          <ArrowLeft className="mr-2" />
          Back to Ideas
        </Link>
      </Button>

      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-10">
        <div>
          <Badge variant="default" className="mb-2">PRO FEATURE</Badge>
          <h2 className="text-4xl sm:text-5xl font-black font-headline text-foreground tracking-tight">
            {plan.title}
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">Generated for the idea: "{idea}"</p>
        </div>
        <div className="flex gap-2 print:hidden">
          <Button variant="outline" onClick={handlePrint}>
            <Printer className="mr-2" /> Print
          </Button>
          <Button disabled>
            <Download className="mr-2" /> Download PDF
          </Button>
        </div>
      </div>

      <div className="space-y-8">
        {planSections.map((section) => {
          const content = plan[section.key as keyof GenerateBusinessPlanOutput];
          if (!content) return null;

          const isProblemSolution = section.key === "problemAndSolution";
          const problem = isProblemSolution ? (content as any).problem : null;
          const solution = isProblemSolution ? (content as any).solution : null;

          return (
            <Card key={section.key} className="shadow-lg">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-full text-primary">
                    <section.icon />
                  </div>
                  <CardTitle className="text-2xl">{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="text-muted-foreground pl-16 space-y-4 text-base">
                {isProblemSolution ? (
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">The Problem</h4>
                      <p>{problem}</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground mb-1">Our Solution</h4>
                      <p>{solution}</p>
                    </div>
                  </div>
                ) : Array.isArray(content) ? (
                  <ul className="list-disc pl-5 space-y-2">
                    {content.map((item: string, i: number) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                ) : (
                  <p>{content}</p>
                )}
              </CardContent>
            </Card>
          );
        })}

        {/* Enhanced Prototyping Tools Section */}
        <div className="relative overflow-hidden rounded-xl border-2 border-emerald-500/20 bg-gradient-to-br from-emerald-50/50 to-blue-50/50 dark:from-emerald-950/20 dark:to-blue-950/20 p-8">
          {/* Decorative corner accent */}
          <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full" />

          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-emerald-500/20 rounded-lg">
              <Rocket className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            </div>
            <h3 className="text-2xl font-bold text-emerald-900 dark:text-emerald-100">
              Builder's Toolkit
            </h3>
          </div>

          <p className="text-emerald-700 dark:text-emerald-300 mb-6">
            Take your idea from concept to prototype with these essential tools:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {prototypingTools.map((tool) => (
              <Link
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                key={tool.name}
                className={cn(
                  "block p-4 border-2 rounded-lg transition-all duration-200 group hover:scale-105 hover:shadow-md",
                  tool.color
                )}
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-black/10 dark:bg-white/10 rounded-lg">
                    <tool.icon className="w-5 h-5 text-foreground" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-foreground group-hover:text-primary">
                        {tool.name}
                      </h4>
                      <Badge variant="secondary" className="text-xs">
                        {tool.category}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          {/* Add this below the tools grid */}
          <p className="text-xs text-muted-foreground mt-4 text-center">
            Note: Some links are affiliate links that support BizIdeaSpark at no extra cost to you.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PlanPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body print:bg-white print:text-black">
      <Header />
      <main className="flex-1">
        <Suspense fallback={<PlanSkeleton />}>
          <BusinessPlanDisplay />
        </Suspense>
      </main>
    </div>
  );
}