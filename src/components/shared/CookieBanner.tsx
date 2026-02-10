'use client';

import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';

type CookiePreference = 'accepted' | 'rejected' | 'managed';

interface CookieSettings {
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
}

export default function CookieBanner() {
    const [isVisible, setIsVisible] = useState(false);
    const [showManage, setShowManage] = useState(false);
    const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
        necessary: true, // Always required
        analytics: false,
        marketing: false,
    });

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
        localStorage.setItem('cookie-settings', JSON.stringify({
            necessary: true,
            analytics: true,
            marketing: true,
        }));
        setIsVisible(false);
    };

    const rejectAll = () => {
        localStorage.setItem('cookie-consent', 'rejected');
        localStorage.setItem('cookie-settings', JSON.stringify({
            necessary: true,
            analytics: false,
            marketing: false,
        }));
        setIsVisible(false);
    };

    const savePreferences = () => {
        localStorage.setItem('cookie-consent', 'managed');
        localStorage.setItem('cookie-settings', JSON.stringify(cookieSettings));
        setShowManage(false);
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <>
            {/* Compact One-Line Banner */}
            <div className="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-4xl z-50 animate-in slide-in-from-bottom-5">
                <div className="bg-white border-2 border-gray-200 rounded-lg shadow-2xl p-3 md:p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4">
                        {/* Cookie Icon + Text */}
                        <div className="flex items-center gap-2 flex-1 text-sm">
                            <span className="text-2xl">🍪</span>
                            <p className="text-gray-700">
                                We use cookies to enhance your experience.{' '}
                                <a
                                    href="/privacy"
                                    className="text-primary hover:underline font-semibold"
                                    target="_blank"
                                >
                                    Privacy Policy
                                </a>
                            </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 flex-wrap md:flex-nowrap">
                            <Button
                                onClick={acceptAll}
                                className="bg-primary hover:bg-primary/90 text-white h-9 px-4 text-sm"
                            >
                                Accept All
                            </Button>
                            <Button
                                onClick={() => setShowManage(true)}
                                variant="outline"
                                className="h-9 px-4 text-sm border-gray-300"
                            >
                                Manage
                            </Button>
                            <Button
                                onClick={rejectAll}
                                variant="outline"
                                className="h-9 px-4 text-sm border-gray-300 text-gray-600"
                            >
                                Reject All
                            </Button>

                            {/* Close X Button */}
                            <button
                                onClick={rejectAll}
                                className="h-9 w-9 flex items-center justify-center rounded-md hover:bg-gray-100 transition-colors"
                                aria-label="Close (Reject All)"
                            >
                                <X className="h-4 w-4 text-gray-500" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Manage Cookies Dialog */}
            <Dialog open={showManage} onOpenChange={setShowManage}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle>Manage Cookie Preferences</DialogTitle>
                        <DialogDescription>
                            Choose which cookies you want to allow. Necessary cookies are always enabled.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="space-y-4 py-4">
                        {/* Necessary Cookies */}
                        <div className="flex items-start gap-3">
                            <Checkbox
                                id="necessary"
                                checked={true}
                                disabled
                                className="mt-1"
                            />
                            <div className="flex-1">
                                <label
                                    htmlFor="necessary"
                                    className="text-sm font-semibold text-gray-900 cursor-not-allowed"
                                >
                                    Necessary Cookies
                                </label>
                                <p className="text-xs text-gray-600 mt-1">
                                    Required for the website to function properly. Cannot be disabled.
                                </p>
                            </div>
                        </div>

                        {/* Analytics Cookies */}
                        <div className="flex items-start gap-3">
                            <Checkbox
                                id="analytics"
                                checked={cookieSettings.analytics}
                                onCheckedChange={(checked) =>
                                    setCookieSettings({ ...cookieSettings, analytics: checked as boolean })
                                }
                                className="mt-1"
                            />
                            <div className="flex-1">
                                <label
                                    htmlFor="analytics"
                                    className="text-sm font-semibold text-gray-900 cursor-pointer"
                                >
                                    Analytics Cookies
                                </label>
                                <p className="text-xs text-gray-600 mt-1">
                                    Help us understand how you use our site to improve your experience.
                                </p>
                            </div>
                        </div>

                        {/* Marketing Cookies */}
                        <div className="flex items-start gap-3">
                            <Checkbox
                                id="marketing"
                                checked={cookieSettings.marketing}
                                onCheckedChange={(checked) =>
                                    setCookieSettings({ ...cookieSettings, marketing: checked as boolean })
                                }
                                className="mt-1"
                            />
                            <div className="flex-1">
                                <label
                                    htmlFor="marketing"
                                    className="text-sm font-semibold text-gray-900 cursor-pointer"
                                >
                                    Marketing Cookies
                                </label>
                                <p className="text-xs text-gray-600 mt-1">
                                    Used to deliver personalized advertisements and track campaign performance.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button
                            variant="outline"
                            onClick={() => setShowManage(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={savePreferences}
                            className="bg-primary hover:bg-primary/90"
                        >
                            Save Preferences
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
