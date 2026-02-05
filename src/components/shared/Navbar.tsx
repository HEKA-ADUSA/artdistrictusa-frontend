"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { ShoppingCart, User, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

const navItems = [
    { label: 'HOME', href: '/' },
    { label: 'ALL ARTWORK', href: '/artworks' },
    { label: 'BESTSELLER', href: '/artworks?filter=bestseller' },
    { label: 'FEATURED', href: '/artworks?filter=featured' },
    { label: 'NEWALTIES', href: '/artworks?filter=new' },
    { label: 'OFFERS', href: '/artworks?filter=offers' },
    { label: 'SELL', href: '/sell' },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
            {/* Single Row: Logo, Nav, and Auth - Compact Layout */}
            <div className="w-full max-w-[1400px] flex h-24 items-center px-4 md:px-8 gap-10">
                {/* Logo */}
                <Link href="/" className="flex items-center flex-shrink-0">
                    <Image
                        src="/logo-new.png"
                        alt="ARTDistrictUSA"
                        width={432}
                        height={140}
                        className="h-20 w-auto"
                        priority
                    />
                </Link>

                {/* Navigation - Desktop */}
                <nav className="hidden lg:flex items-center space-x-5 flex-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "text-sm font-medium transition-colors hover:text-primary whitespace-nowrap",
                                pathname === item.href ? "text-primary font-semibold" : "text-foreground"
                            )}
                        >
                            {item.label}
                        </Link>
                    ))}
                </nav>

                {/* Auth Buttons & Cart - Desktop */}
                <div className="hidden md:flex items-start gap-3 flex-shrink-0">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                            <Link href="/login/customer">
                                <Button variant="outline" size="sm" className="gap-2 h-8">
                                    <User className="h-3.5 w-3.5" />
                                    <span className="text-xs">Customer Login</span>
                                </Button>
                            </Link>
                            <Link href="/cart">
                                <Button variant="ghost" size="icon" className="relative h-8 w-8">
                                    <ShoppingCart className="h-4 w-4" />
                                    <span className="sr-only">Cart</span>
                                </Button>
                            </Link>
                        </div>
                        <Link href="/sell">
                            <Button size="sm" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-8 w-full">
                                <span className="text-xs">Artist/Service Login</span>
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Mobile Menu */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="md:hidden ml-auto">
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
        </header>
    );
}
