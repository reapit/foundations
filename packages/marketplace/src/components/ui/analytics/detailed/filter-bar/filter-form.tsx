import * as React from 'react'
import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { appUsageStatsRequestData } from '@/actions/app-usage-stats'
import { appInstallationsRequestData } from '@/actions/app-installations'
import { httpTrafficPerDayRequestData } from '@/actions/app-http-traffic-event'
import { Grid, GridItem, DatePicker, SelectBox } from '@reapit/elements'
import { Form, Formik } from 'formik'
import { FilterFormInitialValues } from './filter-bar'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import FormikAutoSave from '@/components/hocs/formik-auto-save'
import { GET_ALL_PAGE_SIZE } from '@/constants/paginator'

export type FilterFormProps = {
  initialValues: FilterFormInitialValues
  developerApps: AppSummaryModel[]
  clientIds: string[]
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

export const renderClientSelectOptions = clientIds => {
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

export const handleAutoSave = (developerApps: AppSummaryModel[], clientIds: string[], dispatch: Dispatch) => {
  return values => {
    const { appId, clientId } = values
    const appIds = developerApps.map((app: AppSummaryModel) => {
      return app.id || ''
    })

    dispatch(
      appUsageStatsRequestData({
        ...values,
        appId: appId || appIds,
      }),
    )

    dispatch(
      appInstallationsRequestData({
        appId: appId || appIds,
        clientId: clientId || clientIds,
        pageSize: GET_ALL_PAGE_SIZE,
        installedDateFrom: values.dateFrom,
        installedDateTo: values.dateTo,
      }),
    )

    dispatch(
      httpTrafficPerDayRequestData({
        applicationId: appId || appIds,
        customerId: clientId || clientIds,
        dateFrom: values.dateFrom.split('T')[0],
        dateTo: values.dateTo.split('T')[0],
      }),
    )
  }
}

export const FilterForm: React.FC<FilterFormProps> = ({ initialValues, developerApps, clientIds }) => {
  const dispatch = useDispatch()
  return (
    <Formik initialValues={initialValues} enableReinitialize={true} onSubmit={() => {}}>
      {({ values }) => {
        const { dateFrom } = values
        return (
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
                    <h6 className="title is-6">To</h6>
                  </GridItem>
                  <GridItem className="is-narrow">
                    <DatePicker
                      name="dateTo"
                      labelText=""
                      id="dateTo"
                      reactDatePickerProps={{
                        minDate: dayjs(dateFrom)
                          .add(1, 'day')
                          .toDate(),
                      }}
                    />
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
                      options={renderClientSelectOptions(clientIds)}
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
            <FormikAutoSave onSave={handleAutoSave(developerApps, clientIds, dispatch)} />
          </Form>
        )
      }}
    </Formik>
  )
}

export default FilterForm
