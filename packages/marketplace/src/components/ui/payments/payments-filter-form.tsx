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

export interface PaymentsFilterFormValues {
  requestedFrom: string
  customers: string
  properties: string
  description: string
}

export interface SubscriptionsFormProps {
  filterValues: PaymentsFilterFormValues
  onSearch: any
}

const SubscriptionsFilterForm: React.FC<SubscriptionsFormProps> = ({ filterValues, onSearch }) => {
  const { customers, properties, description } = formFields
  return (
    <Formik initialValues={filterValues} onSubmit={onSearch}>
      {({ values: { requestedFrom }, status }) => {
        return (
          <Form noValidate={true}>
            <FormSection>
              <FormHeading>Subscriptions Filter Form</FormHeading>
              <FormSubHeading>Filter the result by type and developer</FormSubHeading>
              <Grid className="items-center">
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
                <GridItem className="mt-4">
                  <DatePicker
                    name="requestedFrom"
                    labelText="Requested From"
                    id="requestedFrom"
                    reactDatePickerProps={{
                      maxDate: dayjs().toDate(),
                    }}
                  />
                </GridItem>
                <GridItem>
                  <DatePicker
                    name="requestedTo"
                    labelText="Requested To"
                    id="requestedTo"
                    reactDatePickerProps={{
                      minDate: dayjs(requestedFrom).toDate(),
                      maxDate: dayjs().toDate(),
                    }}
                  />
                  <Button type="submit" variant="primary">
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

export default SubscriptionsFilterForm
