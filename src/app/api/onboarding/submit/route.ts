import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
    try {
        const data = await request.json();

        // Format the data into a nice email
        const emailBody = `
==============================================
NEW ARTIST ONBOARDING SUBMISSION
==============================================

PERSONAL INFORMATION
--------------------
Name: ${data.firstName} ${data.lastName}
Artist Name: ${data.displayName || `${data.firstName} ${data.lastName}`}
Email: ${data.email}
Phone: ${data.phone}
Address: ${data.streetAddress}
City: ${data.city}, ${data.state} ${data.zipCode}

MEMBERSHIP PLAN
---------------
Selected Plan: ${data.selectedPlan?.toUpperCase()}
Billing Period: ${data.billingPeriod || 'Not specified'}

TAX VERIFICATION
----------------
Verified: ${data.verified ? 'YES ✓' : 'NO'}
SSN/EIN: ${data.ssn ? '***-**-' + data.ssn.slice(-4) : 'Not provided'}

SOCIAL & WEB PRESENCE
---------------------
Website: ${data.website || 'Not provided'}
Instagram: ${data.instagram || 'Not provided'}
Facebook: ${data.facebook || 'Not provided'}
Twitter/X: ${data.twitter || 'Not provided'}
TikTok: ${data.tiktok || 'Not provided'}

YOUR ART
--------
Primary Art Style: ${data.artStyle || 'Not specified'}
Secondary Art Style: ${data.secondaryArtStyle || 'None'}
Primary Medium: ${data.medium || 'Not specified'}
Secondary Medium: ${data.secondaryMedium || 'None'}
Accepts Commissions: ${data.acceptsCommissions || 'Not specified'}
Typical Price Range: ${data.priceRange || 'Not specified'}

YOUR STORY
----------
Years of Experience: ${data.yearsExperience || 'Not specified'}
Biography:
${data.bio || 'Not provided'}

==============================================
Submitted at: ${new Date().toLocaleString('en-US', {
            timeZone: 'America/New_York',
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        })} EST
==============================================
        `;

        // For now, just log to console
        // TODO: Integrate with email service (Resend, SendGrid, etc.)
        console.log('=== NEW ARTIST ONBOARDING ===');
        console.log(emailBody);
        console.log('Full data:', JSON.stringify(data, null, 2));

        // Return success response
        return NextResponse.json({
            success: true,
            message: 'Onboarding data received! You will be contacted at ' + data.email,
            artistName: data.displayName || `${data.firstName} ${data.lastName}`
        });

    } catch (error) {
        console.error('Error processing onboarding:', error);
        return NextResponse.json(
            { success: false, message: 'Failed to process onboarding data' },
            { status: 500 }
        );
    }
}
