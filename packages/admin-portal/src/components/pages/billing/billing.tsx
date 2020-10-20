import React, { useEffect, useState, Dispatch } from 'react'
import {
  H3,
  Table,
  Section,
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

export const handleSaveFile = (fileBlob: Blob, filename: string) => () => {
  FileSaver.saveAs(fileBlob, filename)
}

export const renderDownloadCell = ({ row: { original } }) => {
  const { period, fileBlob } = original
  const filename = `billing_period_${period}.csv`
  return <a onClick={handleSaveFile(fileBlob, filename)}>Download</a>
}

export const columns = [
  {
    Header: 'Billing Period',
    accessor: 'period',
  },
  {
    Header: 'File',
    Cell: renderDownloadCell,
  },
]

export const handleDownloadBillingPeriod = (period: string, setFileBlob: Dispatch<Blob | undefined>) => () => {
  if (!period) return
  fetchDeveloperBillingPeriod({ period })
    .then(blob => {
      if (blob instanceof FetchError) throw blob
      setFileBlob(blob)
    })
    .catch(error => {
      notification.error({
        message: error.message || errorMessages.DEFAULT_SERVER_ERROR,
        placement: 'bottomRight',
        duration: 5,
      })
    })
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

export const genarateMonthsListOptions = months => {
  const monthOptions: SelectOption[] = months.map((month, index) => {
    const value = `${++index >= 10 ? index : '0' + index}`
    return { label: month, value }
  })
  return monthOptions
}

export const handleChangePeriod = (setMonth, setYear) => event => {
  const { value, name } = event.nativeEvent.target
  if (name === 'month') setMonth(value)
  if (name === 'year') setYear(value)
}

const monthOptions = genarateMonthsListOptions(MONTHS)
const yearOptions = genarateYearsListOptions(2020)

export const AdminBilling: React.FC = () => {
  const [fileBlob, setFileBlob] = useState<Blob | undefined>()
  const [month, setMonth] = useState<string>(dayjs().format('MM'))
  const [year, setYear] = useState<string>(dayjs().format('YYYY'))

  const period = `${year}-${month}`

  useEffect(handleDownloadBillingPeriod(period, setFileBlob), [period])

  const onChangePeriod = handleChangePeriod(setMonth, setYear)
  const tableData = [
    {
      period,
      fileBlob,
    },
  ]

  return (
    <>
      <H3 isHeadingSection>Billing</H3>
      <Section>
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

        <Table scrollable={true} loading={!fileBlob} data={tableData} columns={columns} />
      </Section>
    </>
  )
}

export default AdminBilling
