import crypto from 'crypto'

type PayfastInput = {
  merchant_id: string
  merchant_key: string
  return_url: string
  cancel_url: string
  notify_url: string
  amount: string
  item_name: string
  custom_str1?: string
  passphrase: string
}

export function createPayfastPayload(data: PayfastInput) {
  const payload: Record<string, string> = {
    merchant_id: data.merchant_id.trim(),
    merchant_key: data.merchant_key.trim(),
    return_url: data.return_url.trim(),
    cancel_url: data.cancel_url.trim(),
    notify_url: data.notify_url.trim(),
    amount: Number(data.amount).toFixed(2),
    item_name: data.item_name.trim(),
  }

  if (data.custom_str1) {
    payload.custom_str1 = data.custom_str1.trim()
  }

  const keys = [
    'merchant_id',
    'merchant_key',
    'return_url',
    'cancel_url',
    'notify_url',
    'amount',
    'item_name',
    'custom_str1',
  ]

  const encode = (value: string) =>
    encodeURIComponent(value)
      .replace(/%20/g, '+')
      .replace(/%[0-9a-f]{2}/gi, (match) =>
        match.toUpperCase()
      )

  const parts = keys
    .filter((key) => payload[key] !== undefined && payload[key] !== '')
    .map((key) => `${key}=${encode(payload[key])}`)

  let signatureString = parts.join('&')

  if (data.passphrase) {
    signatureString += `&passphrase=${encode(data.passphrase.trim())}`
  }

  console.log('PAYFAST SIGNATURE STRING:')
  console.log(signatureString)

  const signature = crypto
    .createHash('md5')
    .update(signatureString)
    .digest('hex')

  console.log('PAYFAST SIGNATURE:')
  console.log(signature)

  return {
    ...payload,
    signature,
  }
}
  