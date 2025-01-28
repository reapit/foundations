import { Steps } from '@reapit/elements'
import React, { useState } from 'react'
import { FormWizardPropsInterface } from './interface'
import { FieldValues, SubmitHandler } from 'react-hook-form'
import { FormWizardStep } from './form-wizard-step'

export const FormWizard = <TFieldValues extends FieldValues>({
  steps,
  onSubmit,
  showStepNumbers = true,
  isSubmitting = false,
}: FormWizardPropsInterface<TFieldValues>) => {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const isSubmitStep = currentStep === Object.keys(steps).length - 1
  const [formValues, setFormValues] = useState<TFieldValues>({} as TFieldValues)

  const previousStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const nextOrSubmit: SubmitHandler<TFieldValues> = (values) => {
    if (isSubmitStep) {
      onSubmit(formValues)
      return Promise.resolve(formValues)
    } else {
      setFormValues((previous) => ({
        ...previous,
        ...values,
      }))
      setCurrentStep(currentStep + 1)
      return Promise.resolve(formValues)
    }
  }

  const selectedStep = Object.values(steps)[currentStep]

  return (
    <>
      {showStepNumbers && (
        <Steps
          steps={Object.values(steps).map((step) => step.name)}
          selectedStep={Object.values(steps)[currentStep].name}
        />
      )}
      <FormWizardStep
        onSubmit={nextOrSubmit}
        canGoBack={currentStep !== 0}
        isLastStep={isSubmitStep}
        previousStep={previousStep}
        {...selectedStep}
        isSubmitting={isSubmitting}
      />
    </>
  )
}
