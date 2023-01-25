import React, { FC, useEffect } from 'react'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import {
  Button,
  ButtonGroup,
  elMb3,
  elMb5,
  elMb7,
  FlexContainer,
  FormLayout,
  Icon,
  InputError,
  InputGroup,
  InputWrap,
  InputWrapFull,
  InputWrapMed,
  Loader,
  PageContainer,
  PersistentNotification,
  SecondaryNavContainer,
  SmallText,
  Title,
  useModal,
} from '@reapit/elements'
import { ClientConfigModel, PaymentLogo } from '@reapit/payments-ui'
import {
  GetActionNames,
  getActions,
  UpdateActionNames,
  updateActions,
  useReapitGet,
  useReapitUpdate,
} from '@reapit/use-reapit-data'
import { ErrorBoundary } from '@sentry/react'
import { openNewPage } from '../../core/nav'
import { object, string } from 'yup'
import { useForm, UseFormReset } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

const validationSchema = object({
  vendorName: string().required('Required'),
  integrationKey: string().required('Required'),
  passKey: string().required('Required'),
  companyName: string().required('Required'),
  logoUri: string().required('Required'),
})

export const handleResetForm = (config: ClientConfigModel | null, reset: UseFormReset<ClientConfigModel>) => () => {
  if (config) {
    reset(config)
  }
}

export const handleCloseModal = (closeModal: () => void, shouldClose: boolean, refreshConfig: () => void) => () => {
  if (shouldClose) {
    closeModal()
    refreshConfig()
  }
}

export const AdminPage: FC = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { Modal: UpdateModal, openModal: openUpdateModal, closeModal: closeUpdateModal } = useModal()
  const { Modal: DeleteModal, openModal: openDeleteModal, closeModal: closeDeleteModal } = useModal()

  const clientCode = connectSession?.loginIdentity?.clientId ?? ''
  const idToken = connectSession?.idToken ?? ''

  const [config, configLoading, , refreshConfig] = useReapitGet<ClientConfigModel>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getPaymentsClientConfig],
    headers: {
      Authorization: idToken,
    },
    uriParams: {
      clientCode,
    },
    onError: () => {
      // do nothing, we expect a 404 in most cases on this page
    },
    fetchWhenTrue: [clientCode, idToken],
  })

  const [deleteLoading, , deleteSubmit, deleteSubmitSuccess] = useReapitUpdate<void, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.paymentsClientConfigDelete],
    method: 'DELETE',
    headers: {
      Authorization: idToken,
    },
    uriParams: {
      clientCode,
    },
  })

  const [createLoading, , createSubmit, createSubmitSuccess] = useReapitUpdate<ClientConfigModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.paymentsClientConfigCreate],
    method: 'POST',
    headers: {
      Authorization: idToken,
    },
    uriParams: {
      clientCode,
    },
  })

  const [updateLoading, , updateSubmit, updateSubmitSuccess] = useReapitUpdate<ClientConfigModel, boolean>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.paymentsClientConfigUpdate],
    method: 'PUT',
    headers: {
      Authorization: idToken,
    },
    uriParams: {
      clientCode,
    },
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ClientConfigModel>({
    resolver: yupResolver(validationSchema),
  })

  const updateModalShouldClose = Boolean(createSubmitSuccess || updateSubmitSuccess)

  useEffect(handleResetForm(config, reset), [config])
  useEffect(handleCloseModal(closeUpdateModal, updateModalShouldClose, refreshConfig), [
    createSubmitSuccess,
    updateSubmitSuccess,
  ])
  useEffect(handleCloseModal(closeDeleteModal, Boolean(deleteSubmitSuccess), refreshConfig), [deleteSubmitSuccess])

  const submitAction = config ? updateSubmit : createSubmit
  const submitHandler = handleSubmit((configForm) => submitAction({ ...configForm, clientCode }))
  const deleteHandler = () => deleteSubmit()
  const isLoading = createLoading || updateLoading || deleteLoading

  return (
    <>
      <SecondaryNavContainer>
        <Title>Admin</Title>
        <Icon className={elMb5} iconSize="large" icon="lockedInfographic" />
        <SmallText hasGreyText>This form is required to get started with Reapit Payments.</SmallText>
        <SmallText hasGreyText>
          Please take the time to read the documentation at the below link before proceeding as this details the setup
          intructions you need to perform in your Opayo account to complete this configuration.
        </SmallText>
        <Button className={elMb3} intent="neutral" onClick={openNewPage('')}>
          View Docs
        </Button>
        <Button
          className={elMb3}
          disabled={isLoading}
          loading={updateLoading || createLoading}
          intent="critical"
          onClick={openUpdateModal}
        >
          Save Config
        </Button>
        <Button
          className={elMb3}
          disabled={isLoading}
          loading={deleteLoading}
          intent="danger"
          onClick={openDeleteModal}
        >
          Delete Config
        </Button>
      </SecondaryNavContainer>
      <PageContainer>
        <ErrorBoundary>
          <FlexContainer isFlexJustifyBetween>
            <Title>Reapit Payments App Configuration</Title>
            <PaymentLogo />
          </FlexContainer>
          {configLoading ? (
            <Loader />
          ) : (
            <>
              {config ? (
                <PersistentNotification className={elMb7} intent="secondary" isExpanded isFullWidth isInline>
                  Your app is currently configured to use Reapit Payments. You can update your details however, you will
                  be editing production configuration so please ensure the fields are valid as failure to do so can lead
                  to the app failing for all users.
                </PersistentNotification>
              ) : (
                <PersistentNotification className={elMb7} intent="secondary" isExpanded isFullWidth isInline>
                  Your app is not currently configured to use Reapit Payments. For the app to work correctly, you will
                  need to provide us with both your Opayo Credentials as specified in the documentation, your company
                  name and a url to your company logo. Please ensure these credentials are entered accurately as failure
                  to do so can lead to the app failing for all users.
                </PersistentNotification>
              )}
              <form>
                <FormLayout hasMargin>
                  <InputWrap>
                    <InputGroup {...register('companyName')} type="email" label="Company Name" />
                    {errors.companyName?.message && <InputError message={errors.companyName.message} />}
                  </InputWrap>
                  <InputWrap>
                    <InputGroup {...register('vendorName')} type="email" label="Opayo Vendor Name" />
                    {errors.vendorName?.message && <InputError message={errors.vendorName.message} />}
                  </InputWrap>
                  <InputWrapMed>
                    <InputGroup {...register('logoUri')} type="email" label="Email Logo Url" />
                    {errors.logoUri?.message && <InputError message={errors.logoUri.message} />}
                  </InputWrapMed>
                  <InputWrapFull>
                    <InputGroup {...register('integrationKey')} type="email" label="Opayo Integration Key" />
                    {errors.integrationKey?.message && <InputError message={errors.integrationKey.message} />}
                  </InputWrapFull>
                  <InputWrapFull>
                    <InputGroup {...register('passKey')} type="email" label="Opayo Pass Key" />
                    {errors.passKey?.message && <InputError message={errors.passKey.message} />}
                  </InputWrapFull>
                </FormLayout>
              </form>
            </>
          )}
          <UpdateModal title="Confirm Update of Credentials">
            <PersistentNotification className={elMb7} intent="danger" isExpanded isFullWidth isInline>
              By confirming this update, you understand that your changes will take effect immediately for all users of
              the app and that you have validated that all credentials are accurate.
            </PersistentNotification>
            <ButtonGroup alignment="center">
              <Button intent="low" onClick={closeUpdateModal}>
                Cancel
              </Button>
              <Button
                intent="critical"
                disabled={isLoading}
                loading={updateLoading || createLoading}
                onClick={submitHandler}
              >
                Confirm Update
              </Button>
            </ButtonGroup>
          </UpdateModal>
          <DeleteModal title="Confirm Delete of Credentials">
            <PersistentNotification className={elMb7} intent="danger" isExpanded isFullWidth isInline>
              By confirming deletion of your credentials, you understand that your changes will take effect immediately
              and that the app will no longer function for all users.
            </PersistentNotification>
            <ButtonGroup alignment="center">
              <Button intent="low" onClick={closeDeleteModal}>
                Cancel
              </Button>
              <Button intent="danger" disabled={isLoading} loading={deleteLoading} onClick={deleteHandler}>
                Confirm Delete
              </Button>
            </ButtonGroup>
          </DeleteModal>
        </ErrorBoundary>
      </PageContainer>
    </>
  )
}

export default AdminPage
