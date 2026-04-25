import { PageCard } from "./PageCardProps"
function Pagelayout() {
  // db schema need add change
  const pages = [
    { name: 'Home', updated: '2 hours ago', live: true },
    { name: 'About', updated: 'Yesterday', live: true },
    { name: 'Contact', updated: '3 days ago', live: false }
  ]
  return (
    <div className="p-8 max-w-6xl mx-auto">
      <header className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Website Content</h1>
        <p className="text-gray-500">Select a page to update your images and text.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pages.map((page, i) => (
          <PageCard 
            key={i} 
            name={page.name} 
            lastUpdated={page.updated} 
            isLive={page.live}
          />
        ))}
      </div>
    </div>
  )
}

export default Pagelayout
