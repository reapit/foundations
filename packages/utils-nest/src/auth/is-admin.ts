import { adminReadonlyGroup, adminWriteGroup } from './consts'
import { CredsType } from './cred-guard'

export const isAdmin = (creds: CredsType): boolean => creds.type === 'jwt' && creds.groups.some(group => [adminWriteGroup, adminReadonlyGroup].includes(group))

export const isWriteAdmin = (creds: CredsType): boolean => creds.type === 'jwt' && creds.groups.includes(adminWriteGroup)
export const isReadonlyAdmin = (creds: CredsType): boolean => creds.type === 'jwt' && creds.groups.includes(adminReadonlyGroup)
