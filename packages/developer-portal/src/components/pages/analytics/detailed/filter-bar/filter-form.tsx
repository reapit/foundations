import * as React from 'react'
import { Dispatch } from 'redux'
import { useDispatch } from 'react-redux'
import dayjs from 'dayjs'
import { fetchTrafficStatistics } from '@/actions/traffic-statistics'
import {
  GridFourCol,
  GridFourColItem,
  DatePicker,
  SelectBox,
  DATE_TIME_FORMAT,
  H6,
  SelectOption,
} from '@reapit/elements'
import { Form, Formik } from 'formik'
import { FilterFormInitialValues } from './filter-bar'
import { AppSummaryModel, InstallationModel } from '@reapit/foundations-ts-definitions'
import FormikAutoSave from '@/components/hocs/formik-auto-save'
import { GET_ALL_PAGE_SIZE } from '@/constants/paginator'
import styles from '@/styles/pages/developer-analytics.scss?mod'
import { cx } from 'linaria'
import { fetchInstallationsFilterList } from '@/actions/installations'
import { SANDBOX_CLIENT } from '@/constants/api'

export type FilterFormProps = {
  initialValues: FilterFormInitialValues
  developerApps: AppSummaryModel[]
  installationAppDataArray: InstallationModel[]
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

export const renderClientSelectOptions = (installationAppDataArray: InstallationModel[]) => {
  const filteredClients: SelectOption[] = []
  installationAppDataArray.unshift(SANDBOX_CLIENT)
  installationAppDataArray.forEach(client => {
    const existed = filteredClients.find(filteredClient => filteredClient.value === client.customerId)
    if (!existed) {
      filteredClients.push({
        value: client.customerId || '',
        label: client.customerName || '',
      })
    }
  })

  return [
    {
      label: 'All',
      value: '',
    },
    ...filteredClients,
  ]
}

export const handleAutoSave = (developerApps: AppSummaryModel[], clients: InstallationModel[], dispatch: Dispatch) => {
  const clientIds = clients.map(client => client.customerId)
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
      fetchInstallationsFilterList({
        appId: appId || appIds,
        clientId: clientId || clientIds,
        pageSize: GET_ALL_PAGE_SIZE,
        installedDateFrom: formattedDateForm,
        installedDateTo: formattedDateTo,
      }),
    )

    dispatch(
      fetchTrafficStatistics({
        applicationId: appId || appIds,
        customerId: clientId || clientIds,
        dateFrom: formattedDateForm,
        dateTo: formattedDateTo,
      }),
    )
  }
}

export const FilterForm: React.FC<FilterFormProps> = ({ initialValues, developerApps, installationAppDataArray }) => {
  const dispatch = useDispatch()
  const clientOptions: SelectOption[] = renderClientSelectOptions(installationAppDataArray)
  return (
    <Formik initialValues={initialValues} enableReinitialize={true} onSubmit={() => {}}>
      {({ values }) => {
        const { dateFrom } = values
        return (
          <Form>
            <GridFourCol className={cx(styles.isRow)}>
              <GridFourColItem className="pb-0">
                <H6 className="mb-2">Date from</H6>
                <DatePicker
                  containerClassName="mb-0"
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
              <GridFourColItem className="pb-0">
                <H6 className="mb-2">To</H6>
                <DatePicker
                  containerClassName="mb-0"
                  name="dateTo"
                  labelText=""
                  id="dateTo"
                  reactDatePickerProps={{
                    minDate: dayjs(dateFrom)
                      .add(1, 'day')
                      .toDate(),
                    maxDate: dayjs().toDate(),
                  }}
                />
              </GridFourColItem>
              <GridFourColItem className="pb-0">
                <H6 className="mb-2">Client</H6>
                <SelectBox name="clientId" options={clientOptions} labelText="" id="clientId" />
              </GridFourColItem>
              <GridFourColItem className="pb-0">
                <H6 className="mb-2">App</H6>
                <SelectBox
                  containerClassName="mb-0 pb-0"
                  name="appId"
                  options={renderAppSelectOptions(developerApps)}
                  labelText=""
                  id="appId"
                />
              </GridFourColItem>
            </GridFourCol>
            <FormikAutoSave onSave={handleAutoSave(developerApps, installationAppDataArray, dispatch)} />
          </Form>
        )
      }}
    </Formik>
  )
}

export default FilterForm
