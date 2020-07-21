import React from 'react'
import { AuthHook } from '../hooks/use-auth'

// FIXME: remove this
// make sure thing stil work
export const AuthContext = React.createContext<AuthHook>({} as AuthHook)
AuthContext.displayName = 'AuthContext'

export default AuthContext
