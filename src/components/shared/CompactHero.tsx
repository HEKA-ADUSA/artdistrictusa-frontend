"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const heroSlides = [
    {
        id: 1,
        title: 'Abstract Modern Art',
        subtitle: 'Vibrant expressions from top studios',
        image: '/artworks/AB-0099N-LCY-40X60x1.5.jpg',
        cta: 'Browse Collection',
        link: '/artworks?category=abstract',
    },
    {
        id: 2,
        title: 'Contemporary Masterpieces',
        subtitle: 'Curated selections for modern homes',
        image: '/artworks/AB-1345-LCY-48x48x2.5.jpg',
        cta: 'View Gallery',
        link: '/artworks?filter=featured',
    },
    {
        id: 3,
        title: 'Limited Edition Prints',
        subtitle: 'Exclusive artworks from American studios',
        image: '/artworks/AB-0898-LCY-48X72X1.5.jpg',
        cta: 'Shop Now',
        link: '/artworks?filter=new',
    },
];

const categories = [
    { name: 'Abstract', icon: '🎨', link: '/artworks?category=abstract' },
    { name: 'Landscape', icon: '🏞️', link: '/artworks?category=landscape' },
    { name: 'Portrait', icon: '👤', link: '/artworks?category=portrait' },
    { name: 'Modern', icon: '✨', link: '/artworks?category=modern' },
    { name: 'Photography', icon: '📷', link: '/artworks?category=photography' },
    { name: 'Digital Art', icon: '💻', link: '/artworks?category=digital' },
];

export function CompactHero() {
    const [currentSlide, setCurrentSlide] = useState(0);

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    };

    const slide = heroSlides[currentSlide];

    return (
        <div className="grid lg:grid-cols-[300px_1fr] gap-6 mb-6">
            {/* Category Selector */}
            <div className="hidden lg:flex flex-col gap-1.5 self-end">
                <h3 className="text-base font-semibold mb-0.5">Browse by Category</h3>
                {categories.map((category) => (
                    <Link
                        key={category.name}
                        href={category.link}
                        className="flex items-center gap-2.5 p-2.5 bg-white border border-gray-200 rounded-lg hover:border-primary hover:shadow-md transition-all group"
                    >
                        <span className="text-lg">{category.icon}</span>
                        <span className="font-medium text-sm group-hover:text-primary transition-colors">
                            {category.name}
                        </span>
                    </Link>
                ))}
            </div>

            {/* Carousel */}
            <div className="relative h-[400px] lg:h-[450px] rounded-lg overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 group">
                {/* Real artwork image */}
                <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    priority
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col justify-end p-8 lg:p-12">
                    <div className="space-y-4">
                        <h2 className="text-4xl lg:text-5xl font-bold text-white">
                            {slide.title}
                        </h2>
                        <p className="text-lg lg:text-xl text-white/90">
                            {slide.subtitle}
                        </p>
                        <Link href={slide.link}>
                            <Button size="lg" className="bg-primary hover:bg-primary/90">
                                {slide.cta}
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Navigation Arrows */}
                <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <ChevronLeft className="h-6 w-6 text-gray-800" />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                    <ChevronRight className="h-6 w-6 text-gray-800" />
                </button>

                {/* Slide Indicators */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {heroSlides.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={cn(
                                "w-2 h-2 rounded-full transition-all",
                                index === currentSlide ? "bg-white w-8" : "bg-white/50"
                            )}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
