import React, { useEffect, useState } from 'react'
import { useReapitConnect, ReapitConnectSession } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { getPropertyProjectorConfig } from '../../util/property-projector-config'
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
} from '@reapit/elements'

type DepartmentCheckboxesProps = {
  departments: any[]
}

const DepartmentCheckboxes: React.FC<DepartmentCheckboxesProps> = props => {
  const { departments } = props

  const departmentCheckboxes = departments.map(dep => {
    return (
      <React.Fragment key={dep.id}>
        <Checkbox name={`checkboxDepartment${dep.id}`} id={`checkboxDepartment${dep.id}`} labelText={dep.name} />
        <div className="department-property-types">
          {dep.propertyTypes.map((type, idx: number) => {
            return (
              <Checkbox
                name={`checkboxDepartmentType${dep.id}${type.name}`}
                id={`checkboxDepartmentType${dep.id}${type.name}`}
                labelText={type.name}
                key={idx}
              />
            )
          })}
        </div>
      </React.Fragment>
    )
  })

  return (
    <FormSection>
      <FormHeading>Departments</FormHeading>
      <FormSubHeading>
        Only properties from the selected departments and types will be shown in your Property Projector.
      </FormSubHeading>
      {departmentCheckboxes}
    </FormSection>
  )
}

type OfficeCheckboxesProps = {
  offices: any[]
}

const OfficeCheckboxes: React.FC<OfficeCheckboxesProps> = props => {
  const { offices } = props

  const officeCheckboxes = offices.map(office => {
    return (
      <Checkbox
        name={`checkboxDepartment${office.id}`}
        id={`checkboxDepartment${office.id}`}
        labelText={office.name}
        key={office.id}
      />
    )
  })

  return (
    <FormSection>
      <FormHeading>Offices</FormHeading>
      <FormSubHeading>
        Only properties from the selected offices will be shown in your Property Projector.
      </FormSubHeading>
      {officeCheckboxes}
    </FormSection>
  )
}

type ConfigFormProps = {}

const ConfigForm: React.FC<ConfigFormProps> = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const [config, setConfig]: any = useState(null)
  const [loading, setLoading]: any = useState(true)

  console.info('Reapit Property Projector Config: ', config)

  useEffect(() => {
    const fetchPropertyProjectorConfig = async () => {
      setConfig(await getPropertyProjectorConfig(connectSession as ReapitConnectSession))
      setLoading(false)
    }
    if (connectSession) {
      fetchPropertyProjectorConfig()
    }
  }, [connectSession])

  const sortByOptions: SelectBoxOptions[] = [
    { label: 'Price', value: 'price' },
    { label: 'Created Date', value: 'created' },
  ]

  if (loading) {
    return <div>loading...</div>
  }

  return (
    <Section>
      <H5>Property Projector Configuration</H5>
      <Formik
        initialValues={{
          logoInput: '',
          primaryColour: '',
          secondaryColour: '',
        }}
        onSubmit={values => alert('FORM SUBMITTED!')}
      >
        <Form>
          <Grid>
            <GridItem>
              <FormSection>
                <FormHeading>Branding</FormHeading>
                <FormSubHeading>These settings change the design of your Property Projector.</FormSubHeading>
                <ImageInput id="logoInput" allowClear name="logoInput" labelText="Choose Your Logo" />
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
                <Button>Open Property Projector</Button>
              </FormSection>
            </GridItem>
          </Grid>
        </Form>
      </Formik>
    </Section>
  )
}

export default ConfigForm
