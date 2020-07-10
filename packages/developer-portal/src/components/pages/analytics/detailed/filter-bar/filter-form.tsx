import * as React from 'react'
import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { appInstallationsFilterRequestData } from '@/actions/app-installations'
import { httpTrafficPerDayRequestData } from '@/actions/app-http-traffic-event'
import { GridFourCol, GridFourColItem, DatePicker, SelectBox, DATE_TIME_FORMAT, H6 } from '@reapit/elements'
import { Form, Formik } from 'formik'
import { FilterFormInitialValues } from './filter-bar'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import FormikAutoSave from '@/components/hocs/formik-auto-save'
import { GET_ALL_PAGE_SIZE } from '@/constants/paginator'
import styles from '@/styles/pages/developer-analytics.scss?mod'
import { cx } from 'linaria'

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
    const { appId, clientId, dateFrom, dateTo } = values
    const appIds = developerApps.map((app: AppSummaryModel) => {
      return app.id || ''
    })
    if (!appId && appIds.length === 0) {
      return
    }
    const formattedDateForm = dayjs(dateFrom).format(DATE_TIME_FORMAT.YYYY_MM_DD)
    const formattedDateTo = dayjs(dateTo).format(DATE_TIME_FORMAT.YYYY_MM_DD)

    dispatch(
      appInstallationsFilterRequestData({
        appId: appId || appIds,
        clientId: clientId || clientIds,
        pageSize: GET_ALL_PAGE_SIZE,
        installedDateFrom: formattedDateForm,
        installedDateTo: formattedDateTo,
      }),
    )

    dispatch(
      httpTrafficPerDayRequestData({
        applicationId: appId || appIds,
        customerId: clientId || clientIds,
        dateFrom: formattedDateForm,
        dateTo: formattedDateTo,
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
            <GridFourCol className={cx(styles.isRow, 'mb-4')}>
              <GridFourColItem>
                <H6 className="mb-2">Date from</H6>
                <DatePicker
                  name="dateFrom"
                  labelText=""
                  id="dateFrom"
                  reactDatePickerProps={{
                    maxDate: dayjs()
                      .subtract(1, 'day')
                      .toDate(),
                  }}
                />
              </GridFourColItem>
              <GridFourColItem>
                <H6 className="mb-2">To</H6>
                <DatePicker
                  name="dateTo"
                  labelText=""
                  id="dateTo"
                  reactDatePickerProps={{
                    minDate: dayjs(dateFrom)
                      .add(1, 'day')
                      .toDate(),
                    maxDate: dayjs()
                      .subtract(1, 'day')
                      .toDate(),
                  }}
                />
              </GridFourColItem>
              <GridFourColItem>
                <H6 className="mb-2">Client</H6>
                <SelectBox name="clientId" options={renderClientSelectOptions(clientIds)} labelText="" id="clientId" />
              </GridFourColItem>
              <GridFourColItem>
                <H6 className="mb-2">App</H6>
                <SelectBox name="appId" options={renderAppSelectOptions(developerApps)} labelText="" id="appId" />
              </GridFourColItem>
            </GridFourCol>
            <FormikAutoSave onSave={handleAutoSave(developerApps, clientIds, dispatch)} />
          </Form>
        )
      }}
    </Formik>
  )
}

export default FilterForm
