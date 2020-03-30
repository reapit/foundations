import * as React from 'react'
import { Grid, GridItem, DatePicker, SelectBox } from '@reapit/elements'
import { Form, Formik } from 'formik'
import { FilterFormInitialValues } from './filter-bar'
import { AppSummaryModel, InstallationModel } from '@reapit/foundations-ts-definitions'
import { install } from 'offline-plugin/runtime'

export type FilterFormProps = {
  initialValues: FilterFormInitialValues
  developerApps: AppSummaryModel[]
  installationApps: InstallationModel[]
}

export const handleSubmit = values => {
  console.log('values', values)
}

export const renderAppSelectOptions = developerApps => {
  return [
    {
      label: 'All',
      value: '',
    },
    ...developerApps.map((item: AppSummaryModel) => {
      return {
        label: item.name,
        value: item.id,
      }
    }),
  ]
}

export const renderClientSelectOptions = installationApps => {
  const clientIds = installationApps
    .map((installation: InstallationModel) => {
      return installation.client || ''
    })
    .filter((x, i, a) => a.indexOf(x) == i)

  return [
    {
      label: 'All',
      value: '',
    },
    ...clientIds.map(client => {
      return {
        label: client,
        value: client,
      }
    }),
  ]
}

const FilterForm: React.FC<FilterFormProps> = ({ initialValues, developerApps, installationApps }) => {
  console.log('initialValues', initialValues)
  return (
    <Formik initialValues={initialValues} enableReinitialize={true} onSubmit={handleSubmit}>
      {() => (
        <Form>
          <Grid>
            <GridItem className="is-narrow">
              <Grid className="is-vcentered">
                <GridItem className="is-narrow">
                  <h6 className="title is-6">Date from</h6>
                </GridItem>
                <GridItem className="is-narrow">
                  <DatePicker name="dateFrom" labelText="" id="dateFrom" />
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem className="is-narrow">
              <Grid className="is-vcentered">
                <GridItem className="is-narrow">
                  <h6 className="title is-6">Date to</h6>
                </GridItem>
                <GridItem className="is-narrow">
                  <DatePicker name="dateTo" labelText="" id="dateTo" />
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem className="is-narrow">
              <Grid className="is-vcentered">
                <GridItem className="is-narrow">
                  <h6 className="title is-6">Client</h6>
                </GridItem>
                <GridItem className="is-narrow">
                  <SelectBox
                    name="clientId"
                    options={renderClientSelectOptions(installationApps)}
                    labelText=""
                    id="clientId"
                  />
                </GridItem>
              </Grid>
            </GridItem>
            <GridItem className="is-narrow">
              <Grid className="is-vcentered">
                <GridItem className="is-narrow">
                  <h6 className="title is-6">App</h6>
                </GridItem>
                <GridItem className="is-narrow">
                  <SelectBox name="appId" options={renderAppSelectOptions(developerApps)} labelText="" id="appId" />
                </GridItem>
              </Grid>
            </GridItem>
          </Grid>
        </Form>
      )}
    </Formik>
  )
}

export default FilterForm
