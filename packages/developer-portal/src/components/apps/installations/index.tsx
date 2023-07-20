import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import {
  BodyText,
  Button,
  ButtonGroup,
  elMb11,
  FlexContainer,
  FormLayout,
  InputGroup,
  InputWrapFull,
  Loader,
  Pagination,
  PersistentNotification,
  Table,
  Title,
  useMediaQuery,
  useModal,
} from '@reapit/elements'
import { useParams } from 'react-router-dom'
import { useAppState } from '../state/use-app-state'
import { handleSetAppId } from '../utils/handle-set-app-id'
import {
  SendFunction,
  useReapitGet,
  useReapitUpdate,
  GetActionNames,
  getActions,
  UpdateActionNames,
  updateActions,
} from '@reapit/use-reapit-data'
import {
  InstallationModelPagedResult,
  OfficeModel,
  TerminateInstallationModel,
} from '@reapit/foundations-ts-definitions'
import { reapitConnectBrowserSession } from '../../../core/connect-session'
import { combineAddress } from '@reapit/utils-common'
import dayjs from 'dayjs'
import { useReapitConnect } from '@reapit/connect-session'
import { ExternalPages, openNewPage } from '../../../utils/navigation'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { object, SchemaOf, string } from 'yup'
import errorMessages from '../../../constants/error-messages'
import { specialCharsTest } from '../../../utils/yup'
import { Helper } from '../page/helper'
import { OfficesTable } from './offices-table'

const uninstallAppSchema: SchemaOf<TerminateInstallationModel> = object().shape({
  appId: string().trim().required(errorMessages.FIELD_REQUIRED),
  terminatedBy: string(),
  terminatedReason: string()
    .trim()
    .required(errorMessages.FIELD_REQUIRED)
    .min(10, 'Must be a minimum of 10 characters')
    .test(specialCharsTest),
  terminatesOn: string().trim().required(errorMessages.FIELD_REQUIRED),
})

export const handleUninstallApp =
  (
    email: string,
    uninstallApp: SendFunction<TerminateInstallationModel, boolean | null>,
    setInstallationId: Dispatch<SetStateAction<string | null>>,
  ) =>
  async (values: TerminateInstallationModel) => {
    const uninstall = await uninstallApp({
      ...values,
      terminatedBy: email,
    })

    if (uninstall) {
      setInstallationId(null)
    }
  }

export const handleUninstallSuccess =
  (refetchInstallations: () => void, closeModal: () => void, success?: boolean) => () => {
    if (success) {
      refetchInstallations()
      closeModal()
    }
  }

export const handleSetInstallationId =
  (setInstallationId: Dispatch<SetStateAction<string | null>>, openModal: () => void, installationId?: string) =>
  () => {
    if (installationId) {
      openModal()
      setInstallationId(installationId)
    }
  }

export const handleSetOffices =
  (setOffices: Dispatch<SetStateAction<OfficeModel[] | null>>, offices: OfficeModel[]) => () => {
    setOffices(offices)
  }

export const AppInstallations: FC = () => {
  const { appId } = useParams<'appId'>()
  const { setAppId } = useAppState()
  const [installationId, setInstallationId] = useState<null | string>(null)
  const [offices, setOffices] = useState<OfficeModel[] | null>(null)
  const [pageNumber, setPageNumber] = useState<number>(1)
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const { Modal, openModal, closeModal } = useModal()
  const { Modal: ModalDocs, openModal: openModalDocs, closeModal: closeModalDocs } = useModal()
  const { isMobile } = useMediaQuery()
  const developerId = connectSession?.loginIdentity.developerId
  const email = connectSession?.loginIdentity.email ?? ''

  const [installations, installationsLoading, , refetchInstallations] = useReapitGet<InstallationModelPagedResult>({
    reapitConnectBrowserSession,
    action: getActions[GetActionNames.getInstallations],
    queryParams: {
      appId,
      pageNumber,
      pageSize: 12,
      isInstalled: true,
      developerId,
    },
    fetchWhenTrue: [developerId],
  })

  const [uninstalling, , uninstallApp, uninstallSuccess] = useReapitUpdate<TerminateInstallationModel, null>({
    reapitConnectBrowserSession,
    action: updateActions[UpdateActionNames.terminateInstallation],
    uriParams: {
      installationId,
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TerminateInstallationModel>({
    resolver: yupResolver(uninstallAppSchema),
    defaultValues: {
      appId,
      terminatedBy: '',
      terminatedReason: '',
      terminatesOn: new Date().toISOString(),
    },
  })

  useEffect(handleSetAppId(setAppId, appId), [appId])

  useEffect(handleUninstallSuccess(refetchInstallations, closeModal, uninstallSuccess), [uninstallSuccess])

  return (
    <>
      <FlexContainer isFlexJustifyBetween>
        <Title>Installations</Title>
        {isMobile && (
          <ButtonGroup alignment="right">
            <Button intent="low" onClick={openModalDocs}>
              Controls
            </Button>
          </ButtonGroup>
        )}
      </FlexContainer>
      {isMobile && (
        <ModalDocs title="Controls">
          <Helper />
          <ButtonGroup alignment="right">
            <Button fixedWidth intent="primary" onClick={closeModalDocs}>
              Close
            </Button>
          </ButtonGroup>
        </ModalDocs>
      )}
      {installationsLoading ? (
        <Loader />
      ) : installations?.totalCount ? (
        <>
          <BodyText hasGreyText hasSectionMargin>
            The table below gives you the information you need to understand Reapit Client organisations that have
            installed your application for use. In addition, you can force terminate a customer installation by using
            the call to action on each row. For more information on the installations table
            <a onClick={openNewPage(ExternalPages.installationsTableDocs)}> see here</a>.
          </BodyText>
          <Table
            className={elMb11}
            rows={installations?.data?.map(
              ({ customerName, appName, client, customerAddress, created, installedBy, id, officeGroup }) => ({
                cells: [
                  {
                    label: 'Customer Name',
                    value: customerName ?? '',
                    icon: 'flatInfographic',
                    cellHasDarkText: true,
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                  {
                    label: 'Reapit Customer Code',
                    value: client ?? '',
                    narrowTable: {
                      showLabel: true,
                    },
                  },
                  {
                    label: 'Customer Address',
                    value: combineAddress(customerAddress),
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
                        href={`mailto:${installedBy}?subject=Your%20recent%20installation%20of%20${appName}%20in%20the%20Reapit%20AppMarket`}
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
                ],
                expandableContent: {
                  content: (
                    <>
                      <ButtonGroup alignment="right">
                        {officeGroup?.offices?.length ? (
                          <Button intent="primary" onClick={handleSetOffices(setOffices, officeGroup.offices)}>
                            Show Installed Offices
                          </Button>
                        ) : null}
                        <Button
                          type="button"
                          intent="danger"
                          onClick={handleSetInstallationId(setInstallationId, openModal, id)}
                        >
                          Uninstall
                        </Button>
                      </ButtonGroup>
                      {offices && officeGroup?.offices === offices && <OfficesTable offices={offices} />}
                    </>
                  ),
                },
              }),
            )}
          />
          <Pagination
            callback={setPageNumber}
            currentPage={pageNumber}
            numberPages={Math.ceil((installations?.totalCount ?? 1) / 12)}
          />
          <Modal title="Confirm Uninstallation">
            <BodyText>Please provide a reason for terminating this installation</BodyText>
            <form onSubmit={handleSubmit(handleUninstallApp(email, uninstallApp, setInstallationId))}>
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
                <Button disabled={uninstalling} loading={uninstalling} intent="danger" type="submit">
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

export default AppInstallations
