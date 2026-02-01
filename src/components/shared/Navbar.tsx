"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { AdvancedSearch } from './AdvancedSearch';

const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'ALL ARTWORK', href: '/artworks' },
    { label: 'BESTSELLER', href: '/artworks?filter=bestseller' },
    { label: 'FEATURED', href: '/artworks?filter=featured' },
    { label: 'NEWALTIES', href: '/artworks?filter=new' },
    { label: 'OFFERS', href: '/artworks?filter=offers' },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
            {/* Top Row: Logo and Auth Buttons */}
            <div className="container flex h-32 items-center justify-between px-4 border-b">
                {/* Logo */}
                <Link href="/" className="flex items-center">
                    <Image
                        src="/logo.png"
                        alt="ARTDistrictUSA - Where Art Meets Your Home"
                        width={600}
                        height={128}
                        className="h-32 w-auto brightness-110 contrast-125"
                        style={{ filter: 'hue-rotate(-5deg) saturate(1.4)' }}
                        priority
                    />
                </Link>

                {/* Auth Buttons - Desktop */}
                <div className="hidden md:flex items-center gap-3">
                    <Link href="/login/customer">
                        <Button variant="outline" size="sm" className="gap-2">
                            <User className="h-4 w-4" />
                            Customer Login
                        </Button>
                    </Link>
                    <Link href="/login/artist">
                        <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                            Artist/Service Login
                        </Button>
                    </Link>
                    <Button variant="ghost" size="icon" className="relative">
                        <ShoppingCart className="h-5 w-5" />
                        <span className="sr-only">Cart</span>
                    </Button>
                </div>

                {/* Mobile Menu */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden">
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[300px]">
                        <nav className="flex flex-col space-y-4 mt-8">
                            {navItems.map((item) => (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className="text-lg font-semibold hover:text-primary"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <hr />
                            <Link href="/login/customer" className="text-lg font-semibold hover:text-primary">
                                Customer Login
                            </Link>
                            <Link href="/login/artist" className="text-lg font-semibold hover:text-primary">
                                Artist/Service Login
                            </Link>
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>

            {/* Bottom Row: Navigation */}
            <div className="container flex h-12 items-center justify-between px-4">
                <nav className="hidden lg:flex items-center space-x-6">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary",
                                pathname === item.href ? "text-primary font-semibold" : "text-foreground"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Advanced Search */}
                <div className="ml-auto">
                    <AdvancedSearch />
                </div>
            </div>
        </header>
    );
}
