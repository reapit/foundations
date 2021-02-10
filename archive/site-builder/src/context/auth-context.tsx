import React from 'react'
import { AuthHook } from '@/hooks/use-auth'

export const AuthContext = React.createContext<AuthHook>({} as AuthHook)
AuthContext.displayName = 'AuthContext'

export default AuthContext
