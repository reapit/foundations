import React, { createContext, useContext } from 'react'

const FormContext = createContext<{ onChange: React.ChangeEventHandler; defaultValues: Record<string, any> | any[] }>({
  onChange: () => {},
  defaultValues: {},
})

export const FormContextProvider = FormContext.Provider

export const useFormContext = () => useContext(FormContext)
