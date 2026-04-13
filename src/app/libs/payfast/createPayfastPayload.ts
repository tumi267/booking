import crypto from "crypto";

type PayfastInput = {
  merchant_id: string;
  merchant_key: string; 
  return_url: string;
  cancel_url: string;
  notify_url: string;
  amount: string;
  item_name: string;
  custom_str1?: string;
  passphrase?: string;
};

export function createPayfastPayload(data: PayfastInput) {
    const {
      merchant_id,
      merchant_key,
      return_url,
      cancel_url,
      notify_url,
      amount,
      item_name,
      custom_str1,
      passphrase = ""
    } = data;
  
    const payload: Record<string, string> = {
      merchant_id: merchant_id.trim(),
      merchant_key: merchant_key.trim(), // Required in both signature AND payload
      return_url: return_url.trim(),
      cancel_url: cancel_url.trim(),
      notify_url: notify_url.trim(),
      amount: parseFloat(amount).toFixed(2),
      item_name: item_name.trim(),
    };
  
    if (custom_str1) payload.custom_str1 = custom_str1.trim();
  
    // 1. Mandatory Field Order [Source: PayFast Docs]
    const keys = [
      "merchant_id",
      "merchant_key",
      "return_url",
      "cancel_url",
      "notify_url",
      "amount",
      "item_name",
      "custom_str1",
    ];
  
    // 2. Build string with UPPERCASE encoding
    let signatureString = "";
    keys.forEach((key) => {
      const value = payload[key];
      if (value !== undefined && value !== "") {
        const encodedValue = encodeURIComponent(value)
          .replace(/%20/g, "+")
          .replace(/%[0-9a-f]{2}/g, (match) => match.toUpperCase()); // Fixes %3a to %3A
        signatureString += `${key}=${encodedValue}&`;
      }
    });
  
    // 3. Append passphrase (do NOT include "passphrase=" key, just the value if it exists)
    // Note: Docs state add &passphrase= if set in dashboard
    let finalString = signatureString.slice(0, -1);
    if (passphrase) {
      const encodedPass = encodeURIComponent(passphrase.trim())
        .replace(/%20/g, "+")
        .replace(/%[0-9a-f]{2}/g, (match) => match.toUpperCase());
      finalString += `&passphrase=${encodedPass}`;
    }
  
    const signature = crypto
      .createHash("md5")
      .update(finalString)
      .digest("hex");
  
    return {
      ...payload,
      signature,
    };
  }
  