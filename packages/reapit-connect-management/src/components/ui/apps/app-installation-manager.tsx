import React, { Dispatch, SetStateAction, useState } from 'react'
import { AppSummaryModel, InstallationModelPagedResult } from '@reapit/foundations-ts-definitions'
import { Section, H5, FlexContainerBasic, Button } from '@reapit/elements'
import useSWR from 'swr'
import AppInstallationPerOfficeGroup from './app-installation-per-office-group'
import * as styles from '../__styles__'
import { URLS } from '../../../constants/api'

export interface AppInstallationManagerProps {
  app: AppSummaryModel
}

export const handleOnCheckboxChange = (
  setAppInstallationType: Dispatch<SetStateAction<string>>,
  appInstallationType: string,
) => async () => {
  setAppInstallationType(appInstallationType)
}

const AppInstallationManager: React.FC<AppInstallationManagerProps> = ({ app }: AppInstallationManagerProps) => {
  const [appInstallationType, setAppInstallationType] = useState<string>('WHOLE_ORG')

  const { data: installations, isValidating: installationsValidating } = useSWR<InstallationModelPagedResult>(
    `${URLS.INSTALLATIONS}/?AppId=${app.id}&IsInstalled=true`,
  )

  return (
    <Section>
      <FlexContainerBasic className={styles.flexContainerSpaceBettwen}>
        <H5>Installation</H5>
        <Button variant="primary" disabled={false} loading={false}>
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
          id={`${app.id}-WHOLE_ORG`}
          checked={appInstallationType === 'WHOLE_ORG'}
          onChange={handleOnCheckboxChange(setAppInstallationType, 'WHOLE_ORG')}
        />
        <label className="label" htmlFor={`${app.id}-WHOLE_ORG`}>
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
          id={`${app.id}-SPECIFIC_OFFICE_GROUPS`}
          checked={appInstallationType === 'SPECIFIC_OFFICE_GROUPS'}
          onChange={handleOnCheckboxChange(setAppInstallationType, 'SPECIFIC_OFFICE_GROUPS')}
        />
        <label className="label" htmlFor={`${app.id}-SPECIFIC_OFFICE_GROUPS`}>
          Install for specific office groups
        </label>
        <div className="form-subheading mb-4">
          <i>This will grant the app access to only data for the specific offices inside of each office group</i>
        </div>
      </div>

      {appInstallationType === 'SPECIFIC_OFFICE_GROUPS' && !installationsValidating && (
        <AppInstallationPerOfficeGroup installations={installations} />
      )}
    </Section>
  )
}

export default AppInstallationManager
