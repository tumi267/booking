'use client'
import Loading from '../../Loading/Loading'
import { useAdminServices } from '@/app/hooks/useAdminServices'
import { ServiceHeader } from './cards/ServiceHeader'
import { ServiceBanner } from './cards/ServiceBanner'
import { ServiceGrid } from './cards/ServiceGrid'
import { ServiceEditorModal } from './cards/ServiceEditorModal'
export default function Services() {
  const {
    services,
    team,
    selectedId,
    selectedService,
    showEditor,
    banner,
    loading,
    setSelectedId,
    setShowEditor,
    addService,
    updateService,
    saveService,
    removeService,
  } = useAdminServices()

  if (loading) return <Loading />

  return (
    <div className="space-y-6 rounded-xl border bg-white p-6 shadow-sm">
      <ServiceBanner banner={banner} />

      <ServiceHeader onAdd={addService} />

      <ServiceGrid
        services={services}
        onEdit={(id) => {
          setSelectedId(id)
          setShowEditor(true)
        }}
        onRemove={removeService}
      />

      <ServiceEditorModal
        open={showEditor}
        service={selectedService}
        team={team}
        onClose={() => setShowEditor(false)}
        onUpdate={updateService}
        onRemove={removeService}
        onSave={saveService}
      />
    </div>
  )
}