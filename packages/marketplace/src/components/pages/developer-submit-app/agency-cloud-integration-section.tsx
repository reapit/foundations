import * as React from 'react'
import {
  FormSection,
  FormHeading,
  FormSubHeading,
  Grid,
  GridItem,
  DropdownSelect,
  SelectOption,
} from '@reapit/elements'
import linkStyles from '@/styles/elements/link.scss?mod'
import { useSelector } from 'react-redux'
import { selectIntegrationTypes } from '@/selector/integration-types'
import { DesktopIntegrationTypeModel } from '@/actions/app-integration-types'

export type AgencyCloudIntegrationSectionProps = {}

export const prepareIntegrationTypeOptions = (integrationTypes: DesktopIntegrationTypeModel[]) => {
  return integrationTypes.map(integrationType => ({
    value: integrationType.id || '',
    label: integrationType.name || '',
    description: integrationType.description || '',
    link: integrationType.url || '',
  }))
}

const AgencyCloudIntegrationSection: React.FC<AgencyCloudIntegrationSectionProps> = () => {
  const integrationTypes = useSelector(selectIntegrationTypes)

  const integrationTypeOptions: SelectOption[] = prepareIntegrationTypeOptions(integrationTypes)

  return (
    <FormSection>
      <FormHeading>Agency Cloud Integration</FormHeading>
      <FormSubHeading>
        To be able to associate your application with an action in Agency Cloud the application will need to be given a
        desktop type. Please select the type of integration your app requires from the list below. For more information
        on Desktop Types, please{' '}
        <a
          className={linkStyles.link}
          href="https://foundations-documentation.reapit.cloud/api/desktop-api#desktop-types"
          target="_blank"
          rel="noopener noreferrer"
        >
          click here
        </a>
      </FormSubHeading>
      <Grid>
        <GridItem>
          <DropdownSelect
            mode="multiple"
            options={integrationTypeOptions}
            labelText="Integration Type"
            name="desktopIntegrationTypeIds"
            id="desktopIntegrationTypeIds"
            placeholder="Please select"
          />
        </GridItem>
      </Grid>
    </FormSection>
  )
}

export default AgencyCloudIntegrationSection
