import React, { useEffect, useState } from 'react'
import { useReapitConnect, ReapitConnectSession } from '@reapit/connect-session'
import { reapitConnectBrowserSession } from '@/core/connect-session'
import { getPropertyProjectorConfig, savePropertyProjectorConfig } from '@/util/property-projector-config'
import { getDepartments } from '@/platform-api/departments-api'
import { getOffices } from '@/platform-api/offices-api'
import DepartmentCheckboxes from './department-checkboxes'
import OfficeCheckboxes from './office-checkboxes'
import Projector from '../projector'
import { validate } from './validation'
import ColourPicker from '../colour-picker'
import { SELLING_STATUS, LETTING_STATUS } from '@/constants/statuses'
import { getNegotiatorOfficeId } from '@/util/negotiator-helper'
import { PropertyProjectorConfig, Department, Office } from '@/types/global'
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
  Alert,
  DropdownSelect,
  Loader,
} from '@reapit/elements'

type ConfigFormProps = {}

const ConfigForm: React.FC<ConfigFormProps> = () => {
  const { connectSession } = useReapitConnect(reapitConnectBrowserSession)

  const [loading, setLoading] = useState<boolean>(true)
  const [config, setConfig] = useState<PropertyProjectorConfig>()
  const [allDepartments, setAllDepartments] = useState<Department[]>([])
  const [allOffices, setAllOffices] = useState<Office[]>([])
  const [officeId, setOfficeId] = useState<string>('')

  const [showProjector, hideProjector] = usePortal(() => <Projector config={config as PropertyProjectorConfig} />, [
    config,
  ])

  console.info('Reapit Property Projector Config: ', config)

  /**
   * @todo adjust so the departments/offices aren't limited by pagination
   */
  useEffect(() => {
    const fetchDepartments = async () => {
      const departments = (await getDepartments(connectSession as ReapitConnectSession))?._embedded?.map(department => {
        const { id, name, typeOptions: propertyTypes } = department

        return {
          id,
          name,
          propertyTypes,
        }
      })

      setAllDepartments(departments as Department[])
    }

    const fetchOffices = async () => {
      const offices = (await getOffices(connectSession as ReapitConnectSession))?._embedded?.map(department => {
        const { id, name } = department

        return {
          id,
          name,
        }
      })

      setAllOffices(offices as Office[])
    }

    const fetchNegotiatorOfficeId = async () => {
      setOfficeId(await getNegotiatorOfficeId(connectSession as ReapitConnectSession))
    }

    if (connectSession) {
      console.log('Session Data:', connectSession)

      Promise.all([fetchDepartments(), fetchOffices(), fetchNegotiatorOfficeId()]).catch(err =>
        console.error(`Inital load error: ${err}`),
      )

      window.addEventListener('keydown', escapeKeyPressed, false)
    }

    return () => {
      window.removeEventListener('keydown', escapeKeyPressed, false)
    }
  }, [connectSession])

  useEffect(() => {
    const fetchPropertyProjectorConfig = async () => {
      setConfig(await getPropertyProjectorConfig(connectSession as ReapitConnectSession, officeId))
    }

    if (officeId !== '') {
      fetchPropertyProjectorConfig().then(() => setLoading(false))
    }
  }, [officeId])

  const escapeKeyPressed = event => {
    if (event.keyCode !== 27) return
    hideProjector()
  }

  const getInitialFormValues = () => {
    const { departments, ...initalFormValues } = config as PropertyProjectorConfig
    const departmentPropertyTypes = {}

    // set a default for the 'departmentPropertyTypes'
    allDepartments.forEach(department => {
      departmentPropertyTypes[`${department.id}PropertyTypes`] = []
    })

    // created an array of department ids and department property types
    const configDepartments = Object.entries(departments).map(([departmentId, propertyTypes]) => {
      if (Array.isArray(propertyTypes)) {
        departmentPropertyTypes[`${departmentId}PropertyTypes`] = propertyTypes
      }
      return departmentId
    })

    return { ...initalFormValues, departments: configDepartments, ...departmentPropertyTypes }
  }

  const submitForm = values => {
    console.info('Inital Form Submission Values: ', values)

    const newConfig = { ...values }

    newConfig.departments = {}

    // format the departments back into what the config expects e.g {G: ['house', 'bungalow']}
    values.departments.forEach(department => {
      newConfig.departments[department] = values[`${department}PropertyTypes`]
      delete newConfig[`${department}PropertyTypes`]
    })

    console.info('Converted Form Submission Values: ', newConfig)
    setConfig(newConfig)
    savePropertyProjectorConfig(connectSession as ReapitConnectSession, officeId, newConfig)
    showProjector()
  }

  const marketingModeOptions: SelectBoxOptions[] = [
    { label: 'Selling', value: 'selling' },
    { label: 'Letting', value: 'letting' },
  ]

  const sellingStatusOptions = (): SelectBoxOptions[] => {
    return Object.keys(SELLING_STATUS).map(status => {
      return { label: status, value: status }
    })
  }

  const lettingStatusOptions = (): SelectBoxOptions[] => {
    return Object.keys(LETTING_STATUS).map(status => {
      return { label: status, value: status }
    })
  }

  const sortByOptions: SelectBoxOptions[] = [
    { label: 'Price', value: 'price' },
    { label: 'Created Date', value: 'created' },
  ]

  if (loading === true) {
    return (
      <Section>
        <Loader />
      </Section>
    )
  }

  return (
    <Section>
      <H5>Property Projector Configuration</H5>
      <Formik
        enableReinitialize={true}
        initialValues={getInitialFormValues()}
        onSubmit={values => submitForm(values)}
        validate={validate}
        component={({ setFieldValue, values, touched, errors }) => {
          const errorCount = Object.keys(errors).length

          return (
            <Form>
              <Grid>
                <GridItem>
                  <FormSection>
                    <FormHeading>Branding</FormHeading>
                    <FormSubHeading>These settings change the design of your Property Projector.</FormSubHeading>
                    <ImageInput id="logo" allowClear name="logo" labelText="Choose Your Logo" />
                    <Grid>
                      <GridItem className="colour-picker-container">
                        <ColourPicker
                          id="primaryColour"
                          name="primaryColour"
                          placeholder="#005EB8"
                          labelText="Primary Colour"
                          colour={values.primaryColour}
                          onChange={colour => setFieldValue('primaryColour', colour)}
                        />
                      </GridItem>
                      <GridItem className="colour-picker-container">
                        <ColourPicker
                          id="secondaryColour"
                          name="secondaryColour"
                          placeholder="#FFFFFF"
                          labelText="Secondary Colour"
                          colour={values.secondaryColour}
                          onChange={colour => setFieldValue('secondaryColour', colour)}
                        />
                      </GridItem>
                      <GridItem className="colour-picker-container">
                        <ColourPicker
                          id="headerTextColour"
                          name="headerTextColour"
                          placeholder="#FFFFFF"
                          labelText="Header Text Colour"
                          colour={values.headerTextColour}
                          onChange={colour => setFieldValue('headerTextColour', colour)}
                        />
                      </GridItem>
                    </Grid>
                  </FormSection>
                  <FormSection>
                    <FormHeading>General Settings</FormHeading>
                    <FormSubHeading>Various other Property Projector settings.</FormSubHeading>
                    <DropdownSelect
                      id="marketingMode"
                      name="marketingMode"
                      labelText="Marketing Mode"
                      options={marketingModeOptions}
                      mode="multiple"
                      subText="Choose to return only properties that up for sale, to let or both."
                    />
                    <Grid>
                      <GridItem>
                        <DropdownSelect
                          id="sellingStatuses"
                          name="sellingStatuses"
                          labelText="Selling Statuses"
                          options={sellingStatusOptions()}
                          subText="Choose to return only properties with certain selling statuses."
                          mode="multiple"
                          disabled={!values.marketingMode.includes('selling')}
                        />
                        <Input
                          type="text"
                          id="minPrice"
                          name="minPrice"
                          placeholder="150000"
                          labelText="Minimum Price"
                          disabled={!values.marketingMode.includes('selling')}
                        />
                        <Input
                          type="text"
                          id="minRent"
                          name="minRent"
                          placeholder="150000"
                          labelText="Minimum Rent"
                          disabled={!values.marketingMode.includes('letting')}
                        />
                        <Input
                          type="text"
                          id="propertyLimit"
                          name="propertyLimit"
                          placeholder="20"
                          labelText="Property Limit"
                        />
                        <SelectBox name="sortBy" options={sortByOptions} labelText="Sort By" id="sortBy" />
                      </GridItem>
                      <GridItem>
                        <DropdownSelect
                          id="lettingStatuses"
                          name="lettingStatuses"
                          labelText="Letting Statuses"
                          options={lettingStatusOptions()}
                          subText="Choose to return only properties with certain letting statuses."
                          mode="multiple"
                          disabled={!values.marketingMode.includes('letting')}
                        />
                        <Input
                          type="text"
                          id="maxPrice"
                          name="maxPrice"
                          placeholder="1000000"
                          labelText="Maximum Price"
                          disabled={!values.marketingMode.includes('selling')}
                        />
                        <Input
                          type="text"
                          id="maxRent"
                          name="maxRent"
                          placeholder="1000000"
                          labelText="Maximum Rent"
                          disabled={!values.marketingMode.includes('letting')}
                        />
                        <Input
                          type="text"
                          id="interval"
                          name="interval"
                          placeholder="30"
                          labelText="Rotation Interval (seconds)"
                        />
                        <Checkbox name="showAddress" id="showAddress" labelText="Show Address" />
                      </GridItem>
                    </Grid>
                  </FormSection>
                  <DepartmentCheckboxes departments={allDepartments} />
                  {touched.departments && errors.departments && (
                    <div className="has-text-danger">{errors.departments}</div>
                  )}
                  <OfficeCheckboxes offices={allOffices} />
                  <FormSection>
                    <Button type="submit">Launch Property Projector</Button>
                  </FormSection>
                  {errorCount !== 0 ? <Alert message="Please fix the errors above." type="danger" /> : null}
                </GridItem>
              </Grid>
            </Form>
          )
        }}
      />
    </Section>
  )
}

export default ConfigForm
