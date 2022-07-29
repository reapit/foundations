import React, { Dispatch, FC, SetStateAction, useEffect, useMemo, useState } from 'react'
import {
  BodyText,
  Button,
  ButtonGroup,
  elMb11,
  FormLayout,
  InputGroup,
  InputWrapFull,
  Loader,
  Pagination,
  PersistentNotification,
  Table,
  Title,
  useModal,
} from '@reapit/elements'
import { SendFunction, useReapitGet, useReapitUpdate } from '@reapit/utils-react'
import {
  AppSummaryModelPagedResult,
  InstallationModelPagedResult,
  TerminateInstallationModel,
} from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions, isTruthy, UpdateActionNames, updateActions } from '@reapit/utils-common'
import dayjs from 'dayjs'
import { useReapitConnect } from '@reapit/connect-session'
import { openNewPage } from '../../utils/navigation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, SchemaOf, string } from 'yup'
import { specialCharsTest } from '../../utils/yup'

export interface InstallationDetails {
  installationId: string
  appId: string
}

const uninstallAppSchema: SchemaOf<TerminateInstallationModel> = object().shape({
  appId: string(),
  terminatedBy: string(),
  terminatedReason: string().trim().required().min(10, 'Must be a minimum of 10 characters').test(specialCharsTest),
  terminatesOn: string().trim().required(),
})

export const handleUninstallApp =
  (
    email: string,
    uninstallApp: SendFunction<TerminateInstallationModel, boolean | null>,
    setInstallationDetails: Dispatch<SetStateAction<InstallationDetails | null>>,
    appId?: string,
  ) =>
  (values: TerminateInstallationModel) => {
    if (appId) {
      uninstallApp({
        ...values,
        appId,
        terminatedBy: email,
      })
      setInstallationDetails(null)
    }
  }

export const handleUninstallSuccess =
  (refetchInstallations: () => void, closeModal: () => void, success?: boolean) => () => {
    if (success) {
      refetchInstallations()
      closeModal()
    }
  }

export const handleSetInstallationDetails =
  (
    setInstallationDetails: Dispatch<SetStateAction<InstallationDetails | null>>,
    openModal: () => void,
    installationId?: string,
    appId?: string,
  ) =>
  () => {
    if (installationId && appId) {
      setInstallationDetails({ installationId, appId })
      openModal()
    }
  }

export const getAppIds = (installations: InstallationModelPagedResult | null) => () =>
  installations?.data?.map((installation) => installation.appId).filter(isTruthy)

export const SettingsInstalled: FC = () => {
  const [installationDetails, setInstallationDetails] = useState<null | InstallationDetails>(null)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { Modal, openModal, closeModal } = useModal()
  const clientId = connectSession?.loginIdentity.clientId
  const email = connectSession?.loginIdentity.email ?? ''

  const [installations, installationsLoading, , refetchInstallations] = useReapitGet<InstallationModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getInstallations],
    queryParams: {
      pageNumber,
      pageSize: 12,
      clientId,
    },
    fetchWhenTrue: [clientId],
  })

  const [, , uninstallApp, uninstallSuccess] = useReapitUpdate<TerminateInstallationModel, null>({
    reapitConnectBrowserSession,
    action: updateActions(window.reapit.config.appEnv)[UpdateActionNames.terminateInstallation],
    uriParams: {
      installationId: installationDetails?.installationId,
    },
  })

  const appIds = useMemo(getAppIds(installations), [installations])

  const [apps] = useReapitGet<AppSummaryModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions(window.reapit.config.appEnv)[GetActionNames.getApps],
    queryParams: {
      id: [...new Set(appIds)],
    },
    fetchWhenTrue: [appIds],
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TerminateInstallationModel>({
    resolver: yupResolver(uninstallAppSchema),
    defaultValues: {
      terminatedBy: '',
      terminatedReason: '',
      terminatesOn: new Date().toISOString(),
    },
  })

  useEffect(handleUninstallSuccess(refetchInstallations, closeModal, uninstallSuccess), [uninstallSuccess])

  return (
    <>
      <Title>Installations</Title>
      {installationsLoading ? (
        <Loader />
      ) : installations?.totalCount ? (
        <>
          <BodyText hasGreyText hasSectionMargin>
            The table below gives you the information about Reapit AppMarket apps and integrations you have installed
            currently or previously. In addition, you can uninstall apps for all users of your organisation by using the
            call to action on each row. For more information on the installations table
            <a onClick={openNewPage('')}> see here</a>.
          </BodyText>
          <Table
            numberColumns={7}
            className={elMb11}
            rows={installations?.data?.map(
              ({ client, created, installedBy, terminatesOn, uninstalledBy, appId, id }) => {
                const appName = apps?.data?.find(({ id }) => id === appId)?.name
                return {
                  cells: [
                    {
                      label: 'App Name',
                      value: appName ?? '',
                      icon: 'appInfographic',
                      cellHasDarkText: true,
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                    {
                      label: 'Customer Code',
                      value: client ?? '',
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                    {
                      label: 'Date Installed',
                      value: dayjs(created).format('DD-MM-YYYY'),
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                    {
                      label: 'Installed By',
                      value: (
                        <a
                          href={`mailto:${installedBy}?subject=Installation%20of%20${appName}%20in%20the%20Reapit%20AppMarket`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {installedBy}
                        </a>
                      ),
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                    {
                      label: 'Date Uninstalled',
                      value: terminatesOn ? dayjs(terminatesOn).format('DD-MM-YYYY') : '-',
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                    {
                      label: 'Uninstalled By',
                      value: uninstalledBy ? (
                        <a
                          href={`mailto:${uninstalledBy}?subject=Uninstallation%20of%20${appName}%20in%20the%20Reapit%20AppMarket`}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {uninstalledBy}
                        </a>
                      ) : (
                        '-'
                      ),
                      narrowTable: {
                        showLabel: true,
                      },
                    },
                  ],
                  ctaContent: {
                    headerContent: 'Uninstall',
                    icon: terminatesOn ? undefined : 'trashSystem',
                    onClick: terminatesOn
                      ? undefined
                      : handleSetInstallationDetails(setInstallationDetails, openModal, id, appId),
                    cellContent: terminatesOn ? '-' : undefined,
                  },
                }
              },
            )}
          />
          <Pagination
            callback={setPageNumber}
            currentPage={pageNumber}
            numberPages={Math.ceil((installations?.totalCount ?? 1) / 12)}
          />
          <Modal title="Confirm Uninstallation">
            <BodyText>Please provide a reason for terminating this installation</BodyText>
            <form
              onSubmit={handleSubmit(
                handleUninstallApp(email, uninstallApp, setInstallationDetails, installationDetails?.appId),
              )}
            >
              <FormLayout hasMargin>
                <InputWrapFull>
                  <InputGroup
                    label="Uninstallation Reason"
                    type="text"
                    {...register('terminatedReason')}
                    inputAddOnText={errors.terminatedReason?.message}
                    intent="danger"
                  />
                </InputWrapFull>
              </FormLayout>
              <ButtonGroup alignment="right">
                <Button intent="low" type="button" onClick={closeModal}>
                  Close
                </Button>
                <Button intent="danger" type="submit">
                  Uninstall
                </Button>
              </ButtonGroup>
            </form>
          </Modal>
        </>
      ) : installations ? (
        <PersistentNotification intent="secondary" isExpanded isFullWidth isInline>
          No installations for the application.
        </PersistentNotification>
      ) : null}
    </>
  )
}

export default SettingsInstalled
