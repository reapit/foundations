import { Button, ButtonGroup, Steps } from '@reapit/elements'
import React, { useState } from 'react'
import { Step, StepComponent } from './interface'
import { FieldValues, UseFormProps, useForm, SubmitHandler } from 'react-hook-form'

const FormWizardStep = <TFieldValues extends FieldValues>({
  formOptions,
  component: Component,
  previousStep,
  canGoBack,
  isLastStep,
  onSubmit,
  isSubmitting = false,
}: {
  onSubmit: SubmitHandler<TFieldValues>
  previousStep: () => void
  canGoBack: boolean
  isLastStep: boolean
  isSubmitting?: boolean
  name: string
  component: StepComponent<TFieldValues>
  formOptions?: UseFormProps<TFieldValues>
}) => {
  const {
    handleSubmit,
    register,
    getValues,
    watch,
    setError,
    setValue,
    formState: { errors },
  } = useForm(formOptions)

  return (
    <form style={{ marginTop: '1rem' }} onSubmit={handleSubmit(onSubmit)}>
      <Component
        register={register}
        errors={errors}
        getValues={getValues}
        watch={watch}
        setError={setError}
        setValue={setValue}
      />
      <ButtonGroup>
        <Button
          disabled={!canGoBack}
          onClick={(event) => {
            event.preventDefault()
            previousStep()
          }}
          intent="neutral"
        >
          Previous
        </Button>
        <Button disabled={isSubmitting} loading={isSubmitting} intent="primary">
          {isLastStep ? 'Submit' : 'Next'}
        </Button>
      </ButtonGroup>
    </form>
  )
}

export const FormWizard = <TFieldValues extends FieldValues>({
  steps,
  onSubmit,
  showStepNumbers = true,
  isSubmitting = false,
}: {
  steps: Record<string, Step<TFieldValues>>
  onSubmit: SubmitHandler<TFieldValues>
  showStepNumbers?: boolean
  isSubmitting?: boolean
}) => {
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
        values,
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
