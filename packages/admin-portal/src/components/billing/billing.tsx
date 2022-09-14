import React, { useEffect, useState, Dispatch, SetStateAction } from 'react'
import {
  Table,
  FetchError,
  SelectBox,
  Formik,
  SelectOption,
  Form,
  Grid,
  GridItem,
  notification,
} from '@reapit/elements'
import { fetchDeveloperBillingPeriod } from '@/services/developers'
import dayjs from 'dayjs'
import { MONTHS } from '@/constants/datetime'
import errorMessages from '@/constants/error-messages'
import FileSaver from 'file-saver'
import { fetchCustomerWarehouseCosts } from '../../services/customers'
import { PageContainer, Title } from '@reapit/elements'

export const handleSaveFile = (billingFile: Blob, filename: string) => () => {
  FileSaver.saveAs(billingFile, filename)
}

export const renderDownloadBillingCell = ({ row: { original } }) => {
  const { period, billingFile } = original
  const filename = `billing_developer_period_${period}.csv`
  return <a onClick={handleSaveFile(billingFile, filename)}>Download</a>
}

export const renderDownloadDwBillingCell = ({ row: { original } }) => {
  const { period, billingDwFile } = original
  const filename = `billing_data_warehouse_period_${period}.csv`
  return <a onClick={handleSaveFile(billingDwFile, filename)}>Download</a>
}

export const columns = [
  {
    Header: 'Billing Period',
    accessor: 'period',
  },
  {
    Header: 'Developer Billing',
    Cell: renderDownloadBillingCell,
  },
  {
    Header: 'Data Warehouse Billing',
    Cell: renderDownloadDwBillingCell,
  },
]

export const handleDownloadBillingPeriod =
  (
    period: string,
    setBillingFile: Dispatch<SetStateAction<Blob | null>>,
    setBillingDwFile: Dispatch<SetStateAction<Blob | null>>,
  ) =>
  () => {
    const fetchBilling = async () => {
      if (!period) return

      try {
        const billingFile = await fetchDeveloperBillingPeriod({ period })
        const billingDwFile = await fetchCustomerWarehouseCosts(period)

        if (!billingFile || billingFile instanceof FetchError) {
          throw billingFile
        }
        setBillingFile(billingFile)

        if (!billingDwFile || billingDwFile instanceof FetchError) {
          throw billingDwFile
        }
        setBillingDwFile(billingDwFile as Blob)
      } catch (error) {
        notification.error({
          message: (error as Error).message || errorMessages.DEFAULT_SERVER_ERROR,
          duration: 5,
        })
      }
    }

    fetchBilling()
  }

export const genarateYearsListOptions = (yearFrom: number) => {
  const years: SelectOption[] = []
  const currentYear = dayjs().year()
  while (yearFrom <= currentYear) {
    const option = {
      value: `${yearFrom}`,
      label: `${yearFrom++}`,
    }
    years.push(option)
  }
  return years
}

export const genarateMonthsListOptions = (months) => {
  const monthOptions: SelectOption[] = months.map((month, index) => {
    const value = `${++index >= 10 ? index : '0' + index}`
    return { label: month, value }
  })
  return monthOptions
}

export const handleChangePeriod = (setMonth, setYear) => (event) => {
  const { value, name } = event.nativeEvent.target
  if (name === 'month') setMonth(value)
  if (name === 'year') setYear(value)
}

const monthOptions = genarateMonthsListOptions(MONTHS)
const yearOptions = genarateYearsListOptions(2020)

export const AdminBilling: React.FC = () => {
  const [billingFile, setBillingFile] = useState<Blob | null>(null)
  const [billingDwFile, setBillingDwFile] = useState<Blob | null>(null)
  const [month, setMonth] = useState<string>(dayjs().format('MM'))
  const [year, setYear] = useState<string>(dayjs().format('YYYY'))

  const period = `${year}-${month}`

  useEffect(handleDownloadBillingPeriod(period, setBillingFile, setBillingDwFile), [period])

  const onChangePeriod = handleChangePeriod(setMonth, setYear)
  const tableData = [
    {
      period,
      billingFile,
      billingDwFile,
    },
  ]

  return (
    <PageContainer>
      <Title>Billing</Title>
      <Formik
        initialValues={{
          year,
          month,
        }}
        onSubmit={onChangePeriod}
      >
        <Form onChange={onChangePeriod}>
          <Grid>
            <GridItem>
              <SelectBox id="month" name="month" labelText="Month" options={monthOptions} />
            </GridItem>
            <GridItem>
              <SelectBox id="year" name="year" labelText="Year" options={yearOptions} />
            </GridItem>
          </Grid>
        </Form>
      </Formik>
      <Table scrollable={true} loading={!billingFile || !billingDwFile} data={tableData} columns={columns} />
    </PageContainer>
  )
}

export default AdminBilling
