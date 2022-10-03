import { adminReadonlyGroup, adminWriteGroup } from './consts'
import { CredsType } from './cred-guard'

/**
 * Loose admin check. Checks if scopes present for readonly or write admin
 *
 * @param creds CredsType
 * @returns boolean
 */
export const isAdmin = (creds: CredsType): boolean =>
  creds.type === 'jwt' && creds.groups.some((group) => [adminWriteGroup, adminReadonlyGroup].includes(group))

/**
 * Returns true if creds have required scope for write access
 *
 * @param creds CredsType
 * @returns boolean
 */
export const isWriteAdmin = (creds: CredsType): boolean =>
  creds.type === 'jwt' && creds.groups.includes(adminWriteGroup)

/**
 * Returns true if creds have required scopes for readonly admin
 *
 * @param creds CredsType
 * @returns boolean
 */
export const isReadonlyAdmin = (creds: CredsType): boolean => isAdmin(creds)
