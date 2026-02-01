import Link from 'next/link';
import Image from 'next/image';
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

                <p className="text-center text-gray-300 mb-12">
                    🎨 Artists are the heart of ARTDistrictUSA. Choose the plan that fits your creative journey.
                </p>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
                    {/* Starter - Free */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <div className="mb-4">
                            <div className="text-sm font-semibold text-gray-400 uppercase">FREE</div>
                            <div className="text-3xl font-bold mt-2">Starter</div>
                        </div>
                        <div className="mb-6">
                            <span className="text-5xl font-bold">$0</span>
                            <span className="text-gray-400">/month</span>
                        </div>
                        <div className="text-sm text-gray-400 mb-6">Just getting started</div>
                        <ul className="space-y-3 text-sm mb-6">
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>10 artwork listings</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>3 images per artwork</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Standard template</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>10% platform commission</span>
                            </li>
                        </ul>
                        <Button variant="outline" className="w-full border-gray-600 hover:bg-gray-700">
                            Get Started
                        </Button>
                    </div>

                    {/* Superior - $9 */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <div className="mb-4">
                            <div className="text-sm font-semibold text-gray-400 uppercase">VALUE</div>
                            <div className="text-3xl font-bold mt-2">Superior</div>
                        </div>
                        <div className="mb-6">
                            <span className="text-5xl font-bold">$9</span>
                            <span className="text-gray-400">/month</span>
                        </div>
                        <div className="text-sm text-gray-400 mb-6">Serious about selling</div>
                        <ul className="space-y-3 text-sm mb-6">
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>100 artwork listings</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>8 images per artwork</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Superior template</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>0% platform commission</span>
                            </li>
                        </ul>
                        <Button variant="outline" className="w-full border-gray-600 hover:bg-gray-700">
                            Start Free Trial
                        </Button>
                    </div>

                    {/* DeLuxe - $19 MOST POPULAR */}
                    <div className="bg-white text-gray-900 rounded-xl p-6 border-4 border-primary relative transform scale-105 shadow-2xl">
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-xs font-bold">
                            MOST POPULAR
                        </div>
                        <div className="mb-4">
                            <div className="text-sm font-semibold text-gray-600 uppercase">DeLuxe</div>
                        </div>
                        <div className="mb-6">
                            <span className="text-5xl font-bold">$19</span>
                            <span className="text-gray-600">/month</span>
                        </div>
                        <div className="text-sm text-gray-600 mb-6">Growing your career</div>
                        <ul className="space-y-3 text-sm mb-6">
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>200 artwork listings</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>12 images per artwork</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>DeLuxe template</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>0% platform commission</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Artist Blog included</span>
                            </li>
                        </ul>
                        <Button className="w-full bg-primary hover:bg-primary/90">
                            Start Free Trial
                        </Button>
                    </div>

                    {/* Professional - $29 */}
                    <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                        <div className="mb-4">
                            <div className="text-sm font-semibold text-gray-400 uppercase">PRO</div>
                            <div className="text-3xl font-bold mt-2">Professional</div>
                        </div>
                        <div className="mb-6">
                            <span className="text-5xl font-bold">$29</span>
                            <span className="text-gray-400">/month</span>
                        </div>
                        <div className="text-sm text-gray-400 mb-6">Full-time artists</div>
                        <ul className="space-y-3 text-sm mb-6">
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>500 artwork listings</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>15 images per artwork</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Professional template</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>0% platform commission</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Priority support</span>
                            </li>
                        </ul>
                        <Button variant="outline" className="w-full border-gray-600 hover:bg-gray-700">
                            Get Started
                        </Button>
                    </div>

                    {/* TopTier - $49 */}
                    <div className="bg-gray-800 rounded-xl p-6 border-2 border-primary">
                        <div className="mb-4">
                            <div className="text-sm font-semibold text-primary uppercase">ELITE</div>
                            <div className="text-3xl font-bold mt-2">TopTier</div>
                        </div>
                        <div className="mb-6">
                            <span className="text-5xl font-bold">$49</span>
                            <span className="text-gray-400">/month</span>
                        </div>
                        <div className="text-sm text-gray-400 mb-6">Maximum visibility</div>
                        <ul className="space-y-3 text-sm mb-6">
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>1000 artwork listings</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>20 images per artwork</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>TopTier template</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>0% platform commission</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                                <span>Homepage featured</span>
                            </li>
                        </ul>
                        <Button variant="outline" className="w-full border-primary text-primary hover:bg-primary/10">
                            Get Started
                        </Button>
                    </div>
                </div>

                <div className="text-center mt-12 text-gray-400">
                    <p>All plans include Stripe Direct payments • 0% commission • No hidden fees</p>
                </div>
            </div>
        </section>
    );
}
