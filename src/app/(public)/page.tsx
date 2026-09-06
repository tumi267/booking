import { getPageComponents } from '@/app/libs/crud/pageComponent'
import { renderPageComponent } from '@/app/components/(public)/ComponentBuilder/PageComponentRenderer'

export const revalidate = 60

export default async function Page() {
  const data = await getPageComponents('home')

  const components = await Promise.all(
    data.map((item) =>
      renderPageComponent({
        component: item.component,
        location: 'home',
        sectionNum: item.position + 1,
      })
    )
  )

  return (
    <main>
      {components}
    </main>
  )
}