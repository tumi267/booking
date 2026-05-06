'use client'

import { ProviderRole } from '@prisma/client'
import Loading from '../../Loading/Loading'
import { useAdminProviders } from '@/app/hooks/useAdminProviders'
import { TeamBanner } from './cards/TeamBanner'
import { TeamHeader } from './cards/TeamHeader'
import { TeamTable } from './cards/TeamTable'
import { TeamEditorModal } from './cards/TeamEditorModal'

export default function TeamManagement() {
  const {team,selectedId,setSelectedId,selectedMember,showEditor,setShowEditor,loading,banner,addMember,updateMember,saveMember,removeMember,showpass,setShowpass} = useAdminProviders()
  const roles = Object.values(ProviderRole) as ProviderRole[]
  if (loading) {
    return <Loading />
  }
  return (
    <div className="space-y-6 rounded-xl border bg-white p-6 shadow-sm">
      <TeamBanner banner={banner} />
      <TeamHeader onAdd={() => addMember()} />
      <TeamTable
        team={team}
        onEdit={(id) => {
          setSelectedId(id)
          setShowEditor(true)
        }}
        onRemove={removeMember}
      />
      <TeamEditorModal
        open={showEditor}
        member={selectedMember}
        roles={roles}
        onClose={() => setShowEditor(false)}
        onUpdate={updateMember}
        onRemove={removeMember}
        onSave={saveMember}
        showpass={showpass}
        setShowpass={setShowpass}
      />
    </div>
  )
}