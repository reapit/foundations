import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { AppUriParams, useAppState } from '../state/use-app-state'
import { handleSetAppId } from '../utils/handle-set-app-id'
import { useParams } from 'react-router-dom'
import { AppEditTab, AppEditTabs } from './edit-page-tabs'
import { AppEditFormSchema } from './form-schema/form-fields'
import { yupResolver } from '@hookform/resolvers/yup'
import { appEditValidationSchema } from './form-schema/validation-schema'
import { useForm, UseFormHandleSubmit } from 'react-hook-form'

export interface AppEditFormProps {
  tab: AppEditTab
}

export const handleSetAppSubmitting =
  (
    setAppEditSaving: Dispatch<SetStateAction<boolean>>,
    appEditSaving: boolean,
    handleSubmit: UseFormHandleSubmit<AppEditFormSchema>,
  ) =>
  () => {
    if (appEditSaving) {
      handleSubmit((values) => console.log('Submitting', values))()
      setAppEditSaving(false)
    }
  }

export const AppEditForm: FC<AppEditFormProps> = ({ tab }) => {
  const { appId } = useParams<AppUriParams>()
  const { appEditState, setAppId } = useAppState()
  const { appEditForm, setAppEditSaving, appEditSaving } = appEditState

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<AppEditFormSchema>({
    resolver: yupResolver(appEditValidationSchema),
    mode: 'all',
    defaultValues: {
      ...appEditForm,
    },
  })

  useEffect(handleSetAppId(appId, setAppId), [appId])
  useEffect(handleSetAppSubmitting(setAppEditSaving, appEditSaving, handleSubmit), [appEditSaving])

  console.log('Errors', errors)

  return (
    <form>
      <AppEditTabs tab={tab} register={register} errors={errors} control={control} />
    </form>
  )
}
