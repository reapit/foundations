import React, { Dispatch, SetStateAction } from 'react'
import { InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'
import AppInstallationPerOfficeGroup from './app-installation-per-office-group'
import { WHOLE_ORG, SPECIFIC_OFFICE_GROUPS, InstallTypes } from './app-installation-manager'
import { Button, FlexContainer, Subtitle } from '@reapit/elements'

export interface AppInstallationSectionProps {
  initialAppInstallationType: InstallTypes
  appInstallationType: InstallTypes
  onCheckboxChange: (installType: InstallTypes) => void
  installations: InstallationModelPagedResult | undefined
  officeGroupsToAdd: string[]
  officeGroupsToRemove: string[]
  setOfficeGroupsToAdd: Dispatch<SetStateAction<string[]>>
  setOfficeGroupsToRemove: Dispatch<SetStateAction<string[]>>
  installationsValidating: boolean
  setShowConfirmModal: (state: boolean) => void
}

const AppInstallationSection: React.FC<AppInstallationSectionProps> = ({
  initialAppInstallationType,
  appInstallationType,
  onCheckboxChange,
  installations,
  officeGroupsToAdd,
  officeGroupsToRemove,
  setOfficeGroupsToAdd,
  setOfficeGroupsToRemove,
  installationsValidating,
  setShowConfirmModal,
}: AppInstallationSectionProps) => {
  const submitButtonEnabled =
    appInstallationType === SPECIFIC_OFFICE_GROUPS
      ? !!officeGroupsToAdd.length || !!officeGroupsToRemove.length
      : appInstallationType !== initialAppInstallationType

  return (
    <>
      <FlexContainer>
        <Subtitle>Installation</Subtitle>
        <Button intent="primary" disabled={!submitButtonEnabled} onClick={() => setShowConfirmModal(true)}>
          Save
        </Button>
      </FlexContainer>
      <p className="mb-4">
        <p>Please select the type of installation you require for this app:</p>
      </p>
      <div className="field field-checkbox mb-0 control">
        <input
          className="checkbox"
          type="checkbox"
          id={WHOLE_ORG}
          checked={appInstallationType === WHOLE_ORG}
          onChange={() => onCheckboxChange(WHOLE_ORG)}
        />
        <label className="label" htmlFor={WHOLE_ORG}>
          Install for the whole of your organisation
        </label>
        <div className="form-subheading mb-4">
          <p>This will grant the app access to all data for all users and offices across your organisation</p>
        </div>
      </div>
      <div className="field field-checkbox mb-0 control">
        <input
          className="checkbox"
          type="checkbox"
          id={SPECIFIC_OFFICE_GROUPS}
          checked={appInstallationType === SPECIFIC_OFFICE_GROUPS}
          onChange={() => onCheckboxChange(SPECIFIC_OFFICE_GROUPS)}
        />
        <label className="label" htmlFor={SPECIFIC_OFFICE_GROUPS}>
          Install for specific office groups
        </label>
        <div className="form-subheading mb-4">
          <p>This will grant the app access to only data for the specific offices inside of each office group</p>
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
    </>
  )
}

export default AppInstallationSection
