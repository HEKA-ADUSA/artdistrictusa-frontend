import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

export default function FAQPage() {
    const faqs = [
        {
            category: "Buying Art",
            questions: [
                {
                    q: "How do I purchase artwork?",
                    a: "Browse our collection, click on any piece you love, and click 'Buy Now'. You'll be guided through a secure checkout process. We accept all major credit cards and PayPal."
                },
                {
                    q: "Are the artworks original or prints?",
                    a: "Each artwork listing clearly states whether it's an original piece or a limited edition print. Filter by 'Originals' or 'Prints' in our browse section."
                },
                {
                    q: "Can I return artwork if I don't like it?",
                    a: "Yes! We offer a 14-day satisfaction guarantee. If you're not completely happy with your purchase, you can return it for a full refund. See our Shipping & Returns policy for details."
                },
                {
                    q: "Do you offer payment plans?",
                    a: "Yes, we partner with Affirm to offer flexible payment plans on purchases over $500. Select 'Pay with Affirm' at checkout to see your options."
                }
            ]
        },
        {
            category: "For Artists",
            questions: [
                {
                    q: "How much does it cost to sell on ARTDistrictUSA?",
                    a: "We're a 0% commission platform! We never take a percentage of your sales. Choose from our tiered plans starting at $0/month with basic features, or upgrade for premium tools like AI-powered descriptions and marketing support."
                },
                {
                    q: "How do I get paid?",
                    a: "Payments go directly to your Stripe account within 15-18 days after the buyer confirms receipt of the artwork. No middleman, no delays."
                },
                {
                    q: "What makes ARTDistrictUSA different from other platforms?",
                    a: "We believe artists deserve 100% of their sale price. Unlike platforms charging 30-50% commission, we operate on transparent subscription tiers, giving you control and keeping more money in your pocket."
                },
                {
                    q: "How do I get verified?",
                    a: "Submit proof of address and government-issued ID through your artist dashboard. Verified artists receive a trust badge, helping buyers feel confident purchasing from you."
                }
            ]
        },
        {
            category: "Shipping & Delivery",
            questions: [
                {
                    q: "How long does shipping take?",
                    a: "Domestic shipping typically takes 5-10 business days. International shipping varies by destination (10-21 days). You'll receive tracking information once your artwork ships."
                },
                {
                    q: "Who handles shipping?",
                    a: "Artists ship directly to buyers using our recommended packaging standards. We provide detailed shipping guidelines and partnership rates with major carriers."
                },
                {
                    q: "How is artwork packaged?",
                    a: "All artwork must meet our professional packaging standards: protective corners, rigid backing, moisture-resistant wrapping, and clear 'Fragile' labeling."
                },
                {
                    q: "What if my artwork arrives damaged?",
                    a: "Contact us immediately with photos. We'll work with the artist and carrier to resolve the issue, either through repair, replacement, or full refund."
                }
            ]
        },
        {
            category: "Payments & Security",
            questions: [
                {
                    q: "Is my payment information secure?",
                    a: "Absolutely. All transactions are processed through Stripe, a PCI-compliant payment processor trusted by millions. We never store your credit card information."
                },
                {
                    q: "What payment methods do you accept?",
                    a: "We accept Visa, Mastercard, American Express, Discover, PayPal, and Apple Pay. For purchases over $500, financing is available through Affirm."
                },
                {
                    q: "When is my card charged?",
                    a: "Your card is charged immediately upon purchase. Funds are held securely and released to the artist after you confirm safe delivery of your artwork."
                }
            ]
        }
    ];

    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
            <p className="text-xl text-gray-600 mb-12">
                Everything you need to know about buying and selling art on ARTDistrictUSA
            </p>

            <div className="space-y-12">
                {faqs.map((section, idx) => (
                    <div key={idx}>
                        <h2 className="text-3xl font-bold mb-6 text-primary">{section.category}</h2>
                        <div className="space-y-6">
                            {section.questions.map((faq, qIdx) => (
                                <div key={qIdx} className="border-b pb-6">
                                    <h3 className="text-xl font-semibold mb-3">{faq.q}</h3>
                                    <p className="text-gray-700 leading-relaxed">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-16 bg-gray-50 rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
                <p className="text-gray-600 mb-6">
                    Our support team is here to help 24/7
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="mailto:support@artdistrictusa.com" className="text-primary hover:underline font-semibold">
                        support@artdistrictusa.com
                    </a>
                    <span className="hidden sm:inline">|</span>
                    <a href="tel:+18888888888" className="text-primary hover:underline font-semibold">
                        <a href="tel:+17027603006" className="text-primary hover:underline">702-760-3006</a>
                    </a>
                </div>
            </div>
        </div>
    );
}
