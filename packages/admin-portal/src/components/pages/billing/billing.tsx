import React, { useEffect, useState, Dispatch } from 'react'
import { H3, Table, Section, FetchError, SelectBox, Formik, SelectOption, Form, Grid, GridItem } from '@reapit/elements'
import { fetchDeveloperBillingPeriod } from '@/services/developers'
import dayjs from 'dayjs'
import { notification } from '@reapit/elements'
import errorMessages from '../../../../../elements/src/utils/validators/error-messages'

export const renderDownloadCell = ({ row: { original } }) => {
  const { proiod, fileBlob } = original
  const url = window.URL.createObjectURL(fileBlob)
  const filename = `Billing_Period_${proiod}.csv`

  return (
    <a href={url} download={filename}>
      Download
    </a>
  )
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

type Month = {
  proiod: string
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

const monthOptions = [
  {
    label: 'January',
    value: '01',
  },
  {
    label: 'February',
    value: '02',
  },
  {
    label: 'March',
    value: '03',
  },
  {
    label: 'April',
    value: '04',
  },
  {
    label: 'May',
    value: '05',
  },
  {
    label: 'June',
    value: '06',
  },
  {
    label: 'July',
    value: '07',
  },
  {
    label: 'August',
    value: '08',
  },
  {
    label: 'September',
    value: '09',
  },
  {
    label: 'October',
    value: '10',
  },
  {
    label: 'November',
    value: '11',
  },
  {
    label: 'December',
    value: '12',
  },
]
const yearOptions = genarateYearsListOptions(2010)

export const handleChangePeriod = (setMonth, setYear) => event => {
  const { value, name } = event.nativeEvent.target
  if (name === 'month') setMonth(value)
  if (name === 'year') setYear(value)
}

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
