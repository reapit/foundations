import React, { Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import {
  AppDetailModel,
  InstallationModel,
  InstallationModelPagedResult,
  TerminateInstallationModel,
} from '@reapit/foundations-ts-definitions'
import useSWR from 'swr'
import AppInstallationSection from './app-installation-section'
import AppInstallationConfirmationModal, { MetaDataType } from './app-installation-confirmation-modal'
import AppUninstallationSection from './app-uninstallation-section'
import { URLS } from '../../../constants/api'
import { bulkInstall, installOrg, uninstallOrg } from '../../../services/installation'
import { useModal, useSnack } from '@reapit/elements'
import { useOrgId } from '../../../utils/use-org-id'
import { useReapitConnect } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '../../../core/connect-session'

export interface AppInstallationManagerProps {
  app: AppDetailModel
}

export interface TerminationParams {
  body: TerminateInstallationModel
  installationId: string
}

export const TERMINATION_REASON = 'Terminated from Marketplace Management App'
export const SPECIFIC_OFFICE_GROUPS = 'SPECIFIC_OFFICE_GROUPS'
export const WHOLE_ORG = 'WHOLE_ORG'
export type InstallTypes = 'SPECIFIC_OFFICE_GROUPS' | 'WHOLE_ORG' | null

export const getInstallationsForWholeOrg = (
  installations: InstallationModel[],
  clientIdFirstPart: string,
  terminatedBy: string,
): TerminationParams[] => {
  return installations
    .filter((installation) => installation?.client === clientIdFirstPart)
    .map(
      ({ id, appId }) =>
        ({
          installationId: id,
          body: {
            appId,
            terminatedReason: TERMINATION_REASON,
            terminatedBy,
          },
        } as TerminationParams),
    )
}

export const getInstallationsForOfficeGroups = (
  installations: InstallationModel[],
  clientIdFirstPart: string,
): (string | undefined)[] => {
  return installations
    .filter((installation) => installation?.client?.startsWith(`${clientIdFirstPart}-`))
    .map((installation) => installation.client)
    .filter((client) => !!client)
}

export const getClientIdFirstPart = (clientId: string | null) => {
  return clientId ? clientId.split('-')[0] : ''
}

export const handleSetInstallTypes =
  (
    orgClientId: string | null,
    email: string,
    initialAppInstallationType: InstallTypes,
    installations: InstallationModel[],
    setInitialAppInstallationType: Dispatch<SetStateAction<InstallTypes>>,
    setAppInstallationType: Dispatch<SetStateAction<InstallTypes>>,
  ) =>
  () => {
    if (orgClientId && !initialAppInstallationType) {
      const clientIdFirstPart = getClientIdFirstPart(orgClientId)
      const installedForWholeOrg = getInstallationsForWholeOrg(installations, clientIdFirstPart, email).length > 0
      const installedForGroups = getInstallationsForOfficeGroups(installations, clientIdFirstPart).length > 0

      if (installedForWholeOrg) {
        setInitialAppInstallationType(WHOLE_ORG)
        setAppInstallationType(WHOLE_ORG)
      } else if (installedForGroups) {
        setInitialAppInstallationType(SPECIFIC_OFFICE_GROUPS)
        setAppInstallationType(SPECIFIC_OFFICE_GROUPS)
      }
    }
  }

export const handleOnCheckboxChange =
  (
    setAppInstallationType: Dispatch<SetStateAction<InstallTypes>>,
    setOfficeGroupsToAdd: Dispatch<SetStateAction<string[]>>,
    setOfficeGroupsToRemove: Dispatch<SetStateAction<string[]>>,
  ) =>
  (installType: InstallTypes) => {
    setAppInstallationType(installType)
    if (installType === WHOLE_ORG) {
      setOfficeGroupsToAdd([])
      setOfficeGroupsToRemove([])
    }
  }

export const handleModalConfirmation =
  (
    performCompleteUninstall: boolean,
    orgClientId: string | null,
    email: string,
    installations: InstallationModel[],
    app: AppDetailModel,
    appInstallationType: InstallTypes,
    initialAppInstallationType: InstallTypes,
    officeGroupsToRemove: string[],
    officeGroupsToAdd: string[],
    setAppInstallationType: Dispatch<SetStateAction<InstallTypes>>,
    setOfficeGroupsToAdd: Dispatch<SetStateAction<string[]>>,
    setOfficeGroupsToRemove: Dispatch<SetStateAction<string[]>>,
    setInitialAppInstallationType: Dispatch<SetStateAction<InstallTypes>>,
    setPerformCompleteUninstall: Dispatch<SetStateAction<boolean>>,
    revalidateInstallations: () => void,
    success: (message: string) => void,
    closeModal: () => void,
  ) =>
  async (metadataArray: MetaDataType) => {
    const clientIdFirstPart = getClientIdFirstPart(orgClientId)
    const metadata = metadataArray.length ? { metadata: metadataArray } : {}

    try {
      if (performCompleteUninstall) {
        const groupInstalls = getInstallationsForOfficeGroups(installations, clientIdFirstPart)
        const orgInstalls = getInstallationsForWholeOrg(installations, clientIdFirstPart, email)
        // install for noone, and remove for the office groups and the whole org
        if (orgInstalls.length) {
          await Promise.all(
            orgInstalls.map(async ({ body, installationId }) => await uninstallOrg(body, installationId)),
          )
        }

        if (groupInstalls.length) {
          await bulkInstall([], groupInstalls, app.id, metadata)
        }
        // set the various states back to default
        setAppInstallationType(null)
        setInitialAppInstallationType(null)
        setOfficeGroupsToAdd([])
        setOfficeGroupsToRemove([])
        setPerformCompleteUninstall(false)
      } else if (appInstallationType === WHOLE_ORG) {
        const installsToRemove = getInstallationsForOfficeGroups(installations, clientIdFirstPart)
        // install for the whole org,
        await installOrg({ appId: app.id, clientId: clientIdFirstPart, approvedBy: email, ...metadata })
        //remove for the office groups
        await bulkInstall([], installsToRemove, app.id, metadata)
        // update the initialAppInstallationType - ensures the button is re-disabled
        setInitialAppInstallationType(WHOLE_ORG)
      } else if (appInstallationType === SPECIFIC_OFFICE_GROUPS) {
        // if the app is currently installed for the whole org, ensure it becomes uninstalled for the whole org
        const uninstallFor = [...officeGroupsToRemove]
        const orgInstalls = getInstallationsForWholeOrg(installations, clientIdFirstPart, email)
        // install for noone, and remove for the office groups and the whole org
        if (initialAppInstallationType === WHOLE_ORG && orgInstalls.length) {
          await Promise.all(
            orgInstalls.map(async ({ body, installationId }) => await uninstallOrg(body, installationId)),
          )
        }
        // use the bulk install/uninstall endpoint
        await bulkInstall(officeGroupsToAdd, uninstallFor, app.id, metadata)
        // update the initialAppInstallationType and clear the changes made - ensures the button is re-disabled
        setInitialAppInstallationType(SPECIFIC_OFFICE_GROUPS)
        setOfficeGroupsToAdd([])
        setOfficeGroupsToRemove([])
      }

      // refetch the installations endpoint, so everything is up to date
      revalidateInstallations()

      // show the toast

      success('Changes have been saved successfully')
    } finally {
      // close the confirmation modal
      closeModal()
    }
  }

const AppInstallationManager: FC<AppInstallationManagerProps> = ({ app }: AppInstallationManagerProps) => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [initialAppInstallationType, setInitialAppInstallationType] = useState<InstallTypes>(null)
  const [appInstallationType, setAppInstallationType] = useState<InstallTypes>(null)
  const [officeGroupsToAdd, setOfficeGroupsToAdd] = useState<string[]>([])
  const [officeGroupsToRemove, setOfficeGroupsToRemove] = useState<string[]>([])
  const [performCompleteUninstall, setPerformCompleteUninstall] = useState<boolean>(false)
  const { success } = useSnack()
  const { Modal, openModal, closeModal } = useModal()
  const {
    orgIdState: { orgClientId },
  } = useOrgId()

  const {
    data,
    isValidating: installationsValidating,
    mutate: revalidateInstallations,
  } = useSWR<InstallationModelPagedResult>(`${URLS.INSTALLATIONS}/?AppId=${app.id}&IsInstalled=true&pageSize=999`)

  const installations = data?.data ?? []
  const email = connectSession?.loginIdentity.email ?? ''

  useEffect(
    handleSetInstallTypes(
      orgClientId,
      email,
      initialAppInstallationType,
      installations,
      setInitialAppInstallationType,
      setAppInstallationType,
    ),
    [orgClientId, initialAppInstallationType, installations],
  )

  return (
    <>
      <AppUninstallationSection
        installations={installations}
        clientId={orgClientId}
        setShowConfirmModal={openModal}
        setPerformCompleteUninstall={setPerformCompleteUninstall}
      />
      <AppInstallationSection
        initialAppInstallationType={initialAppInstallationType}
        appInstallationType={appInstallationType}
        onCheckboxChange={handleOnCheckboxChange(setAppInstallationType, setOfficeGroupsToAdd, setOfficeGroupsToRemove)}
        installations={installations}
        officeGroupsToAdd={officeGroupsToAdd}
        officeGroupsToRemove={officeGroupsToRemove}
        setOfficeGroupsToAdd={setOfficeGroupsToAdd}
        setOfficeGroupsToRemove={setOfficeGroupsToRemove}
        installationsValidating={installationsValidating}
        setShowConfirmModal={openModal}
      />
      <Modal title={`${app.name} App ${performCompleteUninstall ? 'Uninstall' : 'Install'}`}>
        <AppInstallationConfirmationModal
          app={app}
          installFor={officeGroupsToAdd}
          uninstallFor={officeGroupsToRemove}
          appInstallationType={appInstallationType}
          onConfirm={handleModalConfirmation(
            performCompleteUninstall,
            orgClientId,
            email,
            installations,
            app,
            appInstallationType,
            initialAppInstallationType,
            officeGroupsToRemove,
            officeGroupsToAdd,
            setAppInstallationType,
            setOfficeGroupsToAdd,
            setOfficeGroupsToRemove,
            setInitialAppInstallationType,
            setPerformCompleteUninstall,
            revalidateInstallations,
            success,
            closeModal,
          )}
          onClose={closeModal}
          performCompleteUninstall={performCompleteUninstall}
        />
      </Modal>
    </>
  )
}

export default AppInstallationManager
