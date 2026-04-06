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
console.log(bookingdata)
    // 1. Define fields in the EXACT order Payfast requires
    const payfastData: Record<string, string> = {
      merchant_id: (process.env.PAYFAST_MERCHANT_ID || '').trim(),
      merchant_key: (process.env.PAYFAST_MERCHANT_KEY || '').trim(),
      return_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
      notify_url: `${process.env.NEXT_PUBLIC_BASE_URL}/api/payfast-itn`,
      amount: parseFloat(bookingdata.total.toString()).toFixed(2),
      item_name: `Booking #${bookingdata.id}`,
    };

    // 2. Generate Signature
    const passphrase = (process.env.PAYFAST_PASSPHRASE || '').trim();
    
    // Build string based on the specific keys in order
    const keys = [
      'merchant_id',
      'merchant_key',
      'return_url',
      'cancel_url',
      'notify_url',
      'amount',
      'item_name'
    ];

    let signatureString = '';
    keys.forEach((key) => {
      const value = payfastData[key];
      if (value !== undefined && value !== "") {
        // We use encodeURIComponent then replace specific characters to match Payfast's RFC 1738 requirement
        signatureString += `${key}=${encodeURIComponent(value).replace(/%20/g, "+")}&`;
      }
    });

    // Add passphrase without the trailing '&' from the loop
    const finalString = signatureString + `passphrase=${encodeURIComponent(passphrase).replace(/%20/g, "+")}`;
    
    const signature = crypto.createHash('md5').update(finalString).digest('hex');

    console.log("Constructed String:", finalString);
    console.log("Generated Signature:", signature);

    return NextResponse.json({ ...payfastData, signature });

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
