import * as React from 'react'
import dayjs from 'dayjs'
import {
  Button,
  Grid,
  GridItem,
  Formik,
  Form,
  DropdownSelect,
  Input,
  DatePicker,
  DATE_TIME_FORMAT,
  H5,
  Section,
} from '@reapit/elements'
import { formFields } from './payment-filter-fields'
import { columnRelative, searchBtn } from '../../styles/ui/payment-filter-form'
import { statusOptions, typeOptions } from '../../constants/filter-options'

export interface PaymentsFilterFormValues {
  createdFrom?: string
  createdTo?: string
  properties?: string
  description?: string
  type?: string[]
  status?: string[]
  pageSize?: string
}

export interface PaymentsFormProps {
  filterValues: PaymentsFilterFormValues
  onSearch: any
}

const PaymentsFilterForm: React.FC<PaymentsFormProps> = ({ filterValues, onSearch }) => {
  const { description } = formFields
  return (
    <Section hasPadding={false}>
      <H5>Filter Dashboard</H5>
      <Formik
        initialValues={filterValues}
        onSubmit={(values) => {
          const { createdFrom, createdTo } = values
          const fomattedCreatedFrom = createdFrom ? dayjs(createdFrom).format(DATE_TIME_FORMAT.YYYY_MM_DD) : createdFrom
          const fomattedCreatedTo = createdTo ? dayjs(createdTo).format(DATE_TIME_FORMAT.YYYY_MM_DD) : createdTo
          return onSearch({
            ...values,
            createdFrom: fomattedCreatedFrom,
            createdTo: fomattedCreatedTo,
          })
        }}
      >
        {({ values: { createdFrom } }) => {
          return (
            <Form noValidate={true}>
              <Grid>
                <GridItem>
                  {/**Commenting out for now as needs search capability to make it work */}
                  {/* <Input type="text" labelText={properties.label} id={properties.name} name={properties.name} /> */}
                  <DropdownSelect
                    mode="multiple"
                    id="status"
                    placeholder="Please select"
                    name="status"
                    labelText="Status"
                    options={statusOptions}
                  />
                  <DatePicker
                    name="createdFrom"
                    labelText="Created From"
                    id="createdFrom"
                    reactDatePickerProps={{
                      maxDate: new Date(),
                    }}
                  />
                </GridItem>
                <GridItem>
                  <DropdownSelect
                    mode="multiple"
                    id="type"
                    placeholder="Please select"
                    name="type"
                    labelText="Payment Type"
                    options={typeOptions}
                  />
                  <DatePicker
                    name="createdTo"
                    labelText="Created To"
                    id="createdTo"
                    reactDatePickerProps={{
                      minDate: new Date(createdFrom ?? ''),
                      // a day from now
                      maxDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
                    }}
                  />
                </GridItem>
                <GridItem className={columnRelative}>
                  <Input type="text" labelText={description.label} id={description.name} name={description.name} />
                  <Button type="submit" variant="primary" className={searchBtn}>
                    Search
                  </Button>
                </GridItem>
              </Grid>
            </Form>
          )
        }}
      </Formik>
    </Section>
  )
}

export default PaymentsFilterForm
