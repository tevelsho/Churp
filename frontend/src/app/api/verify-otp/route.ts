import { NextRequest, NextResponse } from 'next/server';
import { Twilio } from 'twilio';

// ✅ Safe helper to guarantee env variables are defined at runtime and type-safe
function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

// Safely loaded Twilio environment variables
const accountSid = requireEnv('TWILIO_ACCOUNT_SID');
const authToken = requireEnv('TWILIO_AUTH_TOKEN');
const verifyServiceSid = requireEnv('TWILIO_SERVICE_SID');

const client = new Twilio(accountSid, authToken);

export async function POST(req: NextRequest) {
  try {
    const { phone, code } = await req.json();
    // console.log(code)
    // console.log(phone)

    if (!phone || !code || typeof phone !== 'string' || typeof code !== 'string') {
      return NextResponse.json(
        { message: 'Phone and code must be provided as strings' },
        { status: 400 }
      );
    }

    const check = await client.verify
      .v2.services(verifyServiceSid)
      .verificationChecks.create({ to: phone, code });

    const verified = check.status === 'approved';

    return NextResponse.json({ verified });
  } catch (error: any) {
    console.error('Verify OTP Error:', error);
    return NextResponse.json(
      { message: error.message || 'Verification failed' },
      { status: 500 }
    );
  }
}
