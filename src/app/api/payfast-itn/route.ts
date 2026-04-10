import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { confirmBookingGroup, getBookingByGroup } from '@/app/libs/crud/booking';

export async function POST(req: Request) {
  try {
    const rawData = await req.text();
    const params = new URLSearchParams(rawData);
    const data = Object.fromEntries(params);

    // 1. SIGNATURE VALIDATION
    const passphrase = process.env.PAYFAST_PASSPHRASE || '';
    let signatureString = '';

    // IMPORTANT: PayFast sends fields in order. We MUST exclude the signature 
    // and rebuild the string using the EXACT keys sent in the POST.
    params.forEach((value, key) => {
      if (key !== 'signature') {
        // Use Uppercase encoding to match PayFast's standard
        const encodedValue = encodeURIComponent(value)
          .replace(/%20/g, "+")
          .replace(/%[0-9a-f]{2}/g, (match) => match.toUpperCase());
        
        signatureString += `${key}=${encodedValue}&`;
      }
    });

    let finalString = signatureString.slice(0, -1);
    
    if (passphrase) {
      const encodedPass = encodeURIComponent(passphrase.trim())
        .replace(/%20/g, "+")
        .replace(/%[0-9a-f]{2}/g, (match) => match.toUpperCase());
      finalString += `&passphrase=${encodedPass}`;
    }

    const generatedSignature = crypto
      .createHash('md5')
      .update(finalString)
      .digest('hex');

    if (data.signature !== generatedSignature) {
      console.error('❌ ITN Signature Mismatch!');
      // PayFast expects a 200 OK even on failure to stop retries, 
      // but logging the error is crucial for debugging.
      return new Response('Signature Mismatch', { status: 200 }); 
    }

    // 2. EXTRACT GROUP ID & STATUS
    const groupId = data.custom_str1;
    const paymentStatus = data.payment_status;

    if (!groupId) {
      console.error('❌ Missing groupId (custom_str1)');
      return new Response('OK', { status: 200 });
    }

    // 3. SUCCESS FLOW
    if (paymentStatus === 'COMPLETE') {
      const existing = await getBookingByGroup(groupId);
      
      if (existing.length > 0) {
        const updated = await confirmBookingGroup(groupId);
        console.log(`✅ ITN Success: Confirmed ${updated.count} bookings for group ${groupId}`);
      } else {
        console.error(`⚠️ ITN Received for unknown group: ${groupId}`);
      }
    } 

    // Always return 200 to PayFast
    return new Response('OK', { status: 200 });

  } catch (error) {
    console.error('ITN Error:', error);
    return new Response('Error', { status: 500 });
  }
}
