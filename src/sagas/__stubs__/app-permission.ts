import { ScopeModel } from '@/types/marketplace-api-schema'

export const appPermissionStub: ScopeModel[] = [
  {
    name: 'Marketplace/developers.read',
    description: 'Read data about developers'
  },
  {
    name: 'Marketplace/developers.write',
    description: 'Write data about developers'
  }
]
