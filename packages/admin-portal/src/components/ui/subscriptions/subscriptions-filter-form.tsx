import * as React from 'react'
import {
  Button,
  Grid,
  GridItem,
  FormSection,
  FormHeading,
  FormSubHeading,
  Formik,
  Form,
  SelectBox,
  Input,
} from '@reapit/elements-legacy'
import { subscriptionTypes } from '../../../constants/subscriptionTypes'

export interface SubscriptionsFilterFormValues {
  type: string
  developerName: string
  userEmail: string
  appName: string
  status: string
}

export interface SubscriptionsFormProps {
  filterValues: SubscriptionsFilterFormValues
  onSearch: any
}

const statusFilterOptions = [
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Cancelled',
    value: 'cancelled',
  },
]

const SubscriptionsFilterForm: React.FC<SubscriptionsFormProps> = ({ filterValues, onSearch }) => {
  return (
    <Formik initialValues={filterValues} onSubmit={onSearch}>
      {({ status }) => {
        return (
          <Form noValidate={true}>
            <FormSection>
              <FormHeading>Subscriptions Filter Form</FormHeading>
              <FormSubHeading>Filter the result by type and developer</FormSubHeading>
              <Grid className="items-center">
                <GridItem>
                  <SelectBox name="type" options={subscriptionTypes} labelText="Type" id="type" />
                </GridItem>
                <GridItem>
                  <Input
                    type="text"
                    labelText="Developer Name"
                    id="developerName"
                    name="developerName"
                    maxLength={256}
                  />
                </GridItem>
                <GridItem>
                  <Input type="text" labelText="User Email" id="userEmail" name="userEmail" maxLength={256} />
                </GridItem>
                <GridItem>
                  <Input type="text" labelText="App Name" id="appName" name="appName" maxLength={256} />
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
}

export default SubscriptionsFilterForm
