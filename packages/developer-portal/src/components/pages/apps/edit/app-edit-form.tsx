import React, { FC, SetStateAction, useEffect } from 'react'
import { AppUriParams, useAppState } from '../state/use-app-state'
import { handleSetAppId } from '../utils/handle-set-app-id'
import { useParams } from 'react-router-dom'
import { AppEditTab, AppEditTabs } from './edit-page-tabs'
import { AppEditFormSchema } from './form-schema/form-fields'
import { yupResolver } from '@hookform/resolvers/yup'
import { appEditValidationSchema } from './form-schema/validation-schema'
import { SubmitHandler, useForm } from 'react-hook-form'

export interface AppEditFormProps {
  tab: AppEditTab
}

export const AppEditForm: FC<AppEditFormProps> = ({ tab }) => {
  const { appId } = useParams<AppUriParams>()
  const { appEditState, setAppId } = useAppState()
  const { appEditForm, setAppEditForm } = appEditState

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AppEditFormSchema>({
    resolver: yupResolver(appEditValidationSchema),
    defaultValues: {
      ...appEditForm,
    },
  })

  useEffect(handleSetAppId(appId, setAppId), [appId])

  console.log('Form Values', appEditForm)

  return (
    <form onChange={handleSubmit(setAppEditForm as SubmitHandler<SetStateAction<AppEditFormSchema>>)}>
      <AppEditTabs tab={tab} register={register} errors={errors} />
    </form>
  )
}
