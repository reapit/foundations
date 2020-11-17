import * as React from 'react'
import { useSelector } from 'react-redux'
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
  DropdownSelect,
  SelectOption,
} from '@reapit/elements'
import store from '../../core/store'
import { fetchDeveloperList, fetchDeveloperListValues } from '@/actions/devs-management'
import { selectDeveloperListState } from '@/selector/admin'
import { DeveloperData } from '@/reducers/developers/list'

export interface SubscriptionsFilterFormValues {
  type: string
  developerId: string
}

export interface SubscriptionsFormProps {
  filterValues: SubscriptionsFilterFormValues
  onSearch: any
}

export const prepareDevelopersOptions: (data: DeveloperData[]) => SelectOption[] = data =>
  data.map(developer => {
    const { id, name } = developer

    return {
      label: name,
      value: id,
    } as SelectOption
  })

export const SubscriptionsFilterForm: React.FC<SubscriptionsFormProps> = ({ filterValues, onSearch }) => {
  React.useEffect(() => {
    store.dispatch(fetchDeveloperList({ queryString: '?page=1' } as fetchDeveloperListValues))
  }, [])

  const DeveloperListState = useSelector(selectDeveloperListState)
  const { data } = DeveloperListState
  const developers = prepareDevelopersOptions(data)

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
                  <Input type="text" labelText="Type" id="type" name="type" />
                </GridItem>
                <GridItem>
                  <DropdownSelect
                    mode="multiple"
                    id="developerId"
                    placeholder="Please select"
                    name="developerId"
                    labelText="Dropdown Select"
                    options={developers}
                  />
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
