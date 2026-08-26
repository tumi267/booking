import type { SocialLink } from '@/app/types/contact'

interface Props {
  links: SocialLink[]
}

export default function Social({
  links,
}: Props) {
  return (
    <section>
      <h3>Follow Us</h3>

      {links.map((link) => (
        <div key={link.socialLink}>
          {link.socialLink}
        </div>
      ))}
    </section>
  )
}