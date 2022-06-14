import React, { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { AppSavingParams, AppUriParams, useAppState } from '../state/use-app-state'
import { handleSetAppId } from '../utils/handle-set-app-id'
import { useParams } from 'react-router-dom'
import { AppEditTabs } from './edit-page-tabs'
import { AppEditFormSchema } from './form-schema/form-fields'
import { yupResolver } from '@hookform/resolvers/yup'
import { appEditValidationSchema } from './form-schema/validation-schema'
import { FieldNamesMarkedBoolean, useForm, UseFormHandleSubmit, UseFormReset, UseFormSetValue } from 'react-hook-form'
import { SendFunction, UpdateReturnTypeEnum, useReapitUpdate } from '@reapit/utils-react'
import {
  AppDetailModel,
  CreateAppRevisionConsentsModel,
  CreateAppRevisionModel,
} from '@reapit/foundations-ts-definitions'
import { UpdateActionNames, updateActions } from '@reapit/utils-common'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { formatFormValues } from '../utils/format-form-values'
import { handleSetIncompletedFields } from '../utils/validate-schema'
import { checkShouldSendConsents } from '../utils/consents'
import { Button, ButtonGroup, useModal } from '@reapit/elements'
import { useGlobalState } from '../../../core/use-global-state'

export const handleResetForm = (appEditForm: AppEditFormSchema, reset: UseFormReset<AppEditFormSchema>) => () => {
  reset(appEditForm)
}

export const handleUnsavedChanges =
  (
    dirtyFields: FieldNamesMarkedBoolean<AppEditFormSchema>,
    setAppUnsavedFields: Dispatch<SetStateAction<FieldNamesMarkedBoolean<AppEditFormSchema>>>,
  ) =>
  () => {
    if (dirtyFields) {
      setAppUnsavedFields(dirtyFields)
    }
  }

export const handleSetRevalidating =
  (
    setValue: UseFormSetValue<AppEditFormSchema>,
    setAppEditSaving: Dispatch<SetStateAction<AppSavingParams>>,
    appEditSaving: AppSavingParams,
  ) =>
  () => {
    if (appEditSaving.isRevalidating) {
      setValue('isListed', appEditSaving.isListed, { shouldValidate: true })

      setAppEditSaving({
        ...appEditSaving,
        isRevalidating: false,
        isSaving: true,
      })
    }
  }

export const handleSetAppSubmitting =
  (
    setAppEditSaving: Dispatch<SetStateAction<AppSavingParams>>,
    appEditSaving: AppSavingParams,
    handleSubmit: UseFormHandleSubmit<AppEditFormSchema>,
    createAppRevision: SendFunction<CreateAppRevisionModel, boolean | AppDetailModel>,
    appsRefresh: () => void,
    appsDetailRefresh: () => void,
    appRefreshRevisions: () => void,
    appDetail: AppDetailModel | null,
    openModal: () => void,
  ) =>
  () => {
    if (appEditSaving.isSaving) {
      handleSubmit(async (values) => {
        const formattedModel = formatFormValues(values)

        const appRevision = await createAppRevision(formattedModel)

        setAppEditSaving({
          isListed: values.isListed,
          isRevalidating: false,
          isSaving: false,
        })

        if (appRevision) {
          appsDetailRefresh()
          appRefreshRevisions()
          appsRefresh()
        }

        const shouldShowConsents = checkShouldSendConsents(appDetail, formattedModel)

        if (shouldShowConsents) {
          openModal()
        }
      })()
    }
  }

export const handleSendConstents =
  (
    createConsentEmails: SendFunction<CreateAppRevisionConsentsModel, boolean>,
    closeModal: () => void,
    developerEmail?: string,
  ) =>
  () => {
    createConsentEmails({ actionedBy: developerEmail })
    closeModal()
  }

export const AppEditForm: FC = () => {
  const { appId } = useParams<AppUriParams>()
  const { appEditState, setAppId, appsDataState } = useAppState()
  const { globalDataState } = useGlobalState()
  const { appEditForm, setAppEditSaving, appEditSaving, setAppUnsavedFields, setIncompleteFields } = appEditState
  const { appsRefresh, appsDetailRefresh, appRefreshRevisions, appDetail, appRevisions } = appsDataState
  const latestRevision = appRevisions?.data ? appRevisions.data[0] : null
  const developerEmail = globalDataState?.currentDeveloper?.email
  const { Modal, openModal, closeModal } = useModal()

  const [, , createAppRevision] = useReapitUpdate<CreateAppRevisionModel, AppDetailModel>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.createAppRevsion],
    method: 'POST',
    uriParams: {
      appId,
    },
    returnType: UpdateReturnTypeEnum.LOCATION,
  })

  const [, , createConsentEmails] = useReapitUpdate<CreateAppRevisionConsentsModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.createConsentEmails],
    method: 'POST',
    uriParams: {
      appId,
      revisionId: latestRevision?.id,
    },
  })

  const {
    register,
    handleSubmit,
    control,
    getValues,
    setValue,
    reset,
    formState: { errors, dirtyFields },
  } = useForm<AppEditFormSchema>({
    resolver: yupResolver(appEditValidationSchema),
    delayError: 500,
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      ...appEditForm,
    },
  })

  const numberDirtyFields = Object.keys(dirtyFields).length

  useEffect(handleSetAppId(appId, setAppId), [appId])

  useEffect(handleUnsavedChanges(dirtyFields, setAppUnsavedFields), [numberDirtyFields])

  useEffect(handleSetIncompletedFields(getValues(), setIncompleteFields), [numberDirtyFields])

  useEffect(handleResetForm(appEditForm, reset), [appEditForm])

  useEffect(handleSetRevalidating(setValue, setAppEditSaving, appEditSaving), [appEditSaving])

  useEffect(
    handleSetAppSubmitting(
      setAppEditSaving,
      appEditSaving,
      handleSubmit,
      createAppRevision,
      appsRefresh,
      appsDetailRefresh,
      appRefreshRevisions,
      appDetail,
      openModal,
    ),
    [appEditSaving],
  )

  return (
    <form>
      <AppEditTabs register={register} errors={errors} control={control} getValues={getValues} />
      <Modal title="Additional Permissions Requested">
        <ButtonGroup alignment="center">
          <Button fixedWidth onClick={closeModal} intent="low">
            Close
          </Button>
          <Button
            fixedWidth
            onClick={handleSendConstents(createConsentEmails, closeModal, developerEmail)}
            intent="primary"
          >
            Send Requests
          </Button>
        </ButtonGroup>
      </Modal>
    </form>
  )
}
