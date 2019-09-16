import React, { useState, useEffect } from 'react'
import {
  WizardContextProvider,
  useWizardContext,
  WizardContextValues,
  WizardRenderContextProvider,
  useRenderWizardContext,
  WizardRenderCallbackParams
} from './context'
import { Button } from '../Button'
import { Formik, FormikProps, Form } from 'formik'
import { MdClose } from 'react-icons/md'

export interface WizardProps {
  children: React.ReactElement<WizardStepProps<any>> | React.ReactElement<WizardStepProps<any>>[]
  current?: string
  isLoading?: boolean
  visible: boolean
  afterClose?: () => void
  leftFooterRender?: ((params: WizardRenderCallbackParams<any>) => React.ReactNode) | React.ReactNode
  rightFooterRender?: ((params: WizardRenderCallbackParams<any>) => React.ReactNode) | React.ReactNode
}

export const Wizard = ({
  children,
  current,
  isLoading = false,
  visible,
  afterClose,
  leftFooterRender,
  rightFooterRender
}: WizardProps) => {
  const steps = React.Children.toArray(children).map(({ props }) => ({ ...props }))

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
    isLoading
  }

  const renderValue = {
    leftFooterRender,
    rightFooterRender
  }
  return (
    <WizardContextProvider value={value}>
      <WizardRenderContextProvider value={renderValue}>
        <div className={`modal ${visible ? 'is-active' : ''}`}>
          <div className="modal-background"></div>
          <div className="modal-card">
            <div className={`wizard modal-card-body`}>
              <div className="wizard-head flex justify-end">
                <button className="wizard-close" onClick={close}>
                  <MdClose />
                </button>
              </div>
              {React.Children.toArray(children).filter(({ props }) => props.id === internalCurrent)}
            </div>
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
  validate?: (value: T) => { [k in keyof T]: string }
  initialValue?: T
  onNavigate?: (params: {
    form: FormikProps<T>
    type: WizardActionType
    context: WizardContextValues
  }) => Promise<boolean>
  onSubmit?: (params: { values: T; context: WizardContextValues }) => void
}

Wizard.Step = function<T>({ Component, initialValue, onNavigate, validate, onSubmit }: WizardStepProps<T>) {
  const context = useWizardContext()
  const { leftFooterRender, rightFooterRender } = useRenderWizardContext()
  const { goNext, goPrev, isFirst, isLast, isLoading } = context

  return (
    <Formik
      initialValues={initialValue || ({} as T)}
      validate={validate}
      onSubmit={values => {
        onSubmit && onSubmit({ values, context })
      }}
    >
      {form => {
        let rightRender: React.ReactNode

        if (!rightFooterRender) {
          rightRender = (
            <>
              {!isLast && (
                <Button type="submit" variant="primary" loading={isLoading} className="ml-2" dataTest="wizard-save-btn">
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
                  type="submit"
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
            typeof rightFooterRender === 'function' ? rightFooterRender({ context, form }) : rightFooterRender
        }

        return (
          <Form>
            <div className="wizard-body">
              <Component />
            </div>
            <div className="wizard-footer">
              <div className="wizard-footer__left">
                {typeof leftFooterRender === 'function' ? leftFooterRender({ context, form }) : leftFooterRender}
              </div>
              <div className="wizrad-footer__right">{rightRender}</div>
            </div>
          </Form>
        )
      }}
    </Formik>
  )
}

export default Wizard
