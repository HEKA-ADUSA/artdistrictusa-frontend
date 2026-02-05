export default function TermsPage() {
    return (
        <div className="container mx-auto px-4 py-12 max-w-4xl">
            <h1 className="text-5xl font-bold mb-4">Terms of Service</h1>
            <p className="text-gray-600 mb-8">Last Updated: February 5, 2026</p>

            <div className="prose prose-lg max-w-none space-y-8">
                <section>
                    <h2 className="text-3xl font-bold mb-4">1. Acceptance of Terms</h2>
                    <p className="text-gray-700">
                        By accessing and using ARTDistrictUSA.com (the "Platform"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our Platform.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-4">2. Platform Overview</h2>
                    <p className="text-gray-700 mb-4">
                        ARTDistrictUSA is a 0% commission marketplace connecting independent artists with art collectors worldwide. We provide the platform; artists maintain ownership and control of their work.
                    </p>
                    <p className="text-gray-700">
                        Our role is limited to:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                        <li>Providing marketplace infrastructure and tools</li>
                        <li>Facilitating secure payment processing via Stripe</li>
                        <li>Offering artist verification services</li>
                        <li>Mediating disputes when necessary</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-4">3. User Accounts</h2>
                    <h3 className="text-xl font-semibold mb-2">3.1 Registration</h3>
                    <p className="text-gray-700 mb-4">
                        You must provide accurate, current information when creating an account. You are responsible for maintaining the security of your account credentials.
                    </p>

                    <h3 className="text-xl font-semibold mb-2">3.2 Artist Verification</h3>
                    <p className="text-gray-700 mb-4">
                        Artists may optionally submit proof of identity and address for verification. Verified status helps build buyer trust but is not required to sell.
                    </p>

                    <h3 className="text-xl font-semibold mb-2">3.3 Account Termination</h3>
                    <p className="text-gray-700">
                        We reserve the right to suspend or terminate accounts that violate these terms, engage in fraudulent activity, or harm other users.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-4">4. Artist Obligations</h2>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                        <li>You must own or have rights to sell all artwork you list</li>
                        <li>Artwork descriptions must be accurate and not misleading</li>
                        <li>You must fulfill orders within stated timeframes</li>
                        <li>Artwork must be packaged according to our standards</li>
                        <li>You are responsible for shipping costs and arrangements</li>
                        <li>You must honor our 14-day return policy</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-4">5. Buyer Obligations</h2>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                        <li>Provide accurate shipping and payment information</li>
                        <li>Promptly notify us of damaged or incorrect deliveries</li>
                        <li>Return artwork in original condition if exercising return policy</li>
                        <li>Respresent fair use of platform resources</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-4">6. Pricing & Payments</h2>
                    <h3 className="text-xl font-semibold mb-2">6.1 Artist Fees</h3>
                    <p className="text-gray-700 mb-4">
                        ARTDistrictUSA operates on a subscription model with tiered monthly or annual plans. We charge  <strong>0% commission</strong> onall sales. Artists keep 100% of their sale price.
                    </p>

                    <h3 className="text-xl font-semibold mb-2">6.2 Payment Processing</h3>
                    <p className="text-gray-700 mb-4">
                        All transactions are processed through Stripe. Stripe transaction fees (~2.9% + $0.30) apply. Payments are released to artists 15-18 days after buyer confirms delivery.
                    </p>

                    <h3 className="text-xl font-semibold mb-2">6.3 Refunds</h3>
                    <p className="text-gray-700">
                        Valid returns result in full refunds to buyers. Artists are responsible for refunding the artwork price; platform does not refund original shipping costs.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-4">7. Intellectual Property</h2>
                    <p className="text-gray-700 mb-4">
                        Artists retain all intellectual property rights to their artwork. By listing on our platform, you grant us a non-exclusive license to display and promote your work.
                    </p>
                    <p className="text-gray-700">
                        You agree not to infringe on others' copyrights, trademarks, or intellectual property rights.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-4">8. Prohibited Activities</h2>
                    <p className="text-gray-700 mb-2">You may not:</p>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                        <li>Post artwork you don't have rights to sell</li>
                        <li>Manipulate or interfere with platform functionality</li>
                        <li>Engage in fraudulent transactions</li>
                        <li>Harass or abuse other users</li>
                        <li>Use the platform for illegal purposes</li>
                        <li>Circumvent payment processing to avoid fees</li>
                    </ul>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-4">9. Dispute Resolution</h2>
                    <p className="text-gray-700 mb-4">
                        In case of disputes between buyers and artists, we encourage direct communication. If unresolved, contact our support team for mediation.
                    </p>
                    <p className="text-gray-700">
                        Any legal disputes shall be governed by the laws of the United States and resolved in courts located in [Jurisdiction].
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-4">10. Limitation of Liability</h2>
                    <p className="text-gray-700 mb-4">
                        ARTDistrictUSA is not responsible for:
                    </p>
                    <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                        <li>Quality, authenticity, or legality of artwork listed by artists</li>
                        <li>Shipping delays or damage during transit</li>
                        <li>Disputes between buyers and artists</li>
                        <li>Loss of data or service interruptions</li>
                    </ul>
                    <p className="text-gray-700 mt-4">
                        Our maximum liability is limited to the fees you paid to us in the past 12 months.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-4">11. Changes to Terms</h2>
                    <p className="text-gray-700">
                        We reserve the right to modify these terms at any time. We'll notify users of significant changes via email. Continued use of the platform constitutes acceptance of updated terms.
                    </p>
                </section>

                <section>
                    <h2 className="text-3xl font-bold mb-4">12. Contact</h2>
                    <p className="text-gray-700">
                        For questions about these Terms of Service, contact us at:
                    </p>
                    <p className="text-gray-700 mt-2">
                        <strong>Email:</strong> <a href="mailto:legal@artdistrictusa.com" className="text-primary hover:underline">legal@artdistrictusa.com</a><br />
                        <strong>Phone:</strong> <a href="tel:+18888888888" className="text-primary hover:underline">888-888-8888</a>
                    </p>
                </section>
            </div>
        </div>
    );
}
