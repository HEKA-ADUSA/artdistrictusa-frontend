'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default function OnboardingSuccessPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const artistName = searchParams.get('name') || 'Artist';
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        // Countdown timer
        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    router.push('/artist/upload');
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [router]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
            <div className="max-w-2xl w-full bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
                {/* Success Icon */}
                <div className="mb-6">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full">
                        <span className="text-6xl">🎉</span>
                    </div>
                </div>

                {/* Success Message */}
                <h1 className="text-4xl font-bold text-gray-900 mb-4">
                    Welcome to ARTDistrictUSA, {artistName}!
                </h1>

                <p className="text-xl text-gray-600 mb-6">
                    Your artist profile has been successfully submitted!
                </p>

                {/* Info Card */}
                <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6 mb-8 text-left">
                    <h2 className="text-lg font-bold text-blue-900 mb-3 flex items-center gap-2">
                        <span>📧</span> What Happens Next?
                    </h2>
                    <ul className="space-y-2 text-blue-800">
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span>We've received your information and sent you a confirmation email</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span>Our team will review your profile within 24-48 hours</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span>You'll receive an email at the address you provided once approved</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span>In the meantime, you can start uploading your artwork!</span>
                        </li>
                    </ul>
                </div>

                {/* Contact Info */}
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-8">
                    <p className="text-sm text-gray-600">
                        <strong>Questions?</strong> Contact us at{' '}
                        <a href="mailto:hk@ARTDistrictUSA.com" className="text-red-600 hover:underline font-semibold">
                            hk@ARTDistrictUSA.com
                        </a>
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                    <Button
                        onClick={() => router.push('/artist/upload')}
                        className="w-full bg-red-600 hover:bg-red-700 text-white h-14 text-lg font-semibold"
                    >
                        Start Uploading Artwork →
                    </Button>

                    <Button
                        onClick={() => router.push('/')}
                        variant="outline"
                        className="w-full h-12 text-gray-700 border-gray-300"
                    >
                        Return to Homepage
                    </Button>
                </div>

                {/* Auto-redirect notice */}
                <p className="text-sm text-gray-500 mt-6">
                    Automatically redirecting to upload page in <strong>{countdown}</strong> seconds...
                </p>
            </div>
        </div>
    );
}
