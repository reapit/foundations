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
