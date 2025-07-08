import { NextRequest, NextResponse } from 'next/server';
import { Twilio } from 'twilio';

// ✅ Helper to ensure env variables are not undefined at runtime or in TypeScript
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }
  return value;
}

const accountSid = requireEnv('TWILIO_ACCOUNT_SID');
const authToken = requireEnv('TWILIO_AUTH_TOKEN');
const verifyServiceSid = requireEnv('TWILIO_SERVICE_SID');

const client = new Twilio(accountSid, authToken);

export async function POST(req: NextRequest) {
  try {
    const { phone } = await req.json();

    if (!phone || typeof phone !== 'string') {
      return NextResponse.json({ message: 'Phone number is required' }, { status: 400 });
    }

    const verification = await client.verify
      .v2.services(verifyServiceSid)
      .verifications.create({ to: phone, channel: 'sms' });

    return NextResponse.json({ status: verification.status }); // usually 'pending'
  } catch (error: any) {
    console.error('Send OTP Error:', error);
    return NextResponse.json(
      { message: error.message || 'Failed to send OTP' },
      { status: 500 }
    );
  }
}
