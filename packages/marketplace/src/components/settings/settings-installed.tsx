import React, { Dispatch, FC, SetStateAction, useCallback, useEffect, useState } from 'react'
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
import { SendFunction, useReapitGet, useReapitUpdate } from '@reapit/use-reapit-data'
import { InstallationModelPagedResult, TerminateInstallationModel } from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../../core/connect-session'
import { GetActionNames, getActions, UpdateActionNames, updateActions } from '@reapit/use-reapit-data'
import dayjs from 'dayjs'
import { useReapitConnect } from '@reapit/connect-session'
import { openNewPage } from '../../utils/navigation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, SchemaOf, string } from 'yup'
import { specialCharsTest } from '../../utils/yup'
import { selectIsAdmin, selectIsDeveloper } from '../../utils/auth'
import { trackEventHandler, trackEvent } from '../../core/analytics'
import { TrackingEvent } from '../../core/analytics-events'
import { FilterForm } from './filter-form'
import { isTruthy } from '@reapit/utils-common'

export interface InstallationDetails {
  installationId: string
  appId: string
  appName: string
}

export interface InstallationsFilters {
  appName?: string
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
    appName?: string,
  ) =>
  async (values: TerminateInstallationModel) => {
    if (appId) {
      const uninstallation = await uninstallApp({
        ...values,
        appId,
        terminatedBy: email,
      })

      if (uninstallation) {
        trackEvent(TrackingEvent.UninstallationSuccess, true, { appId, email, appName })
      } else {
        trackEvent(TrackingEvent.UninstallationFailed, true, { appId, email, appName })
      }
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
    appName?: string,
    installationId?: string,
    appId?: string,
  ) =>
  () => {
    if (installationId && appId && appName) {
      trackEvent(TrackingEvent.ClickUninstallApp, true, { appName })
      setInstallationDetails({ installationId, appId, appName })
      openModal()
    }
  }

export const getAppIds = (installations: InstallationModelPagedResult | null) => () =>
  installations?.data?.map((installation) => installation.appId).filter(isTruthy)

export const handleCloseModal =
  (closeModal: () => void, installationDetails: InstallationDetails | null, clientId?: string | null, email?: string) =>
  () => {
    const appName = installationDetails?.appName
    trackEvent(TrackingEvent.ClickCloseWithoutInstalling, true, { appName, clientId, email })

    closeModal()
  }

export const SettingsInstalled: FC = () => {
  const [installationDetails, setInstallationDetails] = useState<null | InstallationDetails>(null)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [installationsFilters, setInstallationsFilters] = useState<InstallationsFilters>({})
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { Modal, openModal, closeModal } = useModal()
  const clientId = connectSession?.loginIdentity.clientId
  const developerId = connectSession?.loginIdentity.developerId
  const email = connectSession?.loginIdentity.email ?? ''
  const isDevOrAdmin = selectIsAdmin(connectSession) || selectIsDeveloper(connectSession)
  const { appName } = installationsFilters
  const appNameQuery = appName ? { appName } : {}
  const developerIdQuery = clientId === 'SBOX' && developerId ? { developerId } : {}

  const [installations, installationsLoading, , refetchInstallations] = useReapitGet<InstallationModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getInstallations],
    queryParams: {
      pageNumber,
      pageSize: 12,
      clientId,
      ...appNameQuery,
      ...developerIdQuery,
    },
    fetchWhenTrue: [clientId],
  })

  const [, , uninstallApp, uninstallSuccess] = useReapitUpdate<TerminateInstallationModel, null>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.terminateInstallation],
    uriParams: {
      installationId: installationDetails?.installationId,
    },
  })

  const installedAppName = installations?.data?.find(
    (installation) => installation.id === installationDetails?.installationId,
  )?.appName

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

  useEffect(trackEventHandler(TrackingEvent.LoadSettingsInstalled, true), [])

  const closeUninstallModal = useCallback(handleCloseModal(closeModal, installationDetails, clientId, email), [
    installationDetails,
    connectSession,
  ])

  if (!isDevOrAdmin) {
    return (
      <PersistentNotification intent="danger" isExpanded isFullWidth isInline>
        You do not have permission to view this page.
      </PersistentNotification>
    )
  }

  return (
    <>
      <Title>Installations</Title>
      <BodyText hasGreyText>
        The table below gives you the information about Reapit AppMarket apps and integrations you have installed
        currently or previously. In addition, you can uninstall apps for all users of your organisation by using the
        call to action on each row. For more information on the installations table{' '}
        <a
          onClick={openNewPage(
            'https://reapit.atlassian.net/wiki/spaces/RW/pages/2875523105/Use+AppMarket+to+browse+install+uninstall+apps#Uninstall-an-app',
          )}
        >
          see here
        </a>
        .
      </BodyText>
      <FilterForm setInstallationsFilters={setInstallationsFilters} />
      {installationsLoading ? (
        <Loader />
      ) : installations?.totalCount ? (
        <>
          <Table
            numberColumns={7}
            className={elMb11}
            rows={installations?.data?.map(
              ({ client, created, installedBy, terminatesOn, uninstalledBy, appId, id, appName }) => {
                return {
                  cells: [
                    {
                      label: 'App Name',
                      value: appName ?? '',
                      icon: 'mobile',
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
                    icon: terminatesOn ? undefined : 'trash',
                    onClick: terminatesOn
                      ? undefined
                      : handleSetInstallationDetails(setInstallationDetails, openModal, appName, id, appId),
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
                handleUninstallApp(
                  email,
                  uninstallApp,
                  setInstallationDetails,
                  installationDetails?.appId,
                  installedAppName,
                ),
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
                <Button intent="default" type="button" onClick={closeUninstallModal}>
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
        <PersistentNotification intent="primary" isExpanded isFullWidth isInline>
          No installations for the application.
        </PersistentNotification>
      ) : null}
    </>
  )
}

export default SettingsInstalled
