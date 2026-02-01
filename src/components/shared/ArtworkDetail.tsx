"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Artwork } from '@/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart, Heart, Share2, ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ArtworkDetailProps {
    artwork: Artwork;
}

export function ArtworkDetail({ artwork }: ArtworkDetailProps) {
    const [selectedImage, setSelectedImage] = useState(
        artwork.images.find(img => img.isPrimary) || artwork.images[0]
    );

    return (
        <div className="container px-4 py-8 md:py-16">
            <Link href="/artworks" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary mb-8 transition-colors">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Collection
            </Link>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
                {/* Image Gallery */}
                <div className="space-y-4">
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-muted shadow-2xl">
                        <Image
                            src={selectedImage.originalUrl}
                            alt={artwork.title}
                            fill
                            className="object-contain p-4"
                            priority
                            sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                    </div>

                    {artwork.images.length > 1 && (
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {artwork.images.map((img) => (
                                <button
                                    key={img.id}
                                    onClick={() => setSelectedImage(img)}
                                    className={cn(
                                        "relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border-2 transition-all",
                                        selectedImage.id === img.id ? "border-primary" : "border-transparent opacity-60 hover:opacity-100"
                                    )}
                                >
                                    <Image
                                        src={img.thumbUrl}
                                        alt="Thumbnail"
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Product Info */}
                <div className="flex flex-col h-full">
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/15">{artwork.category}</Badge>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">{artwork.title}</h1>
                            <div className="flex items-center gap-2 text-xl font-medium text-muted-foreground">
                                <span>by</span>
                                <Link href={`/artists/${artwork.artist.id}`} className="text-foreground hover:text-primary transition-colors underline-offset-4 hover:underline">
                                    {artwork.artist.name}
                                </Link>
                            </div>
                        </div>

                        <div className="text-3xl font-bold py-4 border-y border-border">
                            ${artwork.priceUsd.toLocaleString()}
                        </div>

                        <p className="text-lg text-muted-foreground leading-relaxed">
                            {artwork.description || "No description provided for this masterpiece."}
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                            <Button size="lg" className="flex-1 h-14 text-lg font-semibold bg-primary hover:bg-primary/90">
                                <ShoppingCart className="mr-2 h-5 w-5" /> Inquire / Purchase
                            </Button>
                            <div className="flex gap-4">
                                <Button variant="outline" size="icon" className="h-14 w-14 border-2">
                                    <Heart className="h-6 w-6" />
                                </Button>
                                <Button variant="outline" size="icon" className="h-14 w-14 border-2">
                                    <Share2 className="h-6 w-6" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Artist Card */}
                    <div className="mt-auto pt-12">
                        <Card className="bg-muted/30 border-none shadow-none">
                            <CardContent className="p-6 flex items-center gap-6">
                                <div className="h-16 w-16 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-2xl">
                                    {artwork.artist.name.charAt(0)}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-bold text-lg">About the Artist</h4>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        {artwork.artist.bio || "An independent artist sharing their vision with the world."}
                                    </p>
                                    <Link href={`/artists/${artwork.artist.id}`} className="text-primary text-sm font-semibold hover:underline mt-2 inline-block">
                                        View Full Profile
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
