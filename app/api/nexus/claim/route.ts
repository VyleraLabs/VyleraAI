import { NextRequest, NextResponse } from 'next/server';
import { TuyaClient } from '@/lib/tuya';

const tuyaClient = new TuyaClient();

export async function POST(req: NextRequest) {
  // 1. Security Check: Validate x-vylera-signature header
  const signature = req.headers.get('x-vylera-signature');

  // Placeholder validation - in production this would be a real cryptographic verification
  if (!signature) {
    return NextResponse.json({ error: 'Missing signature' }, { status: 401 });
  }

  // TODO: Add actual signature verification logic here
  // For now, we accept any non-empty signature as per "placeholder for now" in requirements

  try {
    const body = await req.json();
    const { deviceId, uid } = body;

    if (!deviceId || !uid) {
      return NextResponse.json({ error: 'Missing deviceId or uid' }, { status: 400 });
    }

    // 2. Server-Side Call: Fetch device details from Tuya
    const deviceDetails = await tuyaClient.getDeviceDetails(deviceId);

    // 3. Extraction: Extract local_key, name, icon
    const { local_key, name, icon } = deviceDetails;

    if (!local_key) {
        return NextResponse.json({ error: 'local_key not found for this device' }, { status: 404 });
    }

    // 4. Response: Return extracted details
    return NextResponse.json({
      local_key,
      name,
      icon
    });

  } catch (error: unknown) {
    console.error('Error in /api/nexus/claim:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json({ error: 'Internal Server Error', details: errorMessage }, { status: 500 });
  }
}
