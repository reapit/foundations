import React, { createContext, useState, useRef } from 'react'
import { SnackHolder } from '../components/snack-holder'
import { ISnack } from '../components/snack'

export interface SnackContextProps {
  addSnackWithTimeout: (snack: ISnack, timeout: number) => void
}

export const SnackContext = createContext<SnackContextProps>({} as SnackContextProps)

export const SnackProvider: React.FC = ({ children }) => {
  const [snacks, setSnacks] = useState<ISnack[]>([])

  // must also use a ref so that inside the callback to setTimeout, `snacks` is the
  // current value, not the value at time of the setTimeout closures invocation
  const snackRef = useRef(snacks)
  snackRef.current = snacks

  const removeSnackById = (id: string) => {
    setSnacks(snackRef.current.filter((snack) => snack._id !== id))
  }

  const addSnackWithTimeout = (snack: ISnack, timeout: number) => {
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
