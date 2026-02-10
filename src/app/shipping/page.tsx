import Link from 'next/link';
import { Package, RotateCcw, Clock, Shield } from 'lucide-react';

export default function ShippingPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-5xl font-bold mb-4">Shipping & Returns</h1>
            <p className="text-xl text-gray-600 mb-12">
                Safe, secure delivery of your artwork with hassle-free returns
            </p>

            {/* Shipping Policy */}
            <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <Package className="h-8 w-8 text-primary" />
                    <h2 className="text-3xl font-bold">Shipping Policy</h2>
                </div>

                <div className="space-y-6 text-gray-700">
                    <div>
                        <h3 className="text-xl font-semibold mb-2">Delivery Times</h3>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li><strong>Domestic (USA):</strong> 5-10 business days</li>
                            <li><strong>International:</strong> 10-21 business days depending on destination</li>
                            <li><strong>Express Shipping:</strong> Available at checkout for 2-3 business day delivery</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">Shipping Costs</h3>
                        <p>Shipping costs are calculated based on artwork size, weight, and destination. You'll see the exact cost before completing your purchase.</p>
                        <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                            <li>Free shipping on orders over $500 (domestic)</li>
                            <li>International shipping rates vary by country and carrier</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">Packaging Standards</h3>
                        <p>All artists must adhere to our professional packaging standards:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                            <li>Protective corner guards for framed pieces</li>
                            <li>Rigid backing board to prevent bending</li>
                            <li>Moisture-resistant wrapping</li>
                            <li>Double-wall corrugated boxes</li>
                            <li>Clear "FRAGILE" and "THIS SIDE UP" labeling</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">Tracking & Insurance</h3>
                        <p>Every shipment includes:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                            <li>Full tracking information sent to your email</li>
                            <li>Insurance coverage up to purchase price</li>
                            <li>Signature confirmation for orders over $500</li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* Returns Policy */}
            <section className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                    <RotateCcw className="h-8 w-8 text-primary" />
                    <h2 className="text-3xl font-bold">Returns & Refunds</h2>
                </div>

                <div className="space-y-6 text-gray-700">
                    <div className="bg-blue-50 border-l-4 border-primary p-6 rounded">
                        <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                            <Shield className="h-5 w-5" />
                            14-Day Satisfaction Guarantee
                        </h3>
                        <p>We want you to love your artwork. If you're not completely satisfied, return it within 14 days of delivery for a full refund.</p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">Return Eligibility</h3>
                        <p>To be eligible for a return:</p>
                        <ul className="list-disc list-inside space-y-2 ml-4 mt-2">
                            <li>Artwork must be in original condition (undamaged, unaltered)</li>
                            <li>Original packaging must be used for return shipping</li>
                            <li>Return must be initiated within 14 days of delivery</li>
                            <li>Custom or commissioned pieces are non-returnable unless damaged</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">How to Initiate a Return</h3>
                        <ol className="list-decimal list-inside space-y-2 ml-4">
                            <li>Contact us at <a href="mailto:returns@artdistrictusa.com" className="text-primary hover:underline">returns@artdistrictusa.com</a></li>
                            <li>Provide your order number and reason for return</li>
                            <li>Receive return authorization and prepaid shipping label</li>
                            <li>Pack artwork securely in original packaging</li>
                            <li>Ship within 3 business days of receiving authorization</li>
                        </ol>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">Refund Process</h3>
                        <ul className="list-disc list-inside space-y-2 ml-4">
                            <li>Refunds are processed within 5-7 business days of receiving the returned item</li>
                            <li>You'll receive a full refund of the artwork price</li>
                            <li>Original shipping costs are non-refundable</li>
                            <li>Refunds are issued to the original payment method</li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold mb-2">Damaged or Defective Items</h3>
                        <p>If your artwork arrives damaged:</p>
                        <ol className="list-decimal list-inside space-y-2 ml-4 mt-2">
                            <li>Do not discard packaging</li>
                            <li>Take photos of damage and packaging</li>
                            <li>Contact us immediately at <a href="mailto:support@artdistrictusa.com" className="text-primary hover:underline">support@artdistrictusa.com</a></li>
                            <li>We'll arrange replacement or full refund at no cost to you</li>
                        </ol>
                    </div>
                </div>
            </section>

            {/* Contact */}
            <section className="bg-gray-50 rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">Questions About Shipping or Returns?</h2>
                <p className="text-gray-600 mb-6">
                    Our support team is available 24/7 to assist you
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
            </section>
        </div>
    );
}
