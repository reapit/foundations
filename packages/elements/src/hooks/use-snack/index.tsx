/* istanbul ignore file */
/* Had to add because of skipped test, react hooks testing not yet supporting React 18 
https://github.com/testing-library/react-hooks-testing-library/issues/654 can remove when tests un-skipped
Looks like we will have to migrate to the main testing lib when this PR is merged
https://github.com/testing-library/react-testing-library/pull/991*/
import React, { createContext, useState, useRef, useContext } from 'react'
import { SnackProps, SnackHolder } from '../../components/snack'

export interface SnackContextProps {
  addSnackWithTimeout: (snack: SnackProps, timeout: number) => void
}

export const SnackContext = createContext<SnackContextProps>({} as SnackContextProps)

export const SnackProvider: React.FC = ({ children }) => {
  const [snacks, setSnacks] = useState<SnackProps[]>([])

  // must also use a ref so that inside the callback to setTimeout, `snacks` is the
  // current value, not the value at time of the setTimeout closures invocation
  const snackRef = useRef(snacks)
  snackRef.current = snacks

  const removeSnackById = (id: string) => {
    setSnacks(snackRef.current.filter((snack) => snack._id !== id))
  }

  const addSnackWithTimeout = (snack: SnackProps, timeout: number) => {
    const _id = String(Math.round(Math.random() * 100000000))
    setSnacks([...snacks, { ...snack, _id }])
    if (timeout > 0) {
      window.setTimeout(() => removeSnackById(_id), timeout)
    }
  }

  return (
    <SnackContext.Provider value={{ addSnackWithTimeout }}>
      <SnackHolder snacks={snacks} removeSnackById={removeSnackById} />
      {children}
    </SnackContext.Provider>
  )
}

export interface UseSnack {
  custom: (snack: SnackProps, timeout?: number) => void
  success: (text: string, timeout?: number) => void
  info: (text: string, timeout?: number) => void
  error: (text: string, timeout?: number) => void
  warning: (text: string, timeout?: number) => void
}

export const useSnack = (): UseSnack => {
  const { addSnackWithTimeout } = useContext(SnackContext)
  const DEFAULT_TIMEOUT = 3000

  const custom = (snack: SnackProps, timeout = DEFAULT_TIMEOUT) => {
    addSnackWithTimeout(snack, timeout)
  }
  const success = (text: string, timeout = DEFAULT_TIMEOUT) => {
    addSnackWithTimeout({ intent: 'success', icon: 'tickSolidSystem', text }, timeout)
  }
  const info = (text: string, timeout = DEFAULT_TIMEOUT) => {
    addSnackWithTimeout({ intent: 'secondary', icon: 'infoSolidSystem', text }, timeout)
  }
  const error = (text: string, timeout = DEFAULT_TIMEOUT) => {
    addSnackWithTimeout({ intent: 'danger', icon: 'errorSolidSystem', text }, timeout)
  }
  const warning = (text: string, timeout = DEFAULT_TIMEOUT) => {
    addSnackWithTimeout({ intent: 'critical', icon: 'warningSolidSystem', text }, timeout)
  }

  return { custom, success, info, error, warning }
}
