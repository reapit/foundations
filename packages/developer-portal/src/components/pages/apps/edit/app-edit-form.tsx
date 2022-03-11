import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { AppUriParams, useAppState } from '../state/use-app-state'
import { handleSetAppId } from '../utils/handle-set-app-id'
import { useParams } from 'react-router-dom'
import { AppEditTab, AppEditTabs } from './edit-page-tabs'
import { AppEditFormSchema } from './form-schema/form-fields'
import { yupResolver } from '@hookform/resolvers/yup'
import { appEditValidationSchema } from './form-schema/validation-schema'
import { useForm, UseFormHandleSubmit } from 'react-hook-form'
import { SendFunction, UpdateReturnTypeEnum, useReapitUpdate } from '@reapit/utils-react'
import { AppDetailModel, CreateAppRevisionModel } from '@reapit/foundations-ts-definitions'
import { UpdateActionNames, updateActions } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../../../core/connect-session'
import { formatFormValues } from '../utils/format-form-values'
import { History } from 'history'
import Routes from '../../../../constants/routes'
import { useHistory } from 'react-router'

export interface AppEditFormProps {
  tab: AppEditTab
}

export const handleSetAppSubmitting =
  (
    setAppEditSaving: Dispatch<SetStateAction<boolean>>,
    appEditSaving: boolean,
    handleSubmit: UseFormHandleSubmit<AppEditFormSchema>,
    createAppRevision: SendFunction<CreateAppRevisionModel, boolean | AppDetailModel>,
    history: History,
    appId: string,
    appsRefresh: () => void,
    appsDetailRefresh: () => void,
  ) =>
  () => {
    if (appEditSaving) {
      handleSubmit(async (values) => {
        const formattedModel = formatFormValues(values)

        const appRevision = await createAppRevision(formattedModel)

        setAppEditSaving(false)

        if (appRevision) {
          appsRefresh()
          appsDetailRefresh()
          history.push(`${Routes.APPS}/${appId}`)
        }
      })()
    }
  }

export const AppEditForm: FC<AppEditFormProps> = ({ tab }) => {
  const { appId } = useParams<AppUriParams>()
  const { appEditState, setAppId, appsDataState } = useAppState()
  const history = useHistory()
  const { appEditForm, setAppEditSaving, appEditSaving } = appEditState
  const { appsRefresh, appsDetailRefresh } = appsDataState

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

  useEffect(handleSetAppId(appId, setAppId), [appId])
  useEffect(
    handleSetAppSubmitting(
      setAppEditSaving,
      appEditSaving,
      handleSubmit,
      createAppRevision,
      history,
      appId,
      appsRefresh,
      appsDetailRefresh,
    ),
    [appEditSaving],
  )

  return (
    <form>
      <AppEditTabs tab={tab} register={register} errors={errors} control={control} getValues={getValues} />
    </form>
  )
}
