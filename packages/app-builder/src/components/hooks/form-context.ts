import React, { createContext, useContext } from 'react'

const FormContext = createContext<{ onChange: React.ChangeEventHandler }>({
  onChange: () => {},
})

export const FormContextProvider = FormContext.Provider

export const useFormContext = () => useContext(FormContext)
