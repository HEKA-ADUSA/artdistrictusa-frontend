"use client";
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, Globe, Shield, Zap, CheckCircle2 } from 'lucide-react';

const howItWorks = [
    {
        number: "1",
        title: "Create Your Profile",
        description: "Sign up in minutes. Build your artist profile with bio, portfolio, and connect your Stripe account for instant payments."
    },
    {
        number: "2",
        title: "Upload Your Art",
        description: "Add up to 12 high-res images per artwork (20MB each). Set prices, dimensions, and compelling descriptions."
    },
    {
        number: "3",
        title: "Sell & Earn",
        description: "When collectors buy, payments are held 5-7 days then go directly to your Stripe. 0% commission—just 2.9% + $0.30."
    }
];

export const metadata = {
    title: "Sell Your Art | 0% Commission | ARTDistrictUSA",
    description: "Join the art marketplace revolution. ARTDistrictUSA connects artists directly with collectors—no middleman fees, no hidden costs.",
};

export default function SellArtPage() {
    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative min-h-[600px] bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white overflow-hidden">
                <div className="container px-4 md:px-8 py-16 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Left Column - Content */}
                        <div className="space-y-8">
                            <Badge className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur">
                                🎨 Zero Commission Platform
                            </Badge>

                            <div>
                                <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
                                    Sell Your Art.<br />
                                    Keep <span className="text-primary">100%</span>.
                                </h1>
                                <p className="text-xl text-gray-300 leading-relaxed">
                                    Join the art marketplace revolution. ARTDistrictUSA connects artists directly with collectors—no middleman fees, no hidden costs. You create, you sell, you keep everything.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-4">
                                <Link href="/artist/onboarding">
                                    <Button size="lg" className="h-14 px-10 text-lg font-bold bg-primary hover:bg-primary/90">
                                        Start Selling Free
                                    </Button>
                                </Link>
                                <Link href="/artworks">
                                    <Button size="lg" variant="outline" className="h-14 px-10 text-lg font-semibold border-white/20 hover:bg-white/10 text-white">
                                        Browse Artwork
                                    </Button>
                                </Link>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10">
                                <div>
                                    <div className="text-3xl md:text-4xl font-bold text-primary">2,500+</div>
                                    <div className="text-sm text-gray-400">Active Artists</div>
                                </div>
                                <div>
                                    <div className="text-3xl md:text-4xl font-bold text-primary">15,000+</div>
                                    <div className="text-sm text-gray-400">Artworks Listed</div>
                                </div>
                                <div>
                                    <div className="text-3xl md:text-4xl font-bold text-primary">$2.4M+</div>
                                    <div className="text-sm text-gray-400">Artist Earnings</div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Artwork Showcase Card */}
                        <div className="relative">
                            <div className="bg-white rounded-2xl p-4 shadow-2xl">
                                <div className="relative aspect-[4/5] rounded-xl overflow-hidden mb-4">
                                    <Image
                                        src="/artworks/AB-0099N-LCY-40X60x1.5.jpg"
                                        alt="Featured Artwork"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute top-4 left-4">
                                        <Badge className="bg-primary text-white">
                                            🎉 New Sale!
                                        </Badge>
                                    </div>
                                    <div className="absolute bottom-4 right-4 bg-white rounded-lg p-3">
                                        <div className="flex items-center gap-2">
                                            <span className="text-yellow-500">⭐</span>
                                            <span className="font-bold">5.0 Rating</span>
                                        </div>
                                        <div className="text-xs text-gray-600">From 234 collectors</div>
                                    </div>
                                </div>
                                <div className="text-center">
                                    <div className="font-semibold text-gray-900">Abstract Dreams - $1,200</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Diagonal Split Background */}
                <div className="absolute right-0 top-0 bottom-0 w-1/2 bg-primary transform skew-x-12 origin-top-right opacity-90"></div>
            </section>

            {/* How It Works */}
            <section className="py-20 bg-gray-50">
                <div className="container px-4 md:px-8">
                    <div className="text-center mb-16">
                        <p className="text-sm font-bold tracking-widest text-primary uppercase mb-2">SIMPLE PROCESS</p>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">How It Works</h2>
                        <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
                            From uploading your first piece to receiving payment—we've made it effortless.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12 max-w-5xl mx-auto">
                        {howItWorks.map((step) => (
                            <div key={step.number} className="text-center space-y-4">
                                <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary text-white text-2xl font-bold">
                                    {step.number}
                                </div>
                                <h3 className="text-xl font-bold">{step.title}</h3>
                                <p className="text-gray-600">{step.description}</p>
                            </div>
                        ))}
                    </div>

                    <div className="text-center mt-12">
                        <Link href="/artist/onboarding">
                            <Button size="lg" className="h-12 px-8 font-bold">
                                Get Started Now
                            </Button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Meet Our Top Artists */}
            <section className="py-20 bg-gray-50">
                <div className="container px-4 md:px-8">
                    <div className="text-center mb-16">
                        <p className="text-sm font-bold tracking-widest text-primary uppercase mb-2">ARTIST SPOTLIGHT</p>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Meet Our Top Artists</h2>
                        <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
                            Talented creators from across the nation, building sustainable art careers on our platform.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* Artist 1 */}
                        <div className="bg-white rounded-2xl p-8 text-center space-y-4 shadow-md hover:shadow-xl transition-shadow">
                            <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-200">
                                <div className="absolute inset-0 bg-gradient-to-br from-red-400 to-pink-500"></div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Sarah Mitchell</h3>
                                <p className="text-gray-600">Abstract Painter</p>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-green-600 text-sm font-semibold">
                                <CheckCircle2 className="h-4 w-4" />
                                Verified Artist
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                <div>
                                    <div className="text-2xl font-bold">42</div>
                                    <div className="text-sm text-gray-600">Artworks</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">156</div>
                                    <div className="text-sm text-gray-600">Sales</div>
                                </div>
                            </div>
                        </div>

                        {/* Artist 2 */}
                        <div className="bg-white rounded-2xl p-8 text-center space-y-4 shadow-md hover:shadow-xl transition-shadow">
                            <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-200">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-500"></div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Marcus Chen</h3>
                                <p className="text-gray-600">Urban Photographer</p>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-green-600 text-sm font-semibold">
                                <CheckCircle2 className="h-4 w-4" />
                                Verified Artist
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                <div>
                                    <div className="text-2xl font-bold">87</div>
                                    <div className="text-sm text-gray-600">Artworks</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">234</div>
                                    <div className="text-sm text-gray-600">Sales</div>
                                </div>
                            </div>
                        </div>

                        {/* Artist 3 */}
                        <div className="bg-white rounded-2xl p-8 text-center space-y-4 shadow-md hover:shadow-xl transition-shadow">
                            <div className="relative w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-200">
                                <div className="absolute inset-0 bg-gradient-to-br from-purple-400 to-indigo-500"></div>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">Elena Rodriguez</h3>
                                <p className="text-gray-600">Impressionist Artist</p>
                            </div>
                            <div className="flex items-center justify-center gap-2 text-green-600 text-sm font-semibold">
                                <CheckCircle2 className="h-4 w-4" />
                                Verified Artist
                            </div>
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                                <div>
                                    <div className="text-2xl font-bold">35</div>
                                    <div className="text-sm text-gray-600">Artworks</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">89</div>
                                    <div className="text-sm text-gray-600">Sales</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Membership Plans */}
            <MembershipPlansSection />

            {/* White-Glove Art Services */}
            <section className="py-20 bg-white">
                <div className="container px-4 md:px-8">
                    <div className="text-center mb-16">
                        <p className="text-sm font-bold tracking-widest text-primary uppercase mb-2">COMPLETE ART ECOSYSTEM</p>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight">White-Glove Art Services</h2>
                        <p className="text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
                            Beyond selling art, we connect buyers with trusted service providers for a complete experience.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        <div className="bg-gray-50 rounded-2xl p-10 text-center space-y-6">
                            <div className="text-6xl">🔧</div>
                            <h3 className="text-2xl font-bold">Art Installers</h3>
                            <p className="text-gray-600">
                                Professional installation, wall mounting, and gallery wall design by verified local experts.
                            </p>
                            <div>
                                <span className="text-sm text-gray-500">From </span>
                                <span className="text-primary text-xl font-bold">$19/mo</span>
                                <span className="text-sm text-gray-500"> for providers</span>
                            </div>
                            <Button variant="outline" className="w-full">
                                Find Installers
                            </Button>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-10 text-center space-y-6">
                            <div className="text-6xl">🖼️</div>
                            <h3 className="text-2xl font-bold">Custom Framers</h3>
                            <p className="text-gray-600">
                                Mat cutting, glazing, conservation framing, and shadow boxes from skilled craftspeople.
                            </p>
                            <div>
                                <span className="text-sm text-gray-500">From </span>
                                <span className="text-primary text-xl font-bold">$29/mo</span>
                                <span className="text-sm text-gray-500"> for providers</span>
                            </div>
                            <Button variant="outline" className="w-full">
                                Find Framers
                            </Button>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-10 text-center space-y-6">
                            <div className="text-6xl">📦</div>
                            <h3 className="text-2xl font-bold">Art Shippers</h3>
                            <p className="text-gray-600">
                                Specialized art packing, insured shipping, crating for large pieces, and white-glove delivery.
                            </p>
                            <div>
                                <span className="text-sm text-gray-500">From </span>
                                <span className="text-primary text-xl font-bold">$29/mo</span>
                                <span className="text-sm text-gray-500"> for providers</span>
                            </div>
                            <Button variant="outline" className="w-full">
                                Find Shippers
                            </Button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

// Membership Plans Component
function MembershipPlansSection() {
    const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

    const tiers = [
        {
            name: "Free",
            label: "START",
            priceMonthly: 0,
            priceYearly: 0,
            artworks: 10,
            images: 3,
            template: "Standard",
            emailAddress: "X",
            storage: "X",
            blog: "X",
            social: "X",
            learning: "X",
            paidLearning: "YES",
            invitations: "X",
            payment: "STRIPE DIRECT *",
            commission: "0%",
            money: "0%",
            branding: "ART District USA",
            crossSales: "YES"
        },
        {
            name: "Superior",
            label: "VALUE",
            priceMonthly: 9,
            priceYearly: 90,
            artworks: 100,
            images: 8,
            template: "Superior",
            emailAddress: "YES",
            storage: "1GB",
            blog: "X",
            social: "FB, IG",
            learning: "X",
            paidLearning: "YES",
            invitations: "X",
            payment: "STRIPE DIRECT *",
            commission: "0%",
            money: "YES +",
            branding: "No Branding *",
            crossSales: "NO #"
        },
        {
            name: "DeLuxe",
            label: "MOST POPULAR",
            priceMonthly: 19,
            priceYearly: 190,
            artworks: 200,
            images: 12,
            template: "DeLuxe",
            emailAddress: "YES",
            storage: "5GB",
            blog: "YES",
            social: "ALL",
            learning: "YES",
            paidLearning: "YES",
            invitations: "X",
            payment: "STRIPE DIRECT *",
            commission: "0%",
            money: "YES +",
            branding: "No Branding *",
            crossSales: "NO #",
            highlighted: true
        },
        {
            name: "Professional",
            label: "PRO",
            priceMonthly: 29,
            priceYearly: 290,
            artworks: 500,
            images: 15,
            template: "Professional",
            emailAddress: "YES",
            storage: "10GB",
            blog: "YES",
            social: "ALL",
            learning: "YES",
            paidLearning: "YES",
            invitations: "YES",
            payment: "STRIPE DIRECT *",
            commission: "0%",
            money: "YES +",
            branding: "No Branding *",
            crossSales: "NO #"
        },
        {
            name: "TopTier",
            label: "ELITE",
            priceMonthly: 49,
            priceYearly: 490,
            artworks: 1000,
            images: 20,
            template: "TopTier",
            emailAddress: "YES",
            storage: "50GB",
            blog: "YES",
            social: "ALL",
            learning: "YES",
            paidLearning: "YES",
            invitations: "YES",
            payment: "STRIPE DIRECT *",
            commission: "0%",
            money: "YES +",
            branding: "No Hint at All",
            crossSales: "No Hint at All"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white">
            <div className="container px-4 md:px-8">
                <div className="text-center mb-12">
                    <p className="text-sm font-bold tracking-widest text-primary uppercase mb-2">MEMBERSHIP PLANS</p>
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Plans for Everyone in the Art World</h2>
                    <p className="text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
                        Whether you're an artist, gallery, or business—we have a plan for you. 0% commission on all sales.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center gap-4 mb-8">
                    <Button className="bg-primary hover:bg-primary/90 rounded-full px-6">
                        🎨 Artists
                    </Button>
                    <Button variant="ghost" className="text-gray-400 hover:text-white rounded-full px-6">
                        🔧 Service Providers
                    </Button>
                    <Button variant="ghost" className="text-gray-400 hover:text-white rounded-full px-6">
                        💼 Business
                    </Button>
                </div>

                {/* Monthly/Yearly Toggle */}
                <div className="flex justify-center items-center gap-4 mb-8">
                    <button
                        onClick={() => setBillingPeriod('monthly')}
                        className={`px-6 py-2 rounded-full font-semibold transition ${billingPeriod === 'monthly' ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                    >
                        Monthly
                    </button>
                    <button
                        onClick={() => setBillingPeriod('yearly')}
                        className={`px-6 py-2 rounded-full font-semibold transition ${billingPeriod === 'yearly' ? 'bg-primary text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                    >
                        Yearly <span className="text-xs">(Save 17%)</span>
                    </button>
                </div>

                <p className="text-center text-gray-300 mb-12">
                    🎨 Artists are the heart of ARTDistrictUSA. Choose the plan that fits your creative journey.
                </p>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
                    {tiers.map((tier, idx) => {
                        const price = billingPeriod === 'monthly' ? tier.priceMonthly : tier.priceYearly;
                        const priceDisplay = billingPeriod === 'monthly' ? `$${tier.priceMonthly}` : `$${tier.priceYearly}`;
                        const period = billingPeriod === 'monthly' ? '/month' : '/year';

                        return (
                            <div
                                key={idx}
                                className={`rounded-xl p-6 ${tier.highlighted
                                    ? 'bg-white text-gray-900 border-4 border-primary relative transform scale-105 shadow-2xl'
                                    : tier.name === 'TopTier'
                                        ? 'bg-gray-800 border-2 border-primary'
                                        : 'bg-gray-800 border border-gray-700'
                                    }`}
                            >
                                {tier.highlighted && (
                                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold">
                                        {tier.label}
                                    </div>
                                )}

                                <div className="mb-4">
                                    <div className={`text-sm font-semibold uppercase ${tier.highlighted ? 'text-gray-600' : tier.name === 'TopTier' ? 'text-primary' : 'text-gray-400'
                                        }`}>
                                        {!tier.highlighted && tier.label}
                                    </div>
                                    <div className="text-3xl font-bold mt-2">{tier.name}</div>
                                </div>

                                <div className="mb-6">
                                    <span className="text-5xl font-bold">{priceDisplay}</span>
                                    <span className={tier.highlighted ? 'text-gray-600' : 'text-gray-400'}>{period}</span>
                                </div>

                                <ul className="space-y-2 text-sm mb-6">
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 ${tier.highlighted ? 'text-primary' : 'text-primary'}`} />
                                        <span><strong>{tier.artworks}</strong> artworks</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 ${tier.highlighted ? 'text-primary' : 'text-primary'}`} />
                                        <span><strong>{tier.images}</strong> images/artwork</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 ${tier.highlighted ? 'text-primary' : 'text-primary'}`} />
                                        <span>{tier.template} template</span>
                                    </li>
                                    {tier.emailAddress !== "X" && (
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 ${tier.highlighted ? 'text-primary' : 'text-primary'}`} />
                                            <span>Artist email address</span>
                                        </li>
                                    )}
                                    {tier.storage !== "X" && (
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 ${tier.highlighted ? 'text-primary' : 'text-primary'}`} />
                                            <span>{tier.storage} storage</span>
                                        </li>
                                    )}
                                    {tier.blog !== "X" && (
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 ${tier.highlighted ? 'text-primary' : 'text-primary'}`} />
                                            <span>Artist blog</span>
                                        </li>
                                    )}
                                    {tier.social !== "X" && (
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 ${tier.highlighted ? 'text-primary' : 'text-primary'}`} />
                                            <span>Social: {tier.social}</span>
                                        </li>
                                    )}
                                    {tier.learning !== "X" && (
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 ${tier.highlighted ? 'text-primary' : 'text-primary'}`} />
                                            <span>Free learning tools</span>
                                        </li>
                                    )}
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 ${tier.highlighted ? 'text-primary' : 'text-primary'}`} />
                                        <span>Paid learning tools</span>
                                    </li>
                                    {tier.invitations !== "X" && (
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 ${tier.highlighted ? 'text-primary' : 'text-primary'}`} />
                                            <span>Invitation tool for events</span>
                                        </li>
                                    )}
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 ${tier.highlighted ? 'text-primary' : 'text-primary'}`} />
                                        <span className="font-bold text-primary">0% Commission</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 ${tier.highlighted ? 'text-primary' : 'text-primary'}`} />
                                        <span className="text-xs">{tier.payment}</span>
                                    </li>
                                    {tier.money !== "0%" && (
                                        <li className="flex items-start gap-2">
                                            <CheckCircle2 className={`h-4 w-4 mt-0.5 flex-shrink-0 ${tier.highlighted ? 'text-primary' : 'text-primary'}`} />
                                            <span className="text-xs">Direct to artist 15-18 days</span>
                                        </li>
                                    )}
                                </ul>

                                <Button
                                    className={`w-full ${tier.highlighted
                                        ? 'bg-primary hover:bg-primary/90'
                                        : tier.name === 'TopTier'
                                            ? 'border-primary text-primary hover:bg-primary/10'
                                            : 'border-gray-600 hover:bg-gray-700'
                                        }`}
                                    variant={tier.highlighted ? 'default' : 'outline'}
                                >
                                    {tier.priceMonthly === 0 ? 'Get Started' : 'Start Free Trial'}
                                </Button>
                            </div>
                        );
                    })}
                </div>

                <div className="text-center mt-12 space-y-2">
                    <p className="text-gray-400">All plans include Stripe Direct payments • 0% commission • No hidden fees</p>
                    <p className="text-xs text-gray-500">
                        * STRIPE DIRECT = Stripe transaction fees 2.9% + $0.30 apply | + Customers pay to Stripe directly 15-18 days after confirmed arrival
                    </p>
                    <p className="text-xs text-gray-500">
                        * No Branding = Just website name and Featured by Button | # Only if Customers get to Site from the Homepage
                    </p>
                </div>
            </div>
        </section>
    );
}
