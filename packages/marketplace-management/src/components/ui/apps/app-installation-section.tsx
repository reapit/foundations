import React, { Dispatch, FC, SetStateAction } from 'react'
import { InstallationModel } from '@reapit/foundations-ts-definitions'
import AppInstallationPerOfficeGroup from './app-installation-per-office-group'
import { WHOLE_ORG, SPECIFIC_OFFICE_GROUPS, InstallTypes } from './app-installation-manager'
import {
  BodyText,
  Button,
  ButtonGroup,
  elMb5,
  elMb7,
  FormLayout,
  InputGroup,
  InputWrap,
  Subtitle,
} from '@reapit/elements'

export interface AppInstallationSectionProps {
  initialAppInstallationType: InstallTypes
  appInstallationType: InstallTypes
  onCheckboxChange: (installType: InstallTypes) => void
  installations: InstallationModel[]
  officeGroupsToAdd: string[]
  officeGroupsToRemove: string[]
  setOfficeGroupsToAdd: Dispatch<SetStateAction<string[]>>
  setOfficeGroupsToRemove: Dispatch<SetStateAction<string[]>>
  installationsValidating: boolean
  setShowConfirmModal: Dispatch<SetStateAction<boolean>>
}

export const handleOnCheckboxChange =
  (installType: InstallTypes, onCheckboxChange: (installType: InstallTypes) => void) => () => {
    onCheckboxChange(installType)
  }

export const handleModalOpen = (isOpen: boolean, setShowConfirmModal: Dispatch<SetStateAction<boolean>>) => () => {
  setShowConfirmModal(isOpen)
}

export const AppInstallationSection: FC<AppInstallationSectionProps> = ({
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
      <Subtitle>Installation</Subtitle>
      <BodyText hasGreyText hasSectionMargin>
        Please select the type of installation you require for this app:
      </BodyText>
      <FormLayout hasMargin>
        <InputWrap>
          <InputGroup
            className={elMb5}
            type="checkbox"
            label="Install for the whole of your organisation"
            id={WHOLE_ORG}
            checked={appInstallationType === WHOLE_ORG}
            onChange={handleOnCheckboxChange(WHOLE_ORG, onCheckboxChange)}
          />
          <BodyText>
            This will grant the app access to all data for all users and offices across your organisation
          </BodyText>
        </InputWrap>
        <InputWrap>
          <InputGroup
            className={elMb5}
            type="checkbox"
            label="Install for specific office groups"
            id={SPECIFIC_OFFICE_GROUPS}
            checked={appInstallationType === SPECIFIC_OFFICE_GROUPS}
            onChange={handleOnCheckboxChange(SPECIFIC_OFFICE_GROUPS, onCheckboxChange)}
          />
          <BodyText>
            This will grant the app access to only data for the specific offices inside of each office group
          </BodyText>
        </InputWrap>
        {appInstallationType === SPECIFIC_OFFICE_GROUPS && !installationsValidating && (
          <AppInstallationPerOfficeGroup
            installations={installations}
            setOfficeGroupsToAdd={setOfficeGroupsToAdd}
            setOfficeGroupsToRemove={setOfficeGroupsToRemove}
          />
        )}
      </FormLayout>
      <ButtonGroup className={elMb7} alignment="right">
        <Button
          intent="primary"
          size={2}
          chevronRight
          disabled={!submitButtonEnabled}
          onClick={handleModalOpen(true, setShowConfirmModal)}
        >
          Save
        </Button>
      </ButtonGroup>
    </>
  )
}

export default AppInstallationSection
