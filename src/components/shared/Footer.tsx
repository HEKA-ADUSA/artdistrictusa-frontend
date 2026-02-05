"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Mail, Send, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Footer() {
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [arGalleryEmail, setArGalleryEmail] = useState('');
    const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [arGalleryStatus, setArGalleryStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Integrate with newsletter service
        setNewsletterStatus('success');
        setNewsletterEmail('');
        setTimeout(() => setNewsletterStatus('idle'), 3000);
    };

    const handleArGallerySubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Integrate with waitlist service
        setArGalleryStatus('success');
        setArGalleryEmail('');
        setTimeout(() => setArGalleryStatus('idle'), 3000);
    };

    return (
        <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white mt-auto">
            {/* Newsletter & Virtual AR Gallery Section */}
            <div className="border-b border-gray-700">
                <div className="container px-4 md:px-8 py-12">
                    <div className="grid md:grid-cols-2 gap-12">
                        {/* Newsletter Signup */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Mail className="h-8 w-8 text-primary" />
                                <div>
                                    <h3 className="text-2xl font-bold">Stay Inspired</h3>
                                    <p className="text-gray-400 text-sm">Get art updates & exclusive offers</p>
                                </div>
                            </div>
                            <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                                <div className="flex gap-2">
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={newsletterEmail}
                                        onChange={(e) => setNewsletterEmail(e.target.value)}
                                        required
                                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary"
                                    />
                                    <Button type="submit" className="bg-primary hover:bg-primary/90 shrink-0">
                                        <Send className="h-4 w-4" />
                                    </Button>
                                </div>
                                {newsletterStatus === 'success' && (
                                    <p className="text-green-400 text-sm">✓ Successfully subscribed!</p>
                                )}
                            </form>
                        </div>

                        {/* Virtual AR Gallery Waitlist */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <Sparkles className="h-8 w-8 text-primary" />
                                <div>
                                    <h3 className="text-2xl font-bold">Virtual AR Gallery</h3>
                                    <p className="text-gray-400 text-sm">Be first to experience art in your space</p>
                                </div>
                            </div>
                            <form onSubmit={handleArGallerySubmit} className="space-y-3">
                                <div className="flex gap-2">
                                    <Input
                                        type="email"
                                        placeholder="Join the waitlist"
                                        value={arGalleryEmail}
                                        onChange={(e) => setArGalleryEmail(e.target.value)}
                                        required
                                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500 focus:border-primary"
                                    />
                                    <Button type="submit" className="bg-primary hover:bg-primary/90 shrink-0">
                                        Join
                                    </Button>
                                </div>
                                {arGalleryStatus === 'success' && (
                                    <p className="text-green-400 text-sm">✓ You're on the waitlist!</p>
                                )}
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container px-4 md:px-8 py-12">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link href="/" className="inline-block">
                            <Image
                                src="/logo-new.png"
                                alt="ARTDistrictUSA"
                                width={320}
                                height={80}
                                className="h-14 w-auto"
                            />
                        </Link>
                        <p className="text-gray-400 text-sm">
                            Connecting independent artists with collectors worldwide. A premium marketplace dedicated to original fine art and limited editions.
                        </p>
                    </div>

                    {/* Marketplace */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Marketplace</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link href="/artworks" className="hover:text-primary transition-colors">All Paintings</Link></li>
                            <li><Link href="/artworks?category=abstract" className="hover:text-primary transition-colors">Abstract Art</Link></li>
                            <li><Link href="/artworks?category=landscape" className="hover:text-primary transition-colors">Landscape</Link></li>
                            <li><Link href="/artists" className="hover:text-primary transition-colors">Our Artists</Link></li>
                            <li><Link href="/artworks?filter=new" className="hover:text-primary transition-colors">New Arrivals</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Support</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><Link href="/faq" className="hover:text-primary transition-colors">FAQ</Link></li>
                            <li><Link href="/shipping" className="hover:text-primary transition-colors">Shipping & Returns</Link></li>
                            <li><Link href="/terms" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="font-bold text-lg mb-4">Contact Us</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex items-center gap-2">
                                <Mail className="h-4 w-4" />
                                <a href="mailto:support@artdistrictusa.com" className="hover:text-primary transition-colors">
                                    support@artdistrictusa.com
                                </a>
                            </li>
                            <li>📞 24/7 at 888-888-8888</li>
                            <li>📍 Based in USA</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Copyright */}
            <div className="border-t border-gray-800">
                <div className="container px-4 md:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
                        <p>© 2026 ARTDistrictUSA. All rights reserved.</p>
                        <p className="text-primary font-semibold">0% Commission • 100% Artist Focused</p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
