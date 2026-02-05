"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Camera, CreditCard, ArrowRight, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import authService from '@/services/auth.service';
import stripeService from '@/services/stripe.service';
import aiService from '@/services/ai.service';

const STEPS = [
    { number: 1, label: 'Personal Info', id: 'personal' },
    { number: 2, label: 'Choose Plan', id: 'plan' },
    { number: 3, label: 'Your Art', id: 'art' },
    { number: 4, label: 'Your Story', id: 'story' },
    { number: 5, label: 'Social', id: 'social' },
    { number: 6, label: 'Payments', id: 'payments' },
];

const LANGUAGES = ['English', 'German', 'Spanish', 'French', 'Italian', 'Portuguese', 'Chinese', 'Japanese'];

export default function ArtistOnboardingPage() {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
    const [selectedPlan, setSelectedPlan] = useState('deluxe'); // Default to DeLuxe plan
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [generatingBio, setGeneratingBio] = useState(false);
    const [dataConsent, setDataConsent] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        displayName: '',
        phone: '',
        email: '',
        streetAddress: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
        languages: ['English'],
        billingPeriod: 'monthly' as 'monthly' | 'yearly',
        artStyle: '',
        medium: '',
        bio: '',
        experience: '',
        bioFile: '',
        widthRange: '',
        heightRange: '',
        priceRange: '',
        acceptsCommissions: '',
        website: '',
        instagram: '',
        facebook: '',
        twitter: '',
        tiktok: '',
    });

    // Auto-save form data to localStorage whenever it changes
    const saveProgress = () => {
        if (dataConsent) {
            localStorage.setItem('artist_onboarding_step', currentStep.toString());
            localStorage.setItem('artist_onboarding_data', JSON.stringify(formData));
            localStorage.setItem('artist_onboarding_plan', selectedPlan);
        }
    };

    const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setProfilePhoto(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const toggleLanguage = (lang: string) => {
        setFormData(prev => ({
            ...prev,
            languages: prev.languages.includes(lang)
                ? prev.languages.filter(l => l !== lang)
                : [...prev.languages, lang]
        }));
    };

    const canProgress = () => {
        // Step 1: Require basic info and data consent
        if (currentStep === 1) {
            return formData.firstName && formData.lastName && formData.email && formData.phone && formData.city && formData.country && dataConsent;
        }
        return true;
    };

    const handleNext = () => {
        saveProgress();
        if (currentStep < 6) setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleGenerateBio = async () => {
        if (!formData.experience || !formData.city) {
            setError('Please fill in your artistic experience and location first');
            return;
        }

        setGeneratingBio(true);
        setError(null);

        try {
            const bio = await aiService.generateBio({
                style: formData.experience,
                medium: formData.priceRange || 'Mixed Media',
                location: `${formData.city}, ${formData.state || formData.country}`,
                additionalInfo: formData.experience,
            });
            setFormData({ ...formData, bio });
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to generate bio. Please try again.');
        } finally {
            setGeneratingBio(false);
        }
    };

    const handleStripeConnect = async () => {
        setLoading(true);
        setError(null);

        try {
            const { url } = await stripeService.getOnboardingLink();
            window.open(url, '_blank');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to connect Stripe. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleComplete = async () => {
        setLoading(true);
        setError(null);

        try {
            // Submit all artist data to backend
            await authService.becomeArtist({
                artistName: formData.displayName || `${formData.firstName} ${formData.lastName}`,
                bio: formData.bio,
                website: formData.website,
                instagram: formData.instagram,
                facebook: formData.facebook,
                twitter: formData.twitter,
                city: formData.city,
                state: formData.state,
                country: formData.country,
                languages: formData.languages,
                subscriptionTier: selectedPlan,
            });

            // Redirect to upload page
            router.push('/artist/upload');
        } catch (err: any) {
            setError(err.response?.data?.message || 'Failed to complete onboarding. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container px-4 max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold mb-2">Tell Us Your Story</h1>
                    <p className="text-gray-600">
                        Complete your profile so we can create an AI-powered biography and help collectors discover you.
                    </p>
                </div>

                {/* Progress Indicator */}
                <div className="mb-12">
                    <div className="flex items-center justify-between relative">
                        {/* Progress Line */}
                        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300 -translate-y-1/2 z-0">
                            <div
                                className="h-full bg-primary transition-all duration-300"
                                style={{ width: `${((currentStep - 1) / (STEPS.length - 1)) * 100}%` }}
                            ></div>
                        </div>

                        {/* Step Circles */}
                        {STEPS.map((step) => (
                            <div key={step.number} className="flex flex-col items-center relative z-10">
                                <div
                                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-colors ${step.number < currentStep
                                        ? 'bg-green-500 text-white'
                                        : step.number === currentStep
                                            ? 'bg-primary text-white'
                                            : 'bg-gray-300 text-gray-600'
                                        }`}
                                >
                                    {step.number < currentStep ? <CheckCircle2 className="h-6 w-6" /> : step.number}
                                </div>
                                <span className={`mt-2 text-xs font-medium ${step.number === currentStep ? 'text-primary' : 'text-gray-600'}`}>
                                    {step.label}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Step Content */}
                <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                    {/* Step 1: Personal Info */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b">
                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <Camera className="h-6 w-6 text-blue-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">Personal Information</h2>
                                    <p className="text-gray-600">Let's start with the basics. This info appears on your public artist profile.</p>
                                </div>
                            </div>

                            {/* Profile Photo */}
                            <div className="bg-gray-50 p-6 rounded-lg">
                                <Label className="text-lg font-semibold mb-3 block">Profile Photo</Label>
                                <p className="text-sm text-gray-600 mb-4">A professional headshot helps collectors connect with you</p>
                                <div className="flex items-center gap-6">
                                    <div className="relative">
                                        <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                                            {profilePhoto ? (
                                                <Image src={profilePhoto} alt="Profile" fill className="object-cover" />
                                            ) : (
                                                <Camera className="h-8 w-8 text-gray-400" />
                                            )}
                                        </div>
                                    </div>
                                    <label>
                                        <input type="file" accept="image/*" onChange={handlePhotoUpload} className="hidden" />
                                        <Button type="button" variant="outline" asChild>
                                            <span>Upload Photo</span>
                                        </Button>
                                    </label>
                                </div>
                            </div>

                            {/* Name Fields */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="firstName">First Name *</Label>
                                    <Input
                                        id="firstName"
                                        placeholder="Maria"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="lastName">Last Name *</Label>
                                    <Input
                                        id="lastName"
                                        placeholder="Rodriguez"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div>
                                <Label htmlFor="displayName">Display Name (Artist Name)</Label>
                                <Input
                                    id="displayName"
                                    placeholder="e.g., M. Rodriguez or leave blank for full name"
                                    value={formData.displayName}
                                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <Label htmlFor="email">Email Address *</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="maria@example.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="phone">Phone Number *</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        placeholder="(555) 123-4567"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Location */}
                            <div className="space-y-4">
                                <div>
                                    <Label htmlFor="streetAddress">Street Address</Label>
                                    <Input
                                        id="streetAddress"
                                        placeholder="123 Main St, Apt 4B"
                                        value={formData.streetAddress}
                                        onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                                    />
                                </div>
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <Label htmlFor="city">City *</Label>
                                        <Input
                                            id="city"
                                            placeholder="Los Angeles"
                                            value={formData.city}
                                            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="state">State/Province</Label>
                                        <Input
                                            id="state"
                                            placeholder="California"
                                            value={formData.state}
                                            onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="zipCode">ZIP Code</Label>
                                        <Input
                                            id="zipCode"
                                            placeholder="90001"
                                            value={formData.zipCode}
                                            onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <Label htmlFor="country">Country *</Label>
                                    <Select value={formData.country} onValueChange={(value) => setFormData({ ...formData, country: value })}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="United States">United States</SelectItem>
                                            <SelectItem value="Canada">Canada</SelectItem>
                                            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
                                            <SelectItem value="Germany">Germany</SelectItem>
                                            <SelectItem value="France">France</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Languages */}
                            <div>
                                <Label>Languages You Speak</Label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {LANGUAGES.map((lang) => (
                                        <button
                                            key={lang}
                                            type="button"
                                            onClick={() => toggleLanguage(lang)}
                                            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${formData.languages.includes(lang)
                                                ? 'bg-primary text-white'
                                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                                                }`}
                                        >
                                            {lang}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Data Consent */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={dataConsent}
                                        onChange={(e) => setDataConsent(e.target.checked)}
                                        className="mt-1 h-5 w-5 text-primary rounded cursor-pointer"
                                    />
                                    <div className="text-sm">
                                        <p className="font-semibold text-gray-900 mb-1">Data Saving Consent *</p>
                                        <p className="text-gray-700">
                                            I consent to ARTDistrictUSA saving my profile data to complete my onboarding. Your information will be stored securely and used only to create your artist profile. You can delete your data anytime from your account settings.
                                        </p>
                                    </div>
                                </label>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Choose Plan */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <div className="text-center pb-4 border-b">
                                <h2 className="text-2xl font-bold mb-2">Choose Your Membership Plan</h2>
                                <p className="text-gray-600">Select the plan that fits your creative journey. All plans include 0% commission. You can upgrade or downgrade anytime.</p>
                            </div>

                            {/* Monthly/Yearly Toggle */}
                            <div className="flex justify-center">
                                <div className="inline-flex rounded-lg bg-gray-200 p-1">
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, billingPeriod: 'monthly' })}
                                        className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${(formData.billingPeriod || 'monthly') === 'monthly'
                                            ? 'bg-primary text-white shadow-sm'
                                            : 'text-gray-700 hover:text-gray-900'
                                            }`}
                                    >
                                        Monthly
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData({ ...formData, billingPeriod: 'yearly' })}
                                        className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${formData.billingPeriod === 'yearly'
                                            ? 'bg-primary text-white shadow-sm'
                                            : 'text-gray-700 hover:text-gray-900'
                                            }`}
                                    >
                                        Yearly <span className="text-xs ml-1">(Save 17%)</span>
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                                {/* Starter Plan */}
                                <button
                                    type="button"
                                    onClick={() => setSelectedPlan('starter')}
                                    className={`text-left p-4 rounded-xl border-2 transition-all ${selectedPlan === 'starter'
                                        ? 'border-primary bg-primary/5 shadow-lg'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="text-xs font-semibold text-gray-500 uppercase">START</div>
                                        {selectedPlan === 'starter' && <CheckCircle2 className="h-4 w-4 text-primary" />}
                                    </div>
                                    <div className="text-xl font-bold mb-1">Free</div>
                                    <div className="mb-3">
                                        <span className="text-2xl font-bold">$0</span>
                                        <span className="text-gray-500 text-sm">/month</span>
                                    </div>
                                    <ul className="space-y-1 text-xs text-gray-600">
                                        <li>✓ <strong>0% Commission</strong></li>
                                        <li>✓ 10 artworks</li>
                                        <li>✓ 3 images<span className="text-[10px]">/artwork</span></li>
                                        <li className="flex items-start"><span className="mr-1">✓</span><span>Standard template</span></li>
                                        <li className="flex items-start"><span className="mr-1">✓</span><span>Paid learning tools</span></li>
                                        <li>✓ STRIPE DIRECT</li>
                                    </ul>
                                </button>

                                {/* Superior Plan */}
                                <button
                                    type="button"
                                    onClick={() => setSelectedPlan('superior')}
                                    className={`text-left p-4 rounded-xl border-2 transition-all ${selectedPlan === 'superior'
                                        ? 'border-primary bg-primary/5 shadow-lg'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="text-xs font-semibold text-gray-500 uppercase">VALUE</div>
                                        {selectedPlan === 'superior' && <CheckCircle2 className="h-4 w-4 text-primary" />}
                                    </div>
                                    <div className="text-xl font-bold mb-1">Superior</div>
                                    <div className="mb-3">
                                        <span className="text-2xl font-bold">${(formData.billingPeriod === 'yearly' ? 90 : 9)}</span>
                                        <span className="text-gray-500 text-sm">/{formData.billingPeriod === 'yearly' ? 'year' : 'month'}</span>
                                    </div>
                                    <ul className="space-y-1 text-xs text-gray-600">
                                        <li>✓ <strong>0% Commission</strong></li>
                                        <li>✓ 100 artworks</li>
                                        <li>✓ 8 images<span className="text-[10px]">/artwork</span></li>
                                        <li className="flex items-start"><span className="mr-1">✓</span><span>Superior template</span></li>
                                        <li>✓ Artist email</li>
                                        <li>✓ 1GB storage</li>
                                        <li>✓ Social: FB, IG</li>
                                    </ul>
                                </button>

                                {/* DeLuxe Plan */}
                                <button
                                    type="button"
                                    onClick={() => setSelectedPlan('deluxe')}
                                    className={`text-left p-4 rounded-xl border-2 relative transition-all ${selectedPlan === 'deluxe'
                                        ? 'border-primary bg-primary shadow-lg text-white'
                                        : 'border-primary/50 hover:border-primary'
                                        }`}
                                >
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-yellow-400 text-gray-900 px-2 py-0.5 rounded-full text-xs font-bold">
                                        POPULAR
                                    </div>
                                    <div className="flex items-center justify-between mb-2">
                                        <div className={`text-xs font-semibold uppercase ${selectedPlan === 'deluxe' ? 'text-white/80' : 'text-gray-500'}`}>DELUXE</div>
                                        {selectedPlan === 'deluxe' && <CheckCircle2 className="h-4 w-4" />}
                                    </div>
                                    <div className="text-xl font-bold mb-1">DeLuxe</div>
                                    <div className="mb-3">
                                        <span className="text-2xl font-bold">${(formData.billingPeriod === 'yearly' ? 190 : 19)}</span>
                                        <span className={`text-sm ${selectedPlan === 'deluxe' ? 'text-white/80' : 'text-gray-500'}`}>/{formData.billingPeriod === 'yearly' ? 'year' : 'month'}</span>
                                    </div>
                                    <ul className={`space-y-1 text-xs ${selectedPlan === 'deluxe' ? 'text-white/90' : 'text-gray-600'}`}>
                                        <li>✓ <strong>0% Commission</strong></li>
                                        <li>✓ 200 artworks</li>
                                        <li>✓ 12 images<span className="text-[10px]">/artwork</span></li>
                                        <li className="flex items-start"><span className="mr-1">✓</span><span>DeLuxe template</span></li>
                                        <li>✓ Artist email</li>
                                        <li>✓ 5GB storage</li>
                                        <li>✓ Artist blog</li>
                                        <li>✓ Social: ALL</li>
                                        <li className="flex items-start"><span className="mr-1">✓</span><span>Free learning tools</span></li>
                                    </ul>
                                </button>

                                {/* Professional Plan */}
                                <button
                                    type="button"
                                    onClick={() => setSelectedPlan('professional')}
                                    className={`text-left p-4 rounded-xl border-2 transition-all ${selectedPlan === 'professional'
                                        ? 'border-primary bg-primary/5 shadow-lg'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="text-xs font-semibold text-gray-500 uppercase">PRO</div>
                                        {selectedPlan === 'professional' && <CheckCircle2 className="h-4 w-4 text-primary" />}
                                    </div>
                                    <div className="text-xl font-bold mb-1">Professional</div>
                                    <div className="mb-3">
                                        <span className="text-2xl font-bold">${(formData.billingPeriod === 'yearly' ? 290 : 29)}</span>
                                        <span className="text-gray-500 text-sm">/{formData.billingPeriod === 'yearly' ? 'year' : 'month'}</span>
                                    </div>
                                    <ul className="space-y-1 text-xs text-gray-600">
                                        <li>✓ <strong>0% Commission</strong></li>
                                        <li>✓ 500 artworks</li>
                                        <li>✓ 15 images<span className="text-[10px]">/artwork</span></li>
                                        <li className="flex items-start"><span className="mr-1">✓</span><span>Professional template</span></li>
                                        <li>✓ Artist email</li>
                                        <li>✓ 10GB storage</li>
                                        <li>✓ Artist blog</li>
                                        <li>✓ Social: ALL</li>
                                        <li className="flex items-start"><span className="mr-1">✓</span><span>Event invitations</span></li>
                                    </ul>
                                </button>

                                {/* TopTier Plan */}
                                <button
                                    type="button"
                                    onClick={() => setSelectedPlan('toptier')}
                                    className={`text-left p-4 rounded-xl border-2 transition-all ${selectedPlan === 'toptier'
                                        ? 'border-primary bg-primary/5 shadow-lg'
                                        : 'border-gray-200 hover:border-gray-300'
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="text-xs font-semibold text-primary uppercase">ELITE</div>
                                        {selectedPlan === 'toptier' && <CheckCircle2 className="h-4 w-4 text-primary" />}
                                    </div>
                                    <div className="text-xl font-bold mb-1">TopTier</div>
                                    <div className="mb-3">
                                        <span className="text-2xl font-bold">${(formData.billingPeriod === 'yearly' ? 490 : 49)}</span>
                                        <span className="text-gray-500 text-sm">/{formData.billingPeriod === 'yearly' ? 'year' : 'month'}</span>
                                    </div>
                                    <ul className="space-y-1 text-xs text-gray-600">
                                        <li>✓ <strong>0% Commission</strong></li>
                                        <li>✓ 1000 artworks</li>
                                        <li className="flex items-baseline"><span className="mr-1">✓</span><span>20 <span className="text-[10px]" style={{ whiteSpace: 'nowrap' }}>images/artwork</span></span></li>
                                        <li className="flex items-start"><span className="mr-1">✓</span><span>TopTier template</span></li>
                                        <li>✓ Artist email</li>
                                        <li>✓ 50GB storage</li>
                                        <li>✓ Artist blog</li>
                                        <li>✓ Social: ALL</li>
                                        <li className="flex items-start"><span className="mr-1">✓</span><span>Event invitations</span></li>
                                        <li className="flex items-start"><span className="mr-1">✓</span><span>Homepage featured</span></li>
                                    </ul>
                                </button>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-xs text-blue-800">
                                <strong>All plans include Stripe Direct payments from the customer to Stripe and pay out after security hold of 15-18 days directly to the artist - we take 0% commission from you and don't touch your earnings</strong> • You keep 100% of your sales (but Stripe processing fees may apply: at present ~2.9% + $0.30/transaction)
                            </div>
                        </div>
                    )}

                    {/* Step 3: Your Art */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b">
                                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                                    <span className="text-2xl">🎨</span>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">Your Art</h2>
                                    <p className="text-gray-600">Tell us about your artistic style and work</p>
                                </div>
                            </div>

                            {/* Art Style */}
                            <div>
                                <Label htmlFor="artStyle">Primary Art Style *</Label>
                                <Select
                                    value={formData.artStyle || ''}
                                    onValueChange={(value) => setFormData({ ...formData, artStyle: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your primary style..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="abstract">Abstract</SelectItem>
                                        <SelectItem value="realism">Realism</SelectItem>
                                        <SelectItem value="impressionism">Impressionism</SelectItem>
                                        <SelectItem value="expressionism">Expressionism</SelectItem>
                                        <SelectItem value="surrealism">Surrealism</SelectItem>
                                        <SelectItem value="contemporary">Contemporary</SelectItem>
                                        <SelectItem value="modern">Modern</SelectItem>
                                        <SelectItem value="minimalism">Minimalism</SelectItem>
                                        <SelectItem value="pop-art">Pop Art</SelectItem>
                                        <SelectItem value="street-art">Street Art</SelectItem>
                                        <SelectItem value="figurative">Figurative</SelectItem>
                                        <SelectItem value="landscape">Landscape</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Medium */}
                            <div>
                                <Label htmlFor="medium">Primary Medium *</Label>
                                <Select
                                    value={formData.medium || ''}
                                    onValueChange={(value) => setFormData({ ...formData, medium: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select your primary medium..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="oil">Oil Painting</SelectItem>
                                        <SelectItem value="acrylic">Acrylic Painting</SelectItem>
                                        <SelectItem value="watercolor">Watercolor</SelectItem>
                                        <SelectItem value="mixed-media">Mixed Media</SelectItem>
                                        <SelectItem value="digital">Digital Art</SelectItem>
                                        <SelectItem value="photography">Photography</SelectItem>
                                        <SelectItem value="sculpture">Sculpture</SelectItem>
                                        <SelectItem value="ceramics">Ceramics</SelectItem>
                                        <SelectItem value="printmaking">Printmaking</SelectItem>
                                        <SelectItem value="drawing">Drawing</SelectItem>
                                        <SelectItem value="collage">Collage</SelectItem>
                                        <SelectItem value="textile">Textile Art</SelectItem>
                                        <SelectItem value="installation">Installation</SelectItem>
                                        <SelectItem value="other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Typical Dimensions */}
                            <div>
                                <Label className="mb-2 block">Typical Artwork Dimensions</Label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="widthRange" className="text-sm text-gray-600">Width Range</Label>
                                        <Input
                                            id="widthRange"
                                            placeholder="e.g., 24-48 inches"
                                            value={formData.widthRange}
                                            onChange={(e) => setFormData({ ...formData, widthRange: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="heightRange" className="text-sm text-gray-600">Height Range</Label>
                                        <Input
                                            id="heightRange"
                                            placeholder="e.g., 30-60 inches"
                                            value={formData.heightRange}
                                            onChange={(e) => setFormData({ ...formData, heightRange: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">
                                    This helps collectors find work that fits their space
                                </p>
                            </div>

                            {/* Price Range */}
                            <div>
                                <Label htmlFor="priceRange">Typical Price Range</Label>
                                <Input
                                    id="priceRange"
                                    placeholder="e.g., $500-$5,000"
                                    value={formData.priceRange}
                                    onChange={(e) => setFormData({ ...formData, priceRange: e.target.value })}
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    Give collectors an idea of your pricing
                                </p>
                            </div>

                            {/* Accept Commissions */}
                            <div>
                                <Label htmlFor="acceptsCommissions">Do you accept commissions?</Label>
                                <Select
                                    value={formData.acceptsCommissions}
                                    onValueChange={(value) => setFormData({ ...formData, acceptsCommissions: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="yes">Yes - Open to commissions</SelectItem>
                                        <SelectItem value="maybe">Maybe - Case by case</SelectItem>
                                        <SelectItem value="no">No - Original work only</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    )}

                    {/* Step 4: Your Story */}
                    {currentStep === 4 && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b">
                                <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                                    <span className="text-2xl">✍️</span>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">Your Story</h2>
                                    <p className="text-gray-600">Tell collectors about your artistic journey</p>
                                </div>
                            </div>

                            {/* Artistic Experience */}
                            <div>
                                <Label htmlFor="experience">Artistic Experience & Background</Label>
                                <Input
                                    id="experience"
                                    placeholder="e.g., 15 years painting abstract expressionism, MFA from NYU..."
                                    value={formData.experience}
                                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                                />
                                <p className="text-xs text-gray-500 mt-1">Share your training, style evolution, and what inspires your work</p>
                            </div>

                            {/* Biography Options */}
                            <div>
                                <Label className="mb-3 block">Artist Biography</Label>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    {/* Option 1: Write Your Own */}
                                    <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-primary/50 transition-colors">
                                        <div className="flex items-start gap-3">
                                            <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                                <span className="text-lg">✏️</span>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-sm mb-1">Write Your Own</h3>
                                                <p className="text-xs text-gray-600">Craft your biography from scratch</p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Option 2: Generate with AI */}
                                    <div className="border-2 border-gray-200 rounded-lg p-4 hover:border-primary/50 transition-colors">
                                        <div className="flex items-start gap-3">
                                            <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                                                <span className="text-lg">✨</span>
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-sm mb-1">Generate with AI</h3>
                                                <p className="text-xs text-gray-600 mb-2">Let AI create a professional bio</p>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={handleGenerateBio}
                                                    disabled={generatingBio || !formData.experience}
                                                    className="gap-2 w-full"
                                                >
                                                    {generatingBio ? (
                                                        <>
                                                            <Loader2 className="h-3 w-3 animate-spin" />
                                                            Generating...
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span>✨</span>
                                                            Generate Bio
                                                        </>
                                                    )}
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Biography Textarea */}
                                <Textarea
                                    id="bio"
                                    placeholder="Share your artistic journey, inspirations, and what makes your work unique..."
                                    value={formData.bio}
                                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                                    rows={8}
                                    className="resize-none"
                                />
                                <p className="text-xs text-gray-500 mt-1">
                                    A compelling bio helps collectors connect with you and your work
                                </p>
                            </div>

                            {/* Biography File Upload */}
                            <div>
                                <Label htmlFor="bioFile" className="mb-2 block">Or Upload Biography Document (Optional)</Label>
                                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-primary/50 transition-colors">
                                    <input
                                        type="file"
                                        id="bioFile"
                                        accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0];
                                            if (file) {
                                                // Handle file upload - for now just show the filename
                                                setFormData({ ...formData, bioFile: file.name });
                                            }
                                        }}
                                    />
                                    <label htmlFor="bioFile" className="cursor-pointer">
                                        <div className="flex flex-col items-center gap-2">
                                            <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                                                <span className="text-2xl">📄</span>
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-700">Upload Biography</p>
                                                <p className="text-xs text-gray-500">PDF, Word, or Image (PNG/JPG)</p>
                                            </div>
                                            {formData.bioFile && (
                                                <p className="text-xs text-green-600 font-medium">
                                                    ✓ {formData.bioFile}
                                                </p>
                                            )}
                                        </div>
                                    </label>
                                </div>
                                <p className="text-xs text-gray-500 mt-2">
                                    Upload an existing biography document if you have one prepared
                                </p>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                                    {error}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 5: Social & Web Presence */}
                    {currentStep === 5 && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b">
                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                                    <span className="text-2xl">🌐</span>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">Social & Web Presence</h2>
                                    <p className="text-gray-600">Connect your online presence to build credibility</p>
                                </div>
                            </div>

                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <p className="text-sm text-blue-800">
                                    <strong>💡 Optional but Recommended:</strong> Social links and a website help collectors discover more of your work and build trust in your artist profile.
                                </p>
                            </div>

                            {/* Website */}
                            <div>
                                <Label htmlFor="website">Website (Optional)</Label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🌍</span>
                                    <Input
                                        id="website"
                                        type="url"
                                        placeholder="https://yourartwebsite.com"
                                        value={formData.website}
                                        onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                                        className="pl-10"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Your personal portfolio or artist website</p>
                            </div>

                            {/* Social Media Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Instagram */}
                                <div>
                                    <Label htmlFor="instagram">Instagram (Optional)</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-pink-500 font-semibold">IG</span>
                                        <Input
                                            id="instagram"
                                            placeholder="@yourusername"
                                            value={formData.instagram}
                                            onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                                            className="pl-10"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Your Instagram handle</p>
                                </div>

                                {/* Facebook */}
                                <div>
                                    <Label htmlFor="facebook">Facebook (Optional)</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600 font-semibold">FB</span>
                                        <Input
                                            id="facebook"
                                            placeholder="yourpage or profile URL"
                                            value={formData.facebook}
                                            onChange={(e) => setFormData({ ...formData, facebook: e.target.value })}
                                            className="pl-10"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Your Facebook page or profile</p>
                                </div>

                                {/* Twitter */}
                                <div>
                                    <Label htmlFor="twitter">Twitter / X (Optional)</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 font-semibold">𝕏</span>
                                        <Input
                                            id="twitter"
                                            placeholder="@yourusername"
                                            value={formData.twitter}
                                            onChange={(e) => setFormData({ ...formData, twitter: e.target.value })}
                                            className="pl-10"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Your Twitter/X handle</p>
                                </div>

                                {/* TikTok */}
                                <div>
                                    <Label htmlFor="tiktok">TikTok (Optional)</Label>
                                    <div className="relative">
                                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-900 font-bold text-xs">TT</span>
                                        <Input
                                            id="tiktok"
                                            placeholder="@yourusername"
                                            value={formData.tiktok}
                                            onChange={(e) => setFormData({ ...formData, tiktok: e.target.value })}
                                            className="pl-10"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 mt-1">Your TikTok handle</p>
                                </div>
                            </div>

                            {/* Info Banner */}
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <h3 className="font-semibold text-sm mb-2">📱 Why Add Social Links?</h3>
                                <ul className="text-xs text-gray-600 space-y-1">
                                    <li>• Helps collectors see your artistic journey and process</li>
                                    <li>• Builds trust and authenticity for your artist profile</li>
                                    <li>• Increases your visibility in our artist community</li>
                                    <li>• You can always update these later in your account settings</li>
                                </ul>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                                    {error}
                                </div>
                            )}
                        </div>
                    )}

                    {/* Step 6: Payment Setup */}
                    {currentStep === 6 && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-3 pb-4 border-b">
                                <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                                    <CreditCard className="h-6 w-6 text-purple-600" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold">Payment Setup</h2>
                                    <p className="text-gray-600">Connect your Stripe account to receive payments directly from collectors.</p>
                                </div>
                            </div>

                            {/* Stripe Connect Card */}
                            <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-xl p-8 text-white">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="text-4xl">💳</span>
                                    <h3 className="text-2xl font-bold">Stripe Connect</h3>
                                </div>
                                <p className="mb-6 text-indigo-100">
                                    We use Stripe Connect so you get paid directly—we never touch your money. After a buyer confirms receipt (7-30 days), funds go straight to your bank account.
                                </p>
                                <Button
                                    variant="secondary"
                                    size="lg"
                                    className="bg-white text-indigo-600 hover:bg-gray-100"
                                    onClick={handleStripeConnect}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                            Connecting...
                                        </>
                                    ) : (
                                        'Connect with Stripe →'
                                    )}
                                </Button>
                            </div>

                            {/* Additional Payment Info */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg text-center">
                                    <div className="text-3xl mb-2">🔒</div>
                                    <div className="font-semibold mb-1">Secure SSL</div>
                                    <div className="text-xs text-gray-600">Bank-level security</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg text-center">
                                    <div className="text-3xl mb-2">⚡</div>
                                    <div className="font-semibold mb-1">Fast Payouts</div>
                                    <div className="text-xs text-gray-600">7-30 day hold period</div>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg text-center">
                                    <div className="text-3xl mb-2">🎯</div>
                                    <div className="font-semibold mb-1">0% Platform Fee</div>
                                    <div className="text-xs text-gray-600">Keep 100% of your sales</div>
                                </div>
                            </div>

                            {error && (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-700 text-sm">
                                    {error}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        className="h-12 px-8"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back
                    </Button>

                    {currentStep < 6 ? (
                        <Button
                            onClick={handleNext}
                            disabled={!canProgress()}
                            className="h-12 px-8"
                        >
                            Continue
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    ) : (
                        <Button onClick={handleComplete} className="h-12 px-8 bg-green-600 hover:bg-green-700">
                            Complete Profile
                            <CheckCircle2 className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </div>

                {/* Helper Text */}
                <div className="mt-8 text-center text-sm text-gray-600">
                    <p>Already have an account? <Link href="/login/artist" className="text-primary font-semibold hover:underline">Sign in here</Link></p>
                </div>
            </div>
        </div>
    );
}
