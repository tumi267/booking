import { NextResponse } from 'next/server';
import crypto from 'crypto';

// Define the shape of your incoming booking data
interface BookingData {
  id: string | number;
  total: string | number;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const bookingdata: BookingData = body.bookingdata;

    // 1. Prepare payment data
    // Use Record<string, string | undefined> to allow dynamic key access for the signature loop
    const payfastData: Record<string, string | undefined> = {
      merchant_id: process.env.PAYFAST_MERCHANT_ID,
      merchant_key: process.env.PAYFAST_MERCHANT_KEY,
      amount: parseFloat(bookingdata.total.toString()).toFixed(2),
      item_name: `Booking #${bookingdata.id}`,
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      notify_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payfast-itn`,
    };

    // 2. Generate Signature
    const passphrase = process.env.PAYFAST_PASSPHRASE || '';
    let signatureString = '';
    
    // Construct the string (order matters!)
    const keys = Object.keys(payfastData);
    keys.forEach((key) => {
      const value = payfastData[key];
      if (value) {
        signatureString += `${key}=${encodeURIComponent(value.trim()).replace(/%20/g, "+")}&`;
      }
    });

    // Remove trailing '&' and add passphrase
    const finalString = signatureString + `passphrase=${encodeURIComponent(passphrase.trim()).replace(/%20/g, "+")}`;
    const signature = crypto.createHash('md5').update(finalString).digest('hex');

    // 3. Return data + signature
    return NextResponse.json({ ...payfastData, signature });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}