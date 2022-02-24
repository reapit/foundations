import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { AppTabsState, AppUriParams, useAppState } from '../state/use-app-state'
import { handleSetAppId } from '../utils/handle-set-app-id'
import { useParams } from 'react-router-dom'
import { AppEditTab, AppEditTabs } from './edit-page-tabs'
import { AppEditFormSchema } from './form-schema/form-fields'
import { yupResolver } from '@hookform/resolvers/yup'
import { appEditValidationSchema } from './form-schema/validation-schema'
import { useForm, UseFormGetValues, UseFormHandleSubmit, useWatch } from 'react-hook-form'
import { listingInCompletion } from '../utils/listing-in-completion'
import { SendFunction, UpdateReturnTypeEnum, useReapitUpdate } from '@reapit/utils-react'
import { AppDetailModel, CreateAppRevisionModel } from '@reapit/foundations-ts-definitions'
import { UpdateActionNames, updateActions } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { formatFormValues } from '../utils/format-form-values'

export interface AppEditFormProps {
  tab: AppEditTab
}

export const handleSetAppSubmitting =
  (
    setAppEditSaving: Dispatch<SetStateAction<boolean>>,
    appEditSaving: boolean,
    handleSubmit: UseFormHandleSubmit<AppEditFormSchema>,
    createAppRevision: SendFunction<CreateAppRevisionModel, boolean | AppDetailModel>,
  ) =>
  () => {
    if (appEditSaving) {
      handleSubmit(async (values) => {
        console.log('Values', values)

        const formattedModel = formatFormValues(values)

        console.log('Submitting', formattedModel)

        await createAppRevision(formattedModel)

        setAppEditSaving(false)
      })()
    }
  }

export const handleSetTabsState =
  (
    setAppTabsState: Dispatch<SetStateAction<AppTabsState>>,
    getValues: UseFormGetValues<AppEditFormSchema>,
    isCompletingListing: boolean,
    isAgencyCloudIntegrated: boolean,
    isListed: boolean,
  ) =>
  () => {
    setAppTabsState((currentState: AppTabsState) => {
      if (currentState.isAgencyCloudIntegrated !== isAgencyCloudIntegrated) {
        return {
          ...currentState,
          isAgencyCloudIntegrated,
        }
      }

      if (currentState.isCompletingListing !== isCompletingListing) {
        const hasCompletedValues = listingInCompletion(getValues())
        return {
          ...currentState,
          isCompletingListing: !hasCompletedValues && isCompletingListing,
        }
      }

      if (currentState.isListed !== isListed) {
        return {
          ...currentState,
          isListed,
        }
      }

      return currentState
    })
  }

export const AppEditForm: FC<AppEditFormProps> = ({ tab }) => {
  const { appId } = useParams<AppUriParams>()
  const { appEditState, setAppId, setAppTabsState } = useAppState()
  const { appEditForm, setAppEditSaving, appEditSaving } = appEditState

  const [, , createAppRevision] = useReapitUpdate<CreateAppRevisionModel, AppDetailModel>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.createAppRevsion],
    method: 'POST',
    uriParams: {
      appId,
    },
    returnType: UpdateReturnTypeEnum.LOCATION,
  })

  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<AppEditFormSchema>({
    resolver: yupResolver(appEditValidationSchema),
    delayError: 500,
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      ...appEditForm,
    },
  })

  const isCompletingListing = useWatch({
    control,
    name: 'isCompletingListing',
  })

  const isAgencyCloudIntegrated = useWatch({
    control,
    name: 'isAgencyCloudIntegrated',
  })

  const isListed = useWatch({
    control,
    name: 'isListed',
  })

  useEffect(handleSetTabsState(setAppTabsState, getValues, isCompletingListing, isAgencyCloudIntegrated, isListed), [
    isCompletingListing,
    isAgencyCloudIntegrated,
    isListed,
  ])
  useEffect(handleSetAppId(appId, setAppId), [appId])
  useEffect(handleSetAppSubmitting(setAppEditSaving, appEditSaving, handleSubmit, createAppRevision), [appEditSaving])

  console.log('Errors', errors)
  console.log('Values', getValues())

  return (
    <form>
      <AppEditTabs tab={tab} register={register} errors={errors} control={control} getValues={getValues} />
    </form>
  )
}
