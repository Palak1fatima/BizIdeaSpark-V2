
'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { Header } from '@/components/page/header';
import { Skeleton } from '@/components/ui/skeleton';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

// Dynamically import the ContactForm
const ContactForm = dynamic(() => import('@/components/page/contact-form').then(mod => mod.ContactForm), {
    ssr: false, // This form relies on client-side hooks, so we don't need server-side rendering
    loading: () => <ContactFormSkeleton />,
});

function ContactFormSkeleton() {
  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-8 py-12">
      <Card>
        <CardHeader>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-full max-w-sm" />
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
              <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full" />
              </div>
              <div className="space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-24 w-full" />
              </div>
              <Skeleton className="h-10 w-full" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background font-body">
            <Header />
            <main className="flex-1">
                <div className="py-12 md:py-20 px-4 border-b">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-headline mb-4 text-foreground tracking-tight text-center">
                    Get In Touch
                </h2>
                <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto text-center">
                    We'd love to hear from you! Whether you have a question, feedback, or just want to say hello, please drop us a line.
                </p>
                </div>
                <Suspense fallback={<ContactFormSkeleton />}>
                    <ContactForm />
                </Suspense>
            </main>
        </div>
    )
}
