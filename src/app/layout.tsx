import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Footer } from '@/components/page/footer';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

export const metadata: Metadata = {
  title: 'BizIdeaSpark',
  description: 'Generate your next big business idea.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        elements: {
          userButtonPopoverHeader: {
            display: 'none',
          },
        },
      }}
    >
      <html lang="en" className="h-full dark">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        </head>
        <body className="font-body antialiased h-full flex flex-col">
          <div className="flex-1">
            {children}
          </div>
          <Footer />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
