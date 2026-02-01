'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

const slides = [
    {
        title: 'Original Art From American Studios',
        subtitle: 'Abstract Modern Masterpieces',
        description: 'Discover curated high-end abstract expressionism directly from independent studios. 0% Commission. 100% Artist Support.',
        image: '/images/featured/abstract.png',
        cta: 'Browse Abstract',
        link: '/artworks?category=Painting',
    },
    {
        title: 'Perspective in Black & White',
        subtitle: 'Fine Art Photography',
        description: 'Breathtaking North American landscapes captured in timeless monochrome. Limited edition prints available.',
        image: '/images/featured/photography.png',
        cta: 'View Gallery',
        link: '/artworks?category=Photography',
    },
    {
        title: 'The Digital Frontier',
        subtitle: 'Ethereal Creations',
        description: 'Sophisticated digital art that redefines modern aesthetics. Avant-garde pieces for the discerning collector.',
        image: '/images/featured/digital.png',
        cta: 'Explore Digital',
        link: '/artworks?category=Digital',
    },
    {
        title: 'Form & Texture',
        subtitle: 'Mixed Media Sculptures',
        description: 'Modern wall sculptures that bring tactile depth and geometric harmony to your space.',
        image: '/images/featured/sculpture.png',
        cta: 'Browse Sculptures',
        link: '/artworks?category=Sculpture',
    },
];

export function HeroCarousel() {
    const plugin = React.useRef(
        Autoplay({ delay: 5000, stopOnInteraction: true })
    );

    return (
        <section className="relative w-full h-[85vh] min-h-[600px] overflow-hidden bg-black">
            <Carousel
                plugins={[plugin.current]}
                className="w-full h-full"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
            >
                <CarouselContent className="h-full ml-0">
                    {slides.map((slide, index) => (
                        <CarouselItem key={index} className="relative h-[85vh] w-full pl-0">
                            {/* Background Image */}
                            <div className="absolute inset-0 w-full h-full">
                                <Image
                                    src={slide.image}
                                    alt={slide.title}
                                    fill
                                    className="object-cover opacity-70"
                                    priority={index === 0}
                                />
                                {/* Premium Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-r from-background via-background/40 to-transparent" />
                            </div>

                            {/* Content Container */}
                            <div className="container relative z-10 h-full flex items-center px-4 md:px-8">
                                <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-left-8 duration-1000">
                                    <div className="space-y-4">
                                        <Badge variant="outline" className="text-primary border-primary px-4 py-1.5 text-xs font-bold uppercase tracking-widest bg-primary/5 backdrop-blur-sm">
                                            {slide.subtitle}
                                        </Badge>
                                        <h1 className="text-5xl md:text-8xl font-bold tracking-tight text-foreground leading-[1.05]">
                                            {slide.title.split(' ').map((word, i) => (
                                                <span key={i}>
                                                    {word === 'American' || word === 'Black' || word === 'Digital' || word === 'Form' ? (
                                                        <span className="text-primary block md:inline">{word} </span>
                                                    ) : (
                                                        <>{word} </>
                                                    )}
                                                </span>
                                            ))}
                                        </h1>
                                    </div>

                                    <p className="text-xl text-muted-foreground leading-relaxed max-w-xl font-medium">
                                        {slide.description}
                                    </p>

                                    <div className="flex flex-wrap gap-5 pt-4">
                                        <Link href={slide.link}>
                                            <Button size="lg" className="h-14 px-10 text-lg font-semibold rounded-none bg-primary hover:bg-primary/90 transition-all duration-300 shadow-xl shadow-primary/20">
                                                {slide.cta}
                                            </Button>
                                        </Link>
                                        <Link href="/sell">
                                            <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-semibold rounded-none border-2 bg-transparent text-foreground hover:bg-foreground hover:text-background transition-all duration-300">
                                                Become an Artist
                                            </Button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                {/* Navigation - Hidden on mobile, subtle on desktop */}
                <div className="absolute bottom-12 right-12 flex gap-4 z-20">
                    <CarouselPrevious className="static h-12 w-12 rounded-none border-foreground/20 bg-background/50 backdrop-blur-sm hover:bg-primary hover:text-white transition-colors translate-y-0" />
                    <CarouselNext className="static h-12 w-12 rounded-none border-foreground/20 bg-background/50 backdrop-blur-sm hover:bg-primary hover:text-white transition-colors translate-y-0" />
                </div>
            </Carousel>
        </section>
    );
}
