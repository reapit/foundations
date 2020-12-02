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
import { useSelector } from 'react-redux'
import { selectIntegrationTypes } from '@/selector/integration-types'
import { DesktopIntegrationTypeModel } from '@reapit/foundations-ts-definitions'
import { link } from '@/styles/elements/link'

export type AgencyCloudIntegrationSectionProps = {}

export const prepareIntegrationTypeOptions = (integrationTypes: DesktopIntegrationTypeModel[]) => {
  return integrationTypes
    .map(integrationType => {
      // Removing payment as only an internal replacement screen option
      if (integrationType.id !== 'Payment') {
        return {
          value: integrationType.id || '',
          label: integrationType.name || '',
          description: integrationType.description || '',
          link: integrationType.url || '',
        }
      }
    })
    .filter(option => Boolean(option)) as SelectOption[]
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
          className={link}
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
            fixedPosition
          />
        </GridItem>
      </Grid>
    </FormSection>
  )
}

export default AgencyCloudIntegrationSection
