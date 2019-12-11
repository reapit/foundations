import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import {
  Button,
  Input,
  SelectBox,
  FlexContainerBasic,
  H3,
  FlexContainerResponsive,
  Formik,
  Form
} from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import Routes from '@/constants/routes'
import { SearchParams, resultSetSearchParams } from '@/actions/results'

export interface ClientSearchMappedActions {
  setSearchParams: (params: SearchParams) => void
}

export type ClientSearchProps = ClientSearchMappedActions & RouteComponentProps

const identityCheckList = [
  { label: 'Please select…', value: '' },
  { label: 'Pass', value: 'Pass' },
  { label: 'Fail', value: 'Fail' },
  { label: 'Pending', value: 'Pending' },
  { label: 'Cancelled', value: 'Cancelled' },
  { label: 'Warnings', value: 'Warnings' },
  { label: 'Unchecked', value: 'Unchecked' }
]

export const searchContacts = ({ setSearchParams, history }) => values => {
  setSearchParams(values)
  history.push(Routes.RESULTS)
}

export const renderForm = () => ({ values }) => {
  const disabled = !values.name && !values.address && !values.identityCheck
  return (
    <div>
      <FlexContainerResponsive hasBackground flexColumn hasPadding>
        <H3>Client Search</H3>
        <Form className="mb-8">
          <Input id="name" type="text" placeholder="Firstname or Surname" name="name" labelText="Search by name" />
          <Input
            id="address"
            type="text"
            placeholder="Streetname, Village, Town or Postcode"
            name="address"
            labelText="Search by address"
          />
          <SelectBox
            id="identityCheck"
            name="identityCheck"
            labelText="Search by ID Status"
            options={identityCheckList}
          />
          <Button className="is-right" type="submit" variant="primary" disabled={disabled}>
            Search
          </Button>
        </Form>
      </FlexContainerResponsive>
    </div>
  )
}

export const ClientSearch: React.FunctionComponent<ClientSearchProps> = ({ setSearchParams, history }) => {
  return (
    <ErrorBoundary>
      <FlexContainerBasic hasPadding flexColumn>
        <Formik
          initialValues={{ name: '', address: '', identityCheck: '' }}
          onSubmit={searchContacts({ setSearchParams, history })}
        >
          {renderForm()}
        </Formik>
      </FlexContainerBasic>
    </ErrorBoundary>
  )
}

export const mapDispatchToProps = (dispatch: any): ClientSearchMappedActions => ({
  setSearchParams: (params: SearchParams) => dispatch(resultSetSearchParams(params))
})

export default withRouter(connect(null, mapDispatchToProps)(ClientSearch))
