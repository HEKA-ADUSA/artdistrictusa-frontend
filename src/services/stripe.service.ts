import api from '../lib/api';

export interface StripeConnectStatus {
    hasAccount: boolean;
    detailsSubmitted: boolean;
    chargesEnabled: boolean;
    payoutsEnabled: boolean;
}

class StripeService {
    /**
     * Get Stripe Connect onboarding link
     */
    async getOnboardingLink(): Promise<{ url: string }> {
        const response = await api.post('/stripe/connect/onboard');
        return response.data;
    }

    /**
     * Get Stripe Connect account status
     */
    async getConnectStatus(): Promise<StripeConnectStatus> {
        const response = await api.get('/stripe/connect/status');
        return response.data;
    }

    /**
     * Get payout history
     */
    async getPayoutHistory(): Promise<any[]> {
        const response = await api.get('/stripe/payouts');
        return response.data.payouts;
    }
}

export default new StripeService();
