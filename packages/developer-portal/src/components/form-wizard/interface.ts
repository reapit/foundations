import { FC } from 'react'
import {
  UseFormRegister,
  FieldValues,
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
  UseFormSetError,
  UseFormProps,
  SubmitHandler,
} from 'react-hook-form'

export type StepComponent<TFieldValues extends FieldValues> = FC<{
  register: UseFormRegister<TFieldValues>
  errors: FieldErrors<TFieldValues>
  getValues: UseFormGetValues<TFieldValues>
  setValue: UseFormSetValue<TFieldValues>
  watch: UseFormWatch<TFieldValues>
  setError: UseFormSetError<TFieldValues>
}>

export type Step<TFieldValues extends FieldValues> = {
  name: string
  component: StepComponent<TFieldValues>
  formOptions?: UseFormProps<TFieldValues>
}

export interface FormWizardPropsInterface<TFieldValues extends FieldValues>
  extends Omit<React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'onSubmit'> {
  steps: Record<string, Step<TFieldValues>>
  onSubmit: SubmitHandler<TFieldValues>
  showStepNumbers?: boolean
  isSubmitting?: boolean
  submitButtonText?: string
}

export interface FormWizardStepPropsInterface<TFieldValues extends FieldValues>
  extends Omit<React.DetailedHTMLProps<React.FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'onSubmit'> {
  onSubmit: SubmitHandler<TFieldValues>
  previousStep: () => void
  canGoBack: boolean
  isLastStep: boolean
  name: string
  component: StepComponent<TFieldValues>
  formOptions?: UseFormProps<TFieldValues>
  isSubmitting?: boolean
  submitButtonText?: string
}
