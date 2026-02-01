"use client";

import { useEffect, useState } from 'react';
import { api } from '@/lib/api';
import { Artwork, Artist, PaginatedResponse } from '@/types';
import { ArtworkCard } from './ArtworkCard';
import { Button } from '@/components/ui/button';
import { Loader2, Palette, MapPin } from 'lucide-react';

interface ArtistProfileProps {
    artistId: string;
}

export function ArtistProfile({ artistId }: ArtistProfileProps) {
    const [artist, setArtist] = useState<Artist | null>(null);
    const [artworks, setArtworks] = useState<Artwork[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArtistData = async () => {
            setLoading(true);
            try {
                // Fetch artworks by this artist
                const artworkRes = await api.get<PaginatedResponse<Artwork>>(`/artworks`, {
                    params: { artistId, limit: 20 }
                });
                setArtworks(artworkRes.data.data);

                // Extract artist info from the first artwork if available, 
                // or fetch from an artist endpoint if we have one.
                if (artworkRes.data.data.length > 0) {
                    setArtist(artworkRes.data.data[0].artist);
                }
            } catch (error) {
                console.error("Failed to fetch artist profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArtistData();
    }, [artistId]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground animate-pulse font-medium">Loading artist gallery...</p>
            </div>
        );
    }

    if (!artist) {
        return (
            <div className="text-center py-32">
                <h2 className="text-2xl font-bold">Artist not found</h2>
                <Button variant="link" onClick={() => window.history.back()} className="mt-4">Go back</Button>
            </div>
        );
    }

    return (
        <div className="container px-4 py-12">
            {/* Artist Header */}
            <div className="max-w-4xl mx-auto mb-16 text-center space-y-6">
                <div className="h-24 w-24 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-4xl mx-auto shadow-inner">
                    {artist.name.charAt(0)}
                </div>
                <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">{artist.name}</h1>
                    <div className="flex items-center justify-center gap-4 text-muted-foreground">
                        <span className="flex items-center gap-1"><Palette className="h-4 w-4" /> Fine Artist</span>
                        <span className="flex items-center gap-1"><MapPin className="h-4 w-4" /> Verified Studio</span>
                    </div>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    {artist.bio || `${artist.name} is an independent creator sharing original works through ARTDistrictUSA. Support independent art by collecting these unique pieces.`}
                </p>
                <div className="flex justify-center gap-4 pt-4">
                    <Button variant="outline" size="lg">Contact Artist</Button>
                    <Button size="lg" className="bg-primary hover:bg-primary/90">Follow</Button>
                </div>
            </div>

            <hr className="mb-16" />

            {/* Artist's Works */}
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold tracking-tight">Gallery Collection</h2>
                    <p className="text-sm text-muted-foreground">{artworks.length} Artworks</p>
                </div>

                {artworks.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {artworks.map((art) => (
                            <ArtworkCard
                                key={art.id}
                                id={art.id}
                                title={art.title}
                                artistName={artist.name}
                                price={art.priceUsd}
                                imageUrl={art.images.find(i => i.isPrimary)?.thumbUrl || art.images[0]?.thumbUrl || ""}
                                category={art.category}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-muted/30 rounded-xl border border-dashed">
                        <p className="text-muted-foreground">This artist hasn't published any artworks yet.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
