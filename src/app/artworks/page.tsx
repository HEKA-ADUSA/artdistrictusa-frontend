import { Suspense } from 'react';
import { Sidebar } from '@/components/shared/Sidebar';
import { ArtworkBrowser } from '@/components/shared/ArtworkBrowser';
import { Loader2 } from 'lucide-react';

export const metadata = {
    title: "Browse Original Art | ARTDistrictUSA",
    description: "Explore our collection of hand-painted art, fine photography, and digital creations directly from American artists.",
};

export default function ArtworksPage() {
    return (
        <div className="container px-4 py-8 md:py-12">
            <Suspense fallback={
                <div className="flex flex-col items-center justify-center py-32 space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-muted-foreground animate-pulse font-medium">Curating your collection...</p>
                </div>
            }>
                <div className="flex flex-col md:flex-row gap-12">
                    {/* Desktop Sidebar */}
                    <aside className="hidden md:block w-64 flex-shrink-0">
                        <Sidebar className="sticky top-24" />
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1">
                        <ArtworkBrowser />
                    </main>
                </div>
            </Suspense>
        </div>
    );
}
