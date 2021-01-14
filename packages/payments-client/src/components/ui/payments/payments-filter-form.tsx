import * as React from 'react'
import dayjs from 'dayjs'
import {
  Button,
  Grid,
  GridItem,
  FormSection,
  FormHeading,
  FormSubHeading,
  Formik,
  Form,
  DropdownSelect,
  Input,
  DatePicker,
  DATE_TIME_FORMAT,
} from '@reapit/elements'
import { formFields } from './form-schema/payment-filter-fields'
import { columnRelative, searchBtn } from '../../../styles/ui/payment-filter-form'
import { statusOptions, typeOptions } from '../../../constants/filterOption'

export interface PaymentsFilterFormValues {
  createdFrom?: string
  createdTo?: string
  customers?: string
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
  const { customers, properties, description } = formFields
  return (
    <Formik initialValues={filterValues} onSubmit={onSearch}>
      {({ values: { createdFrom } }) => {
        return (
          <Form noValidate={true}>
            <FormSection>
              <FormHeading>Payments Filter Form</FormHeading>
              <FormSubHeading>Filter the result by:</FormSubHeading>
              <Grid>
                <GridItem>
                  <Input type="text" labelText={customers.label} id={customers.name} name={customers.name} />
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
                  <DropdownSelect
                    mode="multiple"
                    id="customer"
                    placeholder="Please select"
                    name="customer"
                    labelText="Customer"
                    options={[]}
                  />
                  <DropdownSelect
                    mode="multiple"
                    id="clientAccount"
                    placeholder="Please select"
                    name="clientAccount"
                    labelText="Client Account"
                    options={[]}
                  />
                </GridItem>
                <GridItem>
                  <DatePicker
                    name="createdFrom"
                    labelText="Created From"
                    id="createdFrom"
                    reactDatePickerProps={{
                      maxDate: dayjs().toDate(),
                    }}
                  />
                </GridItem>
                <GridItem className={columnRelative}>
                  <DatePicker
                    name="createdTo"
                    labelText="Created To"
                    id="createdTo"
                    reactDatePickerProps={{
                      minDate: dayjs(createdFrom).format(DATE_TIME_FORMAT.RFC3339),
                      maxDate: dayjs().format(DATE_TIME_FORMAT.RFC3339),
                    }}
                  />
                  <Button type="submit" variant="primary" className={searchBtn}>
                    Search
                  </Button>
                </GridItem>
              </Grid>
            </FormSection>
          </Form>
        )
      }}
    </Formik>
  )
}

export default PaymentsFilterForm
