import React, { Dispatch, SetStateAction, useState, useEffect } from 'react'
import { AppSummaryModel, InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'
import { Section, H5, FlexContainerBasic, Button } from '@reapit/elements'
import useSWR from 'swr'
import AppInstallationPerOfficeGroup from './app-installation-per-office-group'
import AppInstallationConfirmationModal from './app-installation-confirmation-modal'
import * as styles from '../__styles__'
import { URLS } from '../../../constants/api'
import { clientIdEffectHandler } from '../../../utils/client-id-effect-handler'
import { bulkInstall } from '../../../services/installation'
import { notification } from '@reapit/elements'

export interface AppInstallationManagerProps {
  app: AppSummaryModel
}

export const SPECIFIC_OFFICE_GROUPS = 'SPECIFIC_OFFICE_GROUPS'
export const WHOLE_ORG = 'WHOLE_ORG'

const AppInstallationManager: React.FC<AppInstallationManagerProps> = ({ app }: AppInstallationManagerProps) => {
  const [initialAppInstallationType, setInitialAppInstallationType] = useState<string>('')
  const [appInstallationType, setAppInstallationType] = useState<string>('')
  const [officeGroupsToAdd, setOfficeGroupsToAdd] = useState<string[]>([])
  const [officeGroupsToRemove, setOfficeGroupsToRemove] = useState<string[]>([])
  const [clientId, setClientId] = useState<string | null>(null)
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false)

  useEffect(clientIdEffectHandler(clientId, setClientId), [])

  const { data: installations, isValidating: installationsValidating, revalidate: revalidateInstallations } = useSWR<
    InstallationModelPagedResult
  >(`${URLS.INSTALLATIONS}/?AppId=${app.id}&IsInstalled=true`)

  if (clientId && installations?.data && !initialAppInstallationType) {
    const clientIdFirstPart = clientId.split('-')[0]
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
    }
  }

  const submitButtonEnabled =
    appInstallationType === SPECIFIC_OFFICE_GROUPS
      ? !!officeGroupsToAdd.length || !!officeGroupsToRemove.length
      : appInstallationType !== initialAppInstallationType

  const handleOnCheckboxChange = (
    setAppInstallationType: Dispatch<SetStateAction<string>>,
    appInstallationType: string,
  ) => async () => {
    setAppInstallationType(appInstallationType)
    if (appInstallationType === WHOLE_ORG) {
      setOfficeGroupsToAdd([])
      setOfficeGroupsToRemove([])
    }
  }

  const handleInstallConfirmation = async () => {
    const clientIdFirstPart = clientId ? clientId.split('-')[0] : ''

    try {
      if (appInstallationType === WHOLE_ORG) {
        // install for the whole org
        await bulkInstall([clientIdFirstPart], [], app.id)
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

      // refetch the installations endpoint, so the office groups table is to date
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
    <Section>
      <FlexContainerBasic className={styles.flexContainerSpaceBettwen}>
        <H5>Installation</H5>
        <Button
          variant="primary"
          disabled={!submitButtonEnabled}
          loading={false}
          onClick={() => setShowConfirmModal(true)}
        >
          Submit
        </Button>
      </FlexContainerBasic>
      <p className="mb-4">
        <i>Please select the type of installation you require for this app:</i>
      </p>
      <div className="field field-checkbox mb-0 control">
        <input
          className="checkbox"
          type="radio"
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
          type="radio"
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
        onConfirm={handleInstallConfirmation}
        onClose={() => setShowConfirmModal(false)}
      />
    </Section>
  )
}

export default AppInstallationManager
