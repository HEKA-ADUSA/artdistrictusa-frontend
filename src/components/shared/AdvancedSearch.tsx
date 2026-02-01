"use client";

import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const themes = [
    'All Themes',
    'Abstract',
    'Landscape',
    'Portrait',
    'Still Life',
    'Urban',
    'Nature',
    'Modern',
    'Contemporary',
];

const categories = [
    'All Categories',
    'Painting',
    'Photography',
    'Digital',
    'Mixed Media',
    'Sculpture',
];

const sizes = [
    'All Sizes',
    'Small (under 24")',
    'Medium (24"-40")',
    'Large (40"-60")',
    'Extra Large (60"+)',
];

const colors = [
    'All Colors',
    'Red',
    'Blue',
    'Green',
    'Yellow',
    'Black & White',
    'Multicolor',
    'Earth Tones',
];

const mediums = [
    'All Mediums',
    'Oil',
    'Acrylic',
    'Watercolor',
    'Digital',
    'Photography',
    'Mixed Media',
];

export function AdvancedSearch() {
    const [theme, setTheme] = useState('All Themes');
    const [category, setCategory] = useState('All Categories');
    const [size, setSize] = useState('All Sizes');
    const [color, setColor] = useState('All Colors');
    const [medium, setMedium] = useState('All Mediums');
    const [artist, setArtist] = useState('');
    const [customSearch, setCustomSearch] = useState('');

    const handleSearch = () => {
        // TODO: Implement search functionality
        console.log('Search:', { theme, category, size, color, medium, artist, customSearch });
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <Search className="h-4 w-4" />
                    Advanced Search
                    <ChevronDown className="h-4 w-4" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="start">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none">Find Your Perfect Artwork</h4>
                        <p className="text-sm text-muted-foreground">
                            Filter by theme, category, size, and more
                        </p>
                    </div>
                    <div className="grid gap-3">
                        {/* Theme */}
                        <div className="grid gap-1">
                            <label className="text-sm font-medium">Theme</label>
                            <Select value={theme} onValueChange={setTheme}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {themes.map((t) => (
                                        <SelectItem key={t} value={t}>
                                            {t}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Category */}
                        <div className="grid gap-1">
                            <label className="text-sm font-medium">Category</label>
                            <Select value={category} onValueChange={setCategory}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {categories.map((c) => (
                                        <SelectItem key={c} value={c}>
                                            {c}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Size */}
                        <div className="grid gap-1">
                            <label className="text-sm font-medium">Size</label>
                            <Select value={size} onValueChange={setSize}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {sizes.map((s) => (
                                        <SelectItem key={s} value={s}>
                                            {s}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Color */}
                        <div className="grid gap-1">
                            <label className="text-sm font-medium">Color</label>
                            <Select value={color} onValueChange={setColor}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {colors.map((c) => (
                                        <SelectItem key={c} value={c}>
                                            {c}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Medium */}
                        <div className="grid gap-1">
                            <label className="text-sm font-medium">Medium</label>
                            <Select value={medium} onValueChange={setMedium}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {mediums.map((m) => (
                                        <SelectItem key={m} value={m}>
                                            {m}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Artist */}
                        <div className="grid gap-1">
                            <label className="text-sm font-medium">Artist</label>
                            <Input
                                placeholder="Search by artist name..."
                                value={artist}
                                onChange={(e) => setArtist(e.target.value)}
                            />
                        </div>

                        {/* AI-Powered Custom Search */}
                        <div className="grid gap-1 pt-2 border-t">
                            <label className="text-sm font-medium">Or Describe What You Want</label>
                            <Input
                                placeholder="e.g., 'Vibrant abstract for living room'"
                                value={customSearch}
                                onChange={(e) => setCustomSearch(e.target.value)}
                                className="h-20"
                            />
                            <p className="text-xs text-muted-foreground">
                                Our AI will find the best matches for you
                            </p>
                        </div>

                        <Button onClick={handleSearch} className="w-full">
                            <Search className="mr-2 h-4 w-4" />
                            Search Artworks
                        </Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}
