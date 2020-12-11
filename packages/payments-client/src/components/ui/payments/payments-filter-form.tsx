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
} from '@reapit/elements'
import { formFields } from './form-schema/payment-filter-fields'
import { columnRelative, searchBtn } from '../../../styles/ui/payment-filter-form'

export interface PaymentsFilterFormValues {
  createdFrom: string
  createdTo: string
  customers: string
  properties: string
  description: string
}

export interface PaymentsFormProps {
  filterValues: PaymentsFilterFormValues
  onSearch: any
}

const PaymentsFilterForm: React.FC<PaymentsFormProps> = ({ filterValues, onSearch }) => {
  const { customers, properties, description } = formFields
  return (
    <Formik initialValues={filterValues} onSubmit={onSearch}>
      {({ values: { createdFrom }, status }) => {
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
                    id="developerId"
                    placeholder="Please select"
                    name="developerId"
                    labelText="Payment Type"
                    options={[]}
                  />
                  <DropdownSelect
                    mode="multiple"
                    id="developerId"
                    placeholder="Please select"
                    name="developerId"
                    labelText="Status"
                    options={[]}
                  />
                </GridItem>
                <GridItem>
                  <DropdownSelect
                    mode="multiple"
                    id="developerId"
                    placeholder="Please select"
                    name="developerId"
                    labelText="Customer"
                    options={[]}
                  />
                  <DropdownSelect
                    mode="multiple"
                    id="developerId"
                    placeholder="Please select"
                    name="developerId"
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
                      minDate: dayjs(createdFrom).toDate(),
                      maxDate: dayjs().toDate(),
                    }}
                  />
                  <Button type="submit" variant="primary" className={searchBtn}>
                    Search
                  </Button>
                </GridItem>
              </Grid>
              {status && <p className="has-text-danger">{status}</p>}
            </FormSection>
          </Form>
        )
      }}
    </Formik>
  )
}

export default PaymentsFilterForm
