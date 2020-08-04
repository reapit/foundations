import React from 'react'
import { AuthHook } from '@/hooks/use-auth'
/*
 * TODOME(AuthContext)
 * remove
 */

export const AuthContext = React.createContext<AuthHook>({} as AuthHook)
AuthContext.displayName = 'AuthContext'

export default AuthContext
