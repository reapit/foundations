import React, { useContext, createContext } from 'react'
import { FormikProps } from 'formik'
import { WizardStepProps } from '.'

export type WizardContextValues = {
  current: string
  goNext: () => void
  goPrev: () => void
  goTo: (stepId: string) => void
  close: () => void
  currentIndex: number
  isFirst: boolean
  isLast: boolean
  steps: WizardStepProps<any>[]
  isLoading: boolean
}

// @ts-ignore: ignore fulfill default values
const WizardContext = createContext<WizardContextValues>({})

export const WizardContextProvider: React.FC<{ value: WizardContextValues }> = ({ children, value }) => (
  <WizardContext.Provider value={value}>{children}</WizardContext.Provider>
)

export const useWizardContext = (): WizardContextValues => {
  return useContext(WizardContext)
}

export type WizardRenderCallbackParams = {
  context: WizardContextValues
  form: FormikProps<any>
}

export type WizardRenderContextValues = {
  leftFooterRender: ((params: WizardRenderCallbackParams) => React.ReactNode) | React.ReactNode
  rightFooterRender: ((params: WizardRenderCallbackParams) => React.ReactNode) | React.ReactNode
}

// @ts-ignore: ignore fulfill default values
const RenderWizardContext = createContext<WizardRenderContextValues>({})

export const WizardRenderContextProvider = ({
  children,
  value,
}: {
  value: WizardRenderContextValues
  children: React.ReactNode
}) => <RenderWizardContext.Provider value={value}>{children}</RenderWizardContext.Provider>

export const useRenderWizardContext = (): WizardRenderContextValues => {
  return useContext(RenderWizardContext)
}
