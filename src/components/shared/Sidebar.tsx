"use client";

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

const categories = [
    'All',
    'Painting',
    'Photography',
    'Digital',
    'Sculpture',
    'Mixed Media',
    'Giclee Prints',
];

const priceRanges = [
    { label: 'Under $500', min: 0, max: 500 },
    { label: '$500 - $1,000', min: 500, max: 1000 },
    { label: '$1,000 - $5,000', min: 1000, max: 5000 },
    { label: 'Over $5,000', min: 5000, max: undefined },
];

interface SidebarProps {
    onClose?: () => void;
    className?: string;
}

export function Sidebar({ onClose, className }: SidebarProps) {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const currentCategory = searchParams.get('category') || 'All';
    const currentMinPrice = searchParams.get('minPrice');
    const currentMaxPrice = searchParams.get('maxPrice');

    const updateFilter = (key: string, value: string | undefined) => {
        const params = new URLSearchParams(searchParams.toString());
        if (value && value !== 'All') {
            params.set(key, value);
        } else {
            params.delete(key);
        }

        // Reset pagination when filter changes
        params.delete('page');

        router.push(`${pathname}?${params.toString()}`);
        if (onClose) onClose();
    };

    const updatePrice = (min: number, max: number | undefined) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set('minPrice', min.toString());
        if (max) {
            params.set('maxPrice', max.toString());
        } else {
            params.delete('maxPrice');
        }
        params.delete('page');
        router.push(`${pathname}?${params.toString()}`);
        if (onClose) onClose();
    };

    const clearFilters = () => {
        router.push(pathname);
        if (onClose) onClose();
    };

    return (
        <aside className={cn("space-y-8", className)}>
            <div className="flex items-center justify-between md:hidden">
                <h2 className="text-xl font-bold">Filters</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                    <X className="h-5 w-5" />
                </Button>
            </div>

            <div>
                <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Category</h3>
                <div className="flex flex-col space-y-1">
                    {categories.map((cat) => (
                        <Button
                            key={cat}
                            variant="ghost"
                            className={cn(
                                "justify-start font-medium h-9 px-3 hover:bg-muted/50",
                                currentCategory === cat ? "bg-primary/10 text-primary hover:bg-primary/15" : "text-foreground/70"
                            )}
                            onClick={() => updateFilter('category', cat)}
                        >
                            {cat}
                        </Button>
                    ))}
                </div>
            </div>

            <div>
                <h3 className="font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Price Range</h3>
                <div className="flex flex-col space-y-1">
                    {priceRanges.map((range) => (
                        <Button
                            key={range.label}
                            variant="ghost"
                            className={cn(
                                "justify-start font-medium h-9 px-3 hover:bg-muted/50 text-foreground/70",
                                currentMinPrice === range.min.toString() &&
                                    (range.max ? currentMaxPrice === range.max.toString() : !currentMaxPrice)
                                    ? "bg-primary/10 text-primary hover:bg-primary/15" : ""
                            )}
                            onClick={() => updatePrice(range.min, range.max)}
                        >
                            {range.label}
                        </Button>
                    ))}
                </div>
            </div>

            <Button
                variant="outline"
                className="w-full text-xs"
                size="sm"
                onClick={clearFilters}
            >
                Clear All Filters
            </Button>
        </aside>
    );
}
