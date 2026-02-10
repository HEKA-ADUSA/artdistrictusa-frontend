'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Check if user has already set preferences
        const preference = localStorage.getItem('cookie-consent');
        if (!preference) {
            // Show banner after a small delay
            setTimeout(() => setIsVisible(true), 1000);
        }
    }, []);

    const acceptAll = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const declineAll = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-2xl z-50 animate-in slide-in-from-bottom-5">
            <div className="bg-white border border-gray-300 rounded-lg shadow-xl p-4">
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    {/* Text */}
                    <p className="text-sm text-gray-700 flex-1">
                        This website uses cookies to provide you with the best experience. Read our{' '}
                        <a
                            href="/privacy"
                            className="text-primary hover:underline font-semibold"
                        >
                            Cookie Policy
                        </a>
                        {' '}to learn more.
                    </p>

                    {/* Buttons */}
                    <div className="flex items-center gap-3 sm:flex-shrink-0">
                        <Button
                            onClick={declineAll}
                            variant="outline"
                            className="h-10 px-6 border-gray-300 text-gray-700 hover:bg-gray-50"
                        >
                            Decline all
                        </Button>
                        <Button
                            onClick={acceptAll}
                            className="bg-red-600 hover:bg-red-700 text-white h-10 px-6"
                        >
                            Accept all
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
