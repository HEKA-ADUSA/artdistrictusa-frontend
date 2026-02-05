export default function PrivacyPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
            <p className="text-gray-600 mb-8">Last Updated: February 5, 2026</p>

            <div className="prose prose-lg max-w-none space-y-8">
                <section>
                    <h2 className="text-3xl font-bold mb-4">1. Introduction</h2>
                    <p className="text-gray-700">
                        ARTDistrictUSA ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
                    </p>
                    <p className="text-gray-700 mt-4">
                        By using ARTDistrictUSA.com, you consent to the practices described in this policy.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-4">2. Information We Collect</h2>

                    <h3 className="text-xl font-semibold mb-2">2.1 Information You Provide</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                        <li><strong>Account Information:</strong> Email, password, name, phone number</li>
                        <li><strong>Artist Verification:</strong> Government ID, proof of address (optional)</li>
                        <li><strong>Payment Information:</strong> Processed securely through Stripe (we do not store credit card details)</li>
                        <li><strong>Profile Information:</strong> Artist bio, portfolio, social media links</li>
                        <li><strong>Transaction Data:</strong> Purchase history, shipping addresses, order details</li>
                    </ul>

                    <h3 className="text-xl font-semibold mb-2 mt-6">2.2 Automatically Collected Information</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                        <li><strong>Usage Data:</strong> Pages visited, time spent, clicks, browsing patterns</li>
                        <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
                        <li><strong>Cookies:</strong> Session cookies, analytics cookies, preference cookies</li>
                    </ul>

                    <h3 className="text-xl font-semibold mb-2 mt-6">2.3 Third-Party Information</h3>
                    <p className="text-gray-700">
                        We may receive information from Stripe (payment processing) and Google Analytics (usage analytics).
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-4">3. How We Use Your Information</h2>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                        <li>Process transactions and deliver purchased artwork</li>
                        <li>Verify artist identities and prevent fraud</li>
                        <li>Send order confirmations, shipping updates, and customer support</li>
                        <li>Improve platform functionality and user experience</li>
                        <li>Send marketing emails (opt-out available)</li>
                        <li>Comply with legal obligations</li>
                        <li>Personalize your experience and recommendations</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-4">4. How We Share Your Information</h2>
                    <p className="text-gray-700 mb-4">
                        We do not sell your personal information. We may share your information with:
                    </p>

                    <h3 className="text-xl font-semibold mb-2">4.1 Service Providers</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                        <li><strong>Stripe:</strong> Payment processing</li>
                        <li><strong>Shipping Carriers:</strong> Delivery of artwork</li>
                        <li><strong>Email Services:</strong> Transactional and marketing emails</li>
                        <li><strong>Analytics Services:</strong> Google Analytics for usage insights</li>
                    </ul>

                    <h3 className="text-xl font-semibold mb-2 mt-6">4.2 Artists and Buyers</h3>
                    <p className="text-gray-700">
                        When you make a purchase, your shipping address is shared with the artist to fulfill your order. Artists see buyer names and shipping details but not payment information.
                    </p>

                    <h3 className="text-xl font-semibold mb-2 mt-6">4.3 Legal Requirements</h3>
                    <p className="text-gray-700">
                        We may disclose information if required by law, court order, or to protect our rights and safety.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-4">5. Data Security</h2>
                    <p className="text-gray-700 mb-4">
                        We implement industry-standard security measures to protect your information:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                        <li>SSL/TLS encryption for data transmission</li>
                        <li>Secure password hashing</li>
                        <li>Regular security audits</li>
                        <li>Limited employee access to personal data</li>
                        <li>PCI-compliant payment processing via Stripe</li>
                    </ul>
                    <p className="text-gray-700 mt-4">
                        However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-4">6. Your Privacy Rights</h2>
                    <p className="text-gray-700 mb-4">
                        Depending on your location, you may have the following rights:
                    </p>

                    <h3 className="text-xl font-semibold mb-2">6.1 GDPR Rights (European Union)</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                        <li>Right to access your personal data</li>
                        <li>Right to rectification of inaccurate data</li>
                        <li>Right to erasure ("right to be forgotten")</li>
                        <li>Right to restrict processing</li>
                        <li>Right to data portability</li>
                        <li>Right to object to processing</li>
                    </ul>

                    <h3 className="text-xl font-semibold mb-2 mt-6">6.2 CCPA Rights (California)</h3>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                        <li>Right to know what personal information is collected</li>
                        <li>Right to delete personal information</li>
                        <li>Right to opt-out of sale of personal information (we do not sell data)</li>
                        <li>Right to non-discrimination for exercising privacy rights</li>
                    </ul>

                    <p className="text-gray-700 mt-6">
                        To exercise these rights, contact us at <a href="mailto:privacy@artdistrictusa.com" className="text-primary hover:underline">privacy@artdistrictusa.com</a>
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-4">7. Cookies and Tracking</h2>
                    <p className="text-gray-700 mb-4">
                        We use cookies and similar technologies to enhance your experience:
                    </p>

                    <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                        <li><strong>Essential Cookies:</strong> Required for platform functionality (login, cart)</li>
                        <li><strong>Analytics Cookies:</strong> Help us understand how users interact with our site</li>
                        <li><strong>Preference Cookies:</strong> Remember your settings and preferences</li>
                        <li><strong>Marketing Cookies:</strong> Track ad performance and personalize content</li>
                    </ul>

                    <p className="text-gray-700 mt-4">
                        You can manage cookie preferences in your browser settings. Disabling certain cookies may limit platform functionality.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-4">8. Children's Privacy</h2>
                    <p className="text-gray-700">
                        Our platform is not intended for users under 18. We do not knowingly collect personal information from children. If we become aware of such collection, we will promptly delete the information.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-4">9. International Data Transfers</h2>
                    <p className="text-gray-700">
                        Your information may be transferred to and processed in the United States and other countries. We ensure appropriate safeguards are in place to protect your data in compliance with applicable laws.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-4">10. Data Retention</h2>
                    <p className="text-gray-700">
                        We retain your personal information as long as necessary to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                        <li>Provide our services</li>
                        <li>Comply with legal obligations (tax records, transaction history)</li>
                        <li>Resolve disputes and enforce agreements</li>
                    </ul>
                    <p className="text-gray-700 mt-4">
                        After account deletion, we may retain anonymized data for analytics purposes.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-4">11. Marketing Communications</h2>
                    <p className="text-gray-700">
                        You may receive promotional emails from us. You can opt-out at any time by:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                        <li>Clicking "unsubscribe" in any marketing email</li>
                        <li>Updating preferences in your account settings</li>
                        <li>Contacting us at <a href="mailto:unsubscribe@artdistrictusa.com" className="text-primary hover:underline">unsubscribe@artdistrictusa.com</a></li>
                    </ul>
                    <p className="text-gray-700 mt-4">
                        Note: You will still receive transactional emails (order confirmations, shipping updates, account notifications).
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-4">12. Changes to This Privacy Policy</h2>
                    <p className="text-gray-700">
                        We may update this Privacy Policy periodically. We will notify you of significant changes via email or prominent notice on our website. Your continued use after changes constitutes acceptance of the updated policy.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-4">13. Contact Us</h2>
                    <p className="text-gray-700">
                        For questions about this Privacy Policy or to exercise your privacy rights, contact us:
                    </p>
                    <p className="text-gray-700 mt-4">
                        <strong>Email:</strong> <a href="mailto:privacy@artdistrictusa.com" className="text-primary hover:underline">privacy@artdistrictusa.com</a><br />
                        <strong>Phone:</strong> <a href="tel:+18888888888" className="text-primary hover:underline">888-888-8888</a><br />
                        <strong>Mail:</strong> ARTDistrictUSA Privacy Team, [Address], USA
                    </p>
                </section>
            </div>
        </div>
    );
}
