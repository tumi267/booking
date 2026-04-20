import {
    fetchProviders,
    createProvider,
    updateProvider,
    deleteProvider,
    TeamMember,
  } from './service'
  
  export async function loadProvidersAction() {
    return fetchProviders()
  }
  
  export async function saveProviderAction(member: TeamMember) {
    if (member.id) {
      return updateProvider(member)
    }
  
    return createProvider(member)
  }
  
  export async function deleteProviderAction(member: TeamMember) {
    if (!member.id) return
  
    await deleteProvider(member.id)
  }