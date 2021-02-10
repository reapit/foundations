import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { AppSummaryModel, InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'
import { Section, H5, FlexContainerBasic, Button } from '@reapit/elements'
import useSWR from 'swr'
import AppInstallationPerOfficeGroup from './app-installation-per-office-group'
import AppInstallationConfirmationModal from './app-installation-confirmation-modal'
import AppUninstallationSection from './app-uninstallation-section'
import { URLS } from '../../../constants/api'
import { clientIdEffectHandler } from '../../../utils/client-id-effect-handler'
import { bulkInstall } from '../../../services/installation'
import { notification } from '@reapit/elements'

export interface AppInstallationManagerProps {
  app: AppSummaryModel
}

export const SPECIFIC_OFFICE_GROUPS = 'SPECIFIC_OFFICE_GROUPS'
export const WHOLE_ORG = 'WHOLE_ORG'

export type InstallTypes = 'SPECIFIC_OFFICE_GROUPS' | 'WHOLE_ORG' | '' | null

export const allowSubmit = (
  appInstallationType: InstallTypes,
  officeGroupsToAdd: string[],
  officeGroupsToRemove: string[],
  initialAppInstallationType: InstallTypes,
): boolean => {
  return appInstallationType === SPECIFIC_OFFICE_GROUPS
    ? !!officeGroupsToAdd.length || !!officeGroupsToRemove.length
    : appInstallationType !== initialAppInstallationType
}

export const getInstallationsForWholeOrg = (
  installations: InstallationModelPagedResult | undefined,
  clientIdFirstPart: string,
): (string | undefined)[] => {
  if (!installations?.data) return []
  return installations.data
    .filter(installation => installation?.client === clientIdFirstPart)
    .map(installation => installation.client)
    .filter(client => !!client)
}

export const getInstallationsForOfficeGroups = (
  installations: InstallationModelPagedResult | undefined,
  clientIdFirstPart: string,
): (string | undefined)[] => {
  if (!installations?.data) return []
  return installations.data
    .filter(installation => installation?.client?.startsWith(`${clientIdFirstPart}-`))
    .map(installation => installation.client)
    .filter(client => !!client)
}

export const getClientIdFirstPart = (clientId: string | null) => {
  return clientId ? clientId.split('-')[0] : ''
}

const AppInstallationManager: React.FC<AppInstallationManagerProps> = ({ app }: AppInstallationManagerProps) => {
  const [initialAppInstallationType, setInitialAppInstallationType] = useState<InstallTypes>(null)
  const [appInstallationType, setAppInstallationType] = useState<InstallTypes>('')
  const [officeGroupsToAdd, setOfficeGroupsToAdd] = useState<string[]>([])
  const [officeGroupsToRemove, setOfficeGroupsToRemove] = useState<string[]>([])
  const [clientId, setClientId] = useState<string | null>(null)
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)
  const [performCompleteUninstall, setPerformCompleteUninstall] = useState<boolean>(false)

  useEffect(clientIdEffectHandler(clientId, setClientId), [])

  const { data: installations, isValidating: installationsValidating, revalidate: revalidateInstallations } = useSWR<
    InstallationModelPagedResult
  >(`${URLS.INSTALLATIONS}/?AppId=${app.id}&IsInstalled=true&pageSize=999`)

  if (clientId && installations?.data && initialAppInstallationType === null) {
    const clientIdFirstPart = getClientIdFirstPart(clientId)
    const installedForWholeOrg = installations.data.some(installation => installation.client === clientIdFirstPart)
    const installedForOfficeGroups = installations.data.some(installation =>
      installation?.client?.startsWith(`${clientIdFirstPart}-`),
    )

    if (installedForWholeOrg) {
      setInitialAppInstallationType(WHOLE_ORG)
      setAppInstallationType(WHOLE_ORG)
    } else if (installedForOfficeGroups) {
      setInitialAppInstallationType(SPECIFIC_OFFICE_GROUPS)
      setAppInstallationType(SPECIFIC_OFFICE_GROUPS)
    } else {
      setInitialAppInstallationType('')
      setAppInstallationType('')
    }
  }

  const submitButtonEnabled = allowSubmit(
    appInstallationType,
    officeGroupsToAdd,
    officeGroupsToRemove,
    initialAppInstallationType,
  )

  const handleOnCheckboxChange = (
    setAppInstallationType: Dispatch<SetStateAction<InstallTypes>>,
    appInstallationType: InstallTypes,
  ) => async () => {
    setAppInstallationType(appInstallationType)
    if (appInstallationType === WHOLE_ORG) {
      setOfficeGroupsToAdd([])
      setOfficeGroupsToRemove([])
    }
  }

  const handleModalConfirmation = async () => {
    const clientIdFirstPart = getClientIdFirstPart(clientId)

    try {
      if (performCompleteUninstall) {
        const installsToRemove = [
          ...getInstallationsForOfficeGroups(installations, clientIdFirstPart),
          ...getInstallationsForWholeOrg(installations, clientIdFirstPart),
        ]
        // install for noone, and remove for the office groups and the whole org
        await bulkInstall([], installsToRemove, app.id)
        // set the various states back to default
        setAppInstallationType('')
        setInitialAppInstallationType('')
        setOfficeGroupsToAdd([])
        setOfficeGroupsToRemove([])
        setPerformCompleteUninstall(false)
      } else if (appInstallationType === WHOLE_ORG) {
        const installsToRemove = getInstallationsForOfficeGroups(installations, clientIdFirstPart)
        // install for the whole org, and remove for the office groups
        await bulkInstall([clientIdFirstPart], installsToRemove, app.id)
        // update the initialAppInstallationType - ensures the button is re-disabled
        setInitialAppInstallationType(WHOLE_ORG)
      } else if (appInstallationType === SPECIFIC_OFFICE_GROUPS) {
        // if the app is currently installed for the whole org, ensure it becomes uninstalled for the whole org
        const uninstallFor = [...officeGroupsToRemove]
        if (initialAppInstallationType === WHOLE_ORG) uninstallFor.push(clientIdFirstPart)
        // use the bulk install/uninstall endpoint
        await bulkInstall(officeGroupsToAdd, uninstallFor, app.id)
        // update the initialAppInstallationType and clear the changes made - ensures the button is re-disabled
        setInitialAppInstallationType(SPECIFIC_OFFICE_GROUPS)
        setOfficeGroupsToAdd([])
        setOfficeGroupsToRemove([])
      }

      // refetch the installations endpoint, so everything is up to date
      revalidateInstallations()

      // show the toast
      notification.success({
        message: 'Changes have been saved successfully',
        placement: 'bottomRight',
      })
    } finally {
      // close the confirmation modal
      setShowConfirmModal(false)
    }
  }

  return (
    <>
      <AppUninstallationSection
        installations={installations}
        clientId={clientId}
        setShowConfirmModal={setShowConfirmModal}
        setPerformCompleteUninstall={setPerformCompleteUninstall}
      />
      <Section>
        <FlexContainerBasic className="justify-between items-center mb-4">
          <H5>Installation</H5>
          <Button variant="primary" disabled={!submitButtonEnabled} onClick={() => setShowConfirmModal(true)}>
            Install
          </Button>
        </FlexContainerBasic>
        <p className="mb-4">
          <i>Please select the type of installation you require for this app:</i>
        </p>
        <div className="field field-checkbox mb-0 control">
          <input
            className="checkbox"
            type="checkbox"
            id={`${app.id}-${WHOLE_ORG}`}
            checked={appInstallationType === WHOLE_ORG}
            onChange={handleOnCheckboxChange(setAppInstallationType, WHOLE_ORG)}
          />
          <label className="label" htmlFor={`${app.id}-${WHOLE_ORG}`}>
            Install for the whole of your organisation
          </label>
          <div className="form-subheading mb-4">
            <i>This will grant the app access to all data for all users and offices across your organisation</i>
          </div>
        </div>
        <div className="field field-checkbox mb-0 control">
          <input
            className="checkbox"
            type="checkbox"
            id={`${app.id}-${SPECIFIC_OFFICE_GROUPS}`}
            checked={appInstallationType === SPECIFIC_OFFICE_GROUPS}
            onChange={handleOnCheckboxChange(setAppInstallationType, SPECIFIC_OFFICE_GROUPS)}
          />
          <label className="label" htmlFor={`${app.id}-${SPECIFIC_OFFICE_GROUPS}`}>
            Install for specific office groups
          </label>
          <div className="form-subheading mb-4">
            <i>This will grant the app access to only data for the specific offices inside of each office group</i>
          </div>
        </div>

        {appInstallationType === SPECIFIC_OFFICE_GROUPS && !installationsValidating && (
          <AppInstallationPerOfficeGroup
            installations={installations}
            officeGroupsToAdd={officeGroupsToAdd}
            officeGroupsToRemove={officeGroupsToRemove}
            setOfficeGroupsToAdd={setOfficeGroupsToAdd}
            setOfficeGroupsToRemove={setOfficeGroupsToRemove}
          />
        )}

        <AppInstallationConfirmationModal
          app={app}
          visible={showConfirmModal}
          installFor={officeGroupsToAdd}
          uninstallFor={officeGroupsToRemove}
          appInstallationType={appInstallationType}
          onConfirm={handleModalConfirmation}
          onClose={() => setShowConfirmModal(false)}
          performCompleteUninstall={performCompleteUninstall}
        />
      </Section>
    </>
  )
}

export default AppInstallationManager
