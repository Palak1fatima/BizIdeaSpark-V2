
import { Header } from '@/components/page/header';

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-body">
      <Header />
      <main className="flex-1">
        <div className="py-12 md:py-20 px-4 border-b">
           <h2 className="text-4xl sm:text-5xl md:text-6xl font-black font-headline mb-4 text-foreground tracking-tight text-center">
             Privacy Policy
           </h2>
           <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-center">
            Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
           </p>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-8 py-12 md:py-20">
            <div className="prose prose-lg prose-invert mx-auto text-muted-foreground">
                <p>This Privacy Policy explains how BizIdeaSpark (“we”, “our”, “us”) handles information when you use our website.</p>

                <h3 className="text-foreground">What we collect</h3>
                <ul className="list-disc space-y-2">
                    <li>Your name and email address (if you use our contact form or join our waitlist).</li>
                    <li>Anonymous usage data (via Google Analytics).</li>
                </ul>

                <h3 className="text-foreground">How we use it</h3>
                <ul className="list-disc space-y-2">
                    <li>To respond to your messages.</li>
                    <li>To send occasional updates if you join the waitlist.</li>
                    <li>To improve our website based on usage data.</li>
                </ul>

                <h3 className="text-foreground">Cookies</h3>
                <p>We use Google Analytics cookies to understand site traffic and usage patterns.</p>

                <h3 className="text-foreground">Data protection</h3>
                <p>We take steps to protect your personal information and will never sell or share it with third parties, unless required by law.</p>

                <h3 className="text-foreground">Your choices</h3>
                <p>If you’d like us to delete your information, please contact us through the form on our website.</p>

                <h3 className="text-foreground">External links</h3>
                <p>Our site may contain links to other websites. We are not responsible for the privacy practices of those websites.</p>
            </div>
        </div>
      </main>
    </div>
  );
}
