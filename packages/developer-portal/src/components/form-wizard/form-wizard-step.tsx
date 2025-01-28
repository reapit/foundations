import { Button, ButtonGroup } from '@reapit/elements'
import React from 'react'
import { FormWizardStepPropsInterface } from './interface'
import { FieldValues, useForm } from 'react-hook-form'

export const FormWizardStep = <TFieldValues extends FieldValues>({
  formOptions,
  component: Component,
  previousStep,
  canGoBack,
  isLastStep,
  onSubmit,
  isSubmitting = false,
  submitButtonText = 'Submit',
  ...rest
}: FormWizardStepPropsInterface<TFieldValues>) => {
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
    <form {...rest} onSubmit={handleSubmit(onSubmit)}>
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
          {isLastStep ? submitButtonText : 'Next'}
        </Button>
      </ButtonGroup>
    </form>
  )
}
