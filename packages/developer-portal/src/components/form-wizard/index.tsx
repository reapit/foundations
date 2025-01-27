import { Button, ButtonGroup, Steps } from '@reapit/elements'
import React, { FC, useState } from 'react'
import {
  useForm,
  UseFormRegister,
  FieldValues,
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
  UseFormSetError,
  UseFormProps,
  UseFormHandleSubmit,
} from 'react-hook-form'

type StepComponent<TFieldValues extends FieldValues> = FC<{
  register: UseFormRegister<TFieldValues>
  errors: FieldErrors<TFieldValues>
  getValues: UseFormGetValues<TFieldValues>
  setValue: UseFormSetValue<TFieldValues>
  watch: UseFormWatch<TFieldValues>
  setError: UseFormSetError<TFieldValues>
}>

type Step<TFieldValues extends FieldValues> = {
  name: string
  component: StepComponent<TFieldValues>
  formOptions?: UseFormProps<TFieldValues>
}

const FormWizardStep: FC<
  Step<TFieldValues> & {
    onSubmit: () => void
    previousStep: () => void
    canGoBack: boolean
    isLastStep: boolean
    isSubmitting?: boolean
  }
> = ({ formOptions, component: Component, previousStep, canGoBack, isLastStep, onSubmit, isSubmitting = false }) => {
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

export const FormWizard: FC<{
  steps: Record<string, Step<T>>
  onSubmit: UseFormHandleSubmit<T>
  showStepNumbers?: boolean
  isSubmitting?: boolean
}> = ({ steps, onSubmit, showStepNumbers = true, isSubmitting = false }) => {
  const [currentStep, setCurrentStep] = useState<number>(0)
  const isSubmitStep = currentStep === Object.keys(steps).length - 1
  const [formValues, setFormValues] = useState<undefined | T>()

  const previousStep = () => {
    setCurrentStep(currentStep - 1)
  }

  const nextOrSubmit: UseFormHandleSubmit<T> = (values) => {
    if (isSubmitStep) {
      onSubmit(formValues)
    } else {
      // TODO can errors be counted to move to the next step?
      // validate step?
      setFormValues((previous) => ({
        ...previous,
        values,
      }))
      setCurrentStep(currentStep + 1)
    }
  }

  const selectedStep = Object.values(steps)[currentStep]

  return (
    // <form onSubmit={nextOrSubmit}>
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
