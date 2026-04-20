import { Banner } from '@/app/libs/service/types'

export function ServiceBanner({ banner }: { banner: Banner | null }) {
  if (!banner) return null

  return (
    <div
      className={`rounded-lg px-4 py-2 text-sm font-medium ${
        banner.type === 'success'
          ? 'bg-green-100 text-green-700'
          : 'bg-red-100 text-red-700'
      }`}
    >
      {banner.message}
    </div>
  )
}