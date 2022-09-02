import React, { useState, useEffect } from 'react'
import {
  WizardContextProvider,
  useWizardContext,
  WizardContextValues,
  WizardRenderContextProvider,
  useRenderWizardContext,
  WizardRenderCallbackParams,
} from './context'
import { Button } from '../Button'
import { Formik, Form, FormikValues, FormikHelpers } from 'formik'
import { MdClose } from 'react-icons/md'

export interface WizardProps {
  children: React.ReactElement<WizardStepProps<any>> | React.ReactElement<WizardStepProps<any>>[]
  current?: string
  isLoading?: boolean
  visible: boolean
  afterClose?: () => void
  leftFooterRender?: ((params: WizardRenderCallbackParams) => React.ReactNode) | React.ReactNode
  rightFooterRender?: ((params: WizardRenderCallbackParams) => React.ReactNode) | React.ReactNode
}

export const Wizard = ({
  children,
  current,
  isLoading = false,
  visible,
  afterClose,
  leftFooterRender,
  rightFooterRender,
}: WizardProps) => {
  const steps = React.Children.toArray(children).map(({ props }: any) => ({ ...props }))

  const [internalCurrent, setInternalCurrent] = useState(current || steps[0].id || '')

  useEffect(() => {
    if (visible && current) {
      setInternalCurrent(current)
    }
  }, [visible])

  const isFirst = steps[0].id === internalCurrent
  const isLast = steps[steps.length - 1].id === internalCurrent
  const currentIndex = steps.findIndex(({ id }) => id === internalCurrent)

  const goNext = () => {
    if (!isLast) {
      setInternalCurrent(steps[currentIndex + 1].id)
    }
  }

  const goPrev = () => {
    if (!isFirst) {
      setInternalCurrent(steps[currentIndex - 1].id)
    }
  }

  const goTo = (stepId: string) => {
    setInternalCurrent(stepId)
  }

  const close = () => {
    afterClose && !isLoading && afterClose()
  }

  const value = {
    current: internalCurrent,
    goNext,
    goPrev,
    currentIndex,
    steps,
    goTo,
    isFirst,
    isLast,
    close,
    isLoading,
  }

  const renderValue = {
    leftFooterRender,
    rightFooterRender,
  }
  return (
    <WizardContextProvider value={value}>
      <WizardRenderContextProvider value={renderValue}>
        <div className={`modal ${visible ? 'is-active' : ''}`}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <header className="modal-card-head" style={{ display: 'flex', flexDirection: 'row-reverse' }}>
              <div>
                <button className="wizard-close" onClick={close}>
                  <MdClose />
                </button>
              </div>
            </header>
            {React.Children.toArray(children).filter(({ props }: any) => props.id === internalCurrent)}
          </div>
        </div>
      </WizardRenderContextProvider>
    </WizardContextProvider>
  )
}

export type WizardActionType = 'next' | 'prev'

export interface WizardStepProps<T> {
  id: string
  Component: React.FC<any>
  validate?: (value: FormikValues) => { [k in keyof T]: string }
  initialValue?: FormikValues
  onNavigate?: (params: {
    form: FormikHelpers<FormikValues>
    type: WizardActionType
    context: WizardContextValues
  }) => Promise<boolean>
  onSubmit?: (params: { values: FormikValues; context: WizardContextValues; form: FormikHelpers<FormikValues> }) => void
}

function WizardStep<T>({ Component, initialValue, onNavigate, validate, onSubmit }: WizardStepProps<T>) {
  const context = useWizardContext()
  const { leftFooterRender, rightFooterRender } = useRenderWizardContext()
  const { goNext, goPrev, isFirst, isLast, isLoading } = context

  return (
    <Formik
      initialValues={initialValue as FormikValues}
      validate={validate}
      onSubmit={(values, form) => {
        onSubmit && onSubmit({ values, context, form: form as FormikHelpers<FormikValues> })
      }}
    >
      {(form) => {
        let rightRender: React.ReactNode

        if (!rightFooterRender) {
          rightRender = (
            <>
              {!isLast && (
                <Button
                  type="button"
                  onClick={() => onSubmit && onSubmit({ values: form.values, context, form })}
                  variant="primary"
                  loading={isLoading}
                  className="ml-2"
                  dataTest="wizard-save-btn"
                >
                  Save
                </Button>
              )}
              {!isFirst && (
                <Button
                  type="button"
                  variant="secondary"
                  className="ml-2"
                  disabled={isLoading}
                  onClick={async () => {
                    if (onNavigate) {
                      const canGoPrev = await onNavigate({ form, type: 'prev', context })
                      canGoPrev && goPrev()
                      return
                    }
                    goPrev()
                  }}
                  dataTest="wizard-prev-btn"
                >
                  Prev
                </Button>
              )}
              {!isLast ? (
                <Button
                  type="button"
                  variant="secondary"
                  className="ml-2"
                  disabled={isLast || isLoading}
                  dataTest="wizard-next-btn"
                  onClick={async () => {
                    if (onNavigate) {
                      const canGoNext = await onNavigate({ form, type: 'next', context })
                      canGoNext && goNext()
                      return
                    }
                    goNext()
                  }}
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={() => onSubmit && onSubmit({ values: form.values, context, form })}
                  type="button"
                  variant="primary"
                  loading={isLoading}
                  className="ml-2"
                  dataTest="wizard-finish-btn"
                >
                  Finish
                </Button>
              )}
            </>
          )
        } else {
          rightRender =
            // @ts-ignore
            typeof rightFooterRender === 'function' ? rightFooterRender({ context, form }) : rightFooterRender
        }

        return (
          <>
            <div className="modal-card-body">
              <Form>
                <Component />
              </Form>
            </div>
            <footer className="modal-card-foot">
              <div>
                {typeof leftFooterRender === 'function' ? leftFooterRender({ context, form }) : leftFooterRender}
              </div>
              <div>{rightRender}</div>
            </footer>
          </>
        )
      }}
    </Formik>
  )
}

Wizard.Step = WizardStep

export default Wizard
