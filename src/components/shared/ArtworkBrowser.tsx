"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { api } from '@/lib/api';
import { Artwork, PaginatedResponse } from '@/types';
import { ArtworkCard } from './ArtworkCard';
import { Button } from '@/components/ui/button';
import { Loader2, SlidersHorizontal } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Sidebar } from './Sidebar';

export function ArtworkBrowser() {
    const searchParams = useSearchParams();
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [loading, setLoading] = useState(true);
    const [pagination, setPagination] = useState({
        total: 0,
        page: 1,
        totalPages: 1
    });

    const category = searchParams.get('category');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const page = searchParams.get('page') || '1';

    useEffect(() => {
        const fetchArtworks = async () => {
            setLoading(true);
            try {
                const params: any = { page, limit: 12 };
                if (category && category !== 'All') params.category = category;
                if (minPrice) params.minPrice = minPrice;
                if (maxPrice) params.maxPrice = maxPrice;

                const response = await api.get<PaginatedResponse<Artwork>>('/artworks', { params });
                setArtworks(response.data.data);
                setPagination(response.data.pagination);
            } catch (error) {
                console.error("Failed to fetch artworks:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArtworks();
    }, [category, minPrice, maxPrice, page]);

    return (
        <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold tracking-tight text-foreground">
                    {category && category !== 'All' ? category : 'All Artworks'}
                    <span className="ml-3 text-sm font-normal text-muted-foreground">({pagination.total} results)</span>
                </h1>

                {/* Mobile Filter Trigger */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline" size="sm" className="md:hidden flex items-center gap-2">
                            <SlidersHorizontal className="h-4 w-4" /> Filters
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px]">
                        <Sidebar className="mt-8" />
                    </SheetContent>
                </Sheet>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-32 space-y-4">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                    <p className="text-muted-foreground animate-pulse font-medium">Curating your collection...</p>
                </div>
            ) : artworks.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                        {artworks.map((artwork) => (
                            <ArtworkCard
                                key={artwork.id}
                                id={artwork.id}
                                title={artwork.title}
                                artistName={artwork.artist.name}
                                price={artwork.priceUsd}
                                imageUrl={artwork.images.find(img => img.isPrimary)?.thumbUrl || artwork.images[0]?.thumbUrl || "https://images.unsplash.com/photo-1541963463532-d68292c34b19"}
                                category={artwork.category}
                            />
                        ))}
                    </div>

                    {/* Simple Pagination */}
                    {pagination.totalPages > 1 && (
                        <div className="flex justify-center items-center gap-4 mt-8 pb-12">
                            <Button
                                variant="outline"
                                disabled={pagination.page <= 1}
                                onClick={() => {
                                    const params = new URLSearchParams(searchParams.toString());
                                    params.set('page', (pagination.page - 1).toString());
                                    window.history.pushState(null, '', `?${params.toString()}`);
                                    // Hack to trigger useEffect without full reload
                                    window.dispatchEvent(new PopStateEvent('popstate'));
                                }}
                            >
                                Previous
                            </Button>
                            <span className="text-sm font-medium">Page {pagination.page} of {pagination.totalPages}</span>
                            <Button
                                variant="outline"
                                disabled={pagination.page >= pagination.totalPages}
                                onClick={() => {
                                    const params = new URLSearchParams(searchParams.toString());
                                    params.set('page', (pagination.page + 1).toString());
                                    window.history.pushState(null, '', `?${params.toString()}`);
                                    window.dispatchEvent(new PopStateEvent('popstate'));
                                }}
                            >
                                Next
                            </Button>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-32 bg-muted/20 rounded-xl border border-dashed">
                    <h3 className="text-xl font-semibold mb-2">No artworks found</h3>
                    <p className="text-muted-foreground">Try adjusting your filters or category.</p>
                    <Button variant="link" onClick={() => window.location.href = '/artworks'} className="mt-4">Clear all filters</Button>
                </div>
            )}
        </div>
    );
}
