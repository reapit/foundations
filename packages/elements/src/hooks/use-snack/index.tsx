import React, { createContext, useState, useRef, useContext, PropsWithChildren, FC } from 'react'
import { SnackProps, SnackHolder } from '../../components/snack'
import { generateRandomId } from '../../storybook/random-id'

export interface SnackContextProps {
  addSnackWithTimeout: (snack: SnackProps, timeout: number) => void
}

export const SnackContext = createContext<SnackContextProps>({} as SnackContextProps)

export const SnackProvider: FC<PropsWithChildren> = ({ children }) => {
  const [snacks, setSnacks] = useState<SnackProps[]>([])

  // must also use a ref so that inside the callback to setTimeout, `snacks` is the
  // current value, not the value at time of the setTimeout closures invocation
  const snackRef = useRef(snacks)
  snackRef.current = snacks

  const removeSnackById = (id: string) => {
    setSnacks(snackRef.current.filter((snack) => snack._id !== id))
  }

  const addSnackWithTimeout = (snack: SnackProps, timeout: number) => {
    const _id = generateRandomId()
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
    addSnackWithTimeout({ intent: 'success', icon: 'checkSolidSystem', text }, timeout)
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
