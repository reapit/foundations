import React, { useEffect, useState } from 'react'
import { useReapitConnect, ReapitConnectSession } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { getPropertyProjectorConfig } from '../../../util/property-projector-config'
import DepartmentCheckboxes from './department-checkboxes'
import OfficeCheckboxes from './office-checkboxes'
import Projector from '../projector'
import {
  H5,
  Section,
  Formik,
  Form,
  FormSection,
  FormHeading,
  FormSubHeading,
  Input,
  Grid,
  GridItem,
  ImageInput,
  Checkbox,
  SelectBox,
  SelectBoxOptions,
  Button,
  usePortal,
} from '@reapit/elements'

type ConfigFormProps = {}

const ConfigForm: React.FC<ConfigFormProps> = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)
  const [config, setConfig]: any = useState(null)
  const [showProjector] = usePortal(() => <Projector config={config} />)

  console.info('Reapit Property Projector Config: ', config)

  useEffect(() => {
    const fetchPropertyProjectorConfig = async () => {
      setConfig(await getPropertyProjectorConfig(connectSession as ReapitConnectSession))
    }
    if (connectSession) {
      console.log('Session Data:', connectSession)
      fetchPropertyProjectorConfig()
    }
  }, [connectSession])

  const getInitialFormValues = () => {
    const { departments, offices, ...initalFormValues } = config

    // update all department and property type checkboxes with config value
    departments.forEach(dep => {
      initalFormValues[`department-${dep.id}`] = dep.checked
      dep.propertyTypes.forEach(type => (initalFormValues[type.id] = type.checked))
    })

    // update all office checkboxes with config value
    offices.forEach(office => (initalFormValues[`office-${office.id}`] = office.checked))

    return initalFormValues
  }

  const sortByOptions: SelectBoxOptions[] = [
    { label: 'Price', value: 'price' },
    { label: 'Created Date', value: 'created' },
  ]

  if (config === null) {
    return <div>loading...</div>
  }

  return (
    <Section>
      <H5>Property Projector Configuration</H5>
      <Formik
        initialValues={getInitialFormValues()}
        onSubmit={values => {
          // save configuration values
          console.info('Form Values: ', values)
          showProjector()
        }}
      >
        <Form>
          <Grid>
            <GridItem>
              <FormSection>
                <FormHeading>Branding</FormHeading>
                <FormSubHeading>These settings change the design of your Property Projector.</FormSubHeading>
                <ImageInput id="logo" allowClear name="logo" labelText="Choose Your Logo" />
                <Input
                  type="text"
                  id="primaryColour"
                  name="primaryColour"
                  placeholder="#005EB8"
                  labelText="Primary Colour"
                />
                <Input
                  type="text"
                  id="secondaryColour"
                  name="secondaryColour"
                  placeholder="#FFFFFF"
                  labelText="Secondary Colour"
                />
              </FormSection>
              <DepartmentCheckboxes departments={config.departments} />
              <OfficeCheckboxes offices={config.offices} />
              <FormSection>
                <FormHeading>General Settings</FormHeading>
                <FormSubHeading>Various other Property Projector settings.</FormSubHeading>
                <Input
                  type="text"
                  id="rotationDuration"
                  name="rotationDuration"
                  placeholder="30"
                  labelText="Rotation Duration"
                />
                <Input type="text" id="refreshHour" name="refreshHour" placeholder="1" labelText="Refresh Hour" />
                <Input
                  type="text"
                  id="propertyLimit"
                  name="propertyLimit"
                  placeholder="20"
                  labelText="Property Limit"
                />
                <Input type="text" id="minPrice" name="minPrice" placeholder="£150000" labelText="Minimum Price" />
                <Input type="text" id="maxPrice" name="maxPrice" placeholder="£1000000" labelText="Maximum Price" />
                <SelectBox name="sortBy" options={sortByOptions} labelText="Sort By" id="sortBy" />
                <Checkbox name="randomize" id="randomize" labelText="Randomize Properties" />
                <Checkbox name="showAddress" id="showAddress" labelText="Show Address" />
                <Checkbox name="showStrapline" id="showStrapline" labelText="Show Strapline" />
              </FormSection>
              <FormSection>
                <Button type="submit">Launch Property Projector</Button>
              </FormSection>
            </GridItem>
          </Grid>
        </Form>
      </Formik>
    </Section>
  )
}

export default ConfigForm
