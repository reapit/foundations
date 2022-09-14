import * as React from 'react'
import dayjs from 'dayjs'
import {
  Input,
  Button,
  Grid,
  GridItem,
  FormSection,
  FormHeading,
  FormSubHeading,
  Formik,
  Form,
  DatePicker,
  SelectBox,
} from '@reapit/elements'

export interface DevsManagementFilterFormValues {
  name: string
  company: string
  registeredFrom: string
  registeredTo: string
  status: string
}

export interface DevsManagementFilterFormProps {
  filterValues: DevsManagementFilterFormValues
  onSearch: any
}

const statusFilterOptions = [
  {
    label: 'Incomplete',
    value: 'incomplete',
  },
  {
    label: 'Pending',
    value: 'pending',
  },
  {
    label: 'Confirmed',
    value: 'confirmed',
  },
  { label: 'Under Review', value: 'underReview' },
  { label: 'Removed', value: 'removed' },
]

export const DevsManagementFilterForm: React.FC<DevsManagementFilterFormProps> = ({ filterValues, onSearch }) => (
  <Formik initialValues={filterValues} onSubmit={onSearch}>
    {({ values: { registeredFrom }, status }) => {
      return (
        <Form noValidate={true}>
          <FormSection>
            <FormHeading>Developer Management Filter Form</FormHeading>
            <FormSubHeading>Filter the result by Name and Company</FormSubHeading>
            <Grid className="items-center">
              <GridItem>
                <Input type="text" labelText="Name" id="name" name="name" maxLength={256} />
              </GridItem>
              <GridItem>
                <Input type="text" labelText="Company" id="company" name="company" maxLength={256} />
              </GridItem>
              <GridItem>
                <DatePicker
                  name="registeredFrom"
                  labelText="Registered From"
                  id="registeredFrom"
                  reactDatePickerProps={{
                    maxDate: dayjs().toDate(),
                  }}
                />
              </GridItem>
              <GridItem>
                <DatePicker
                  name="registeredTo"
                  labelText="Registered To"
                  id="registeredTo"
                  reactDatePickerProps={{
                    minDate: dayjs(registeredFrom).toDate(),
                    maxDate: dayjs().toDate(),
                  }}
                />
              </GridItem>
              <GridItem>
                <SelectBox id="status" name="status" labelText="Status" options={statusFilterOptions} />
              </GridItem>
              <GridItem className="mt-4">
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

export default DevsManagementFilterForm
