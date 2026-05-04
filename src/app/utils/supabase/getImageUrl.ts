const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!.replace(/\/rest\/v1\/?$/, '');

export function getImageUrl(path: string | null | undefined) {
  if (!path) return ''

  const cleanPath = path.replace(/^bookingimage\//, '')

  // Build the clean URL
  return `${SUPABASE_URL}/storage/v1/object/public/bookingimage/${cleanPath}`
}