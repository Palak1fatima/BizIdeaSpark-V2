
import Link from "next/link";
import { Lightbulb } from "lucide-react";

export function Footer() {
    return (
        <footer className="p-6 md:px-8 md:py-8 border-t bg-background">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-full">
                        <Lightbulb className="h-6 w-6 text-primary" />
                    </div>
                    <h1 className="text-xl font-bold font-headline text-foreground tracking-tight">BizIdeaSpark</h1>
                </div>
                <nav className="flex gap-4 sm:gap-6 text-sm text-muted-foreground">
                    <Link href="/contact" className="hover:text-foreground transition-colors">
                        Contact
                    </Link>
                    <Link href="/privacy" className="hover:text-foreground transition-colors">
                        Privacy Policy
                    </Link>
                    <Link href="/terms" className="hover:text-foreground transition-colors">
                        Terms of Service
                    </Link>
                </nav>
                <div className="text-sm text-muted-foreground">
                    &copy; {new Date().getFullYear()} BizIdeaSpark. All Rights Reserved.
                </div>
            </div>
        </footer>
    )
}
