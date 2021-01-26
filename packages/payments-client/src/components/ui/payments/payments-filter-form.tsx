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
import { formFields } from './form-schema/payment-filter-fields'
import { columnRelative, searchBtn } from '../../../styles/ui/payment-filter-form'
import { statusOptions, typeOptions } from '../../../constants/filter-options'

export interface PaymentsFilterFormValues {
  createdFrom?: string
  createdTo?: string
  properties?: string
  description?: string
  type?: string[]
  status?: string[]
}

export interface PaymentsFormProps {
  filterValues: PaymentsFilterFormValues
  onSearch: any
}

const PaymentsFilterForm: React.FC<PaymentsFormProps> = ({ filterValues, onSearch }) => {
  const { properties, description } = formFields
  return (
    <Section>
      <H5>Filter Dashboard</H5>
      <Formik
        initialValues={filterValues}
        onSubmit={values => {
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
                  <Input type="text" labelText={properties.label} id={properties.name} name={properties.name} />
                  <Input type="text" labelText={description.label} id={description.name} name={description.name} />
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
                  <DropdownSelect
                    mode="multiple"
                    id="status"
                    placeholder="Please select"
                    name="status"
                    labelText="Status"
                    options={statusOptions}
                  />
                </GridItem>
                <GridItem>
                  <DatePicker
                    name="createdFrom"
                    labelText="Created From"
                    id="createdFrom"
                    reactDatePickerProps={{
                      maxDate: new Date(),
                    }}
                  />
                </GridItem>
                <GridItem className={columnRelative}>
                  <DatePicker
                    name="createdTo"
                    labelText="Created To"
                    id="createdTo"
                    reactDatePickerProps={{
                      minDate: new Date(createdFrom ?? ''),
                      maxDate: new Date(),
                    }}
                  />
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
