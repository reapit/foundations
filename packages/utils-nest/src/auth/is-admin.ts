import { CredsType } from './cred-guard'

export const isAdmin = (creds: CredsType): boolean => creds.type === 'jwt' && creds.groups.includes('ReapitEmployee')
