import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const rawData = await req.text();
    const params = new URLSearchParams(rawData);
    const data = Object.fromEntries(params);

    // --- SIGNATURE VERIFICATION ---
    const passphrase = process.env.PAYFAST_PASSPHRASE || '';
    let signatureString = '';
    params.forEach((value, key) => {
      if (key !== 'signature') {
        signatureString += `${key}=${encodeURIComponent(value).replace(/%20/g, "+")}&`;
      }
    });
    const finalString = signatureString.slice(0, -1) + (passphrase ? `&passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, "+")}` : '');
    const generatedSignature = crypto.createHash('md5').update(finalString).digest('hex');

    if (data.signature !== generatedSignature) {
      console.error('❌ ITN Signature Mismatch!');
      return new Response('Signature Mismatch', { status: 400 });
    }

    /*update booking */
    // --- THE CONSOLE LOGS (Your "ORM" placeholder) ---
    // console.log('------------------------------------------');
    // console.log('🚀 PAYFAST ITN RECEIVED!');
    // console.log(`Booking ID: ${data.item_name}`);
    // console.log(`Payment Status: ${data.payment_status}`);
    // console.log(`Amount: R${data.amount_gross}`);
    // console.log(`Customer Email: ${data.email_address || 'Not provided'}`);
    // console.log('------------------------------------------');

    if (data.payment_status === 'COMPLETE') {
      console.log('✅ DATABASE ACTION: Set booking to PAID');
    } else {
      console.log(`⚠️ DATABASE ACTION: Set booking to ${data.payment_status}`);
    }

    return new Response('OK', { status: 200 });

  } catch (error) {
    console.error('ITN Error:', error);
    return new Response('Error', { status: 500 });
  }
}
