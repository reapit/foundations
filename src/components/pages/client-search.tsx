import * as React from 'react'
import { connect } from 'react-redux'
import { withRouter, RouteComponentProps } from 'react-router'
import { Button, Input, SelectBox } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import searchStyle from '@/styles/pages/client-search.scss?mod'
import { Formik, Form } from 'formik'
import Routes from '@/constants/routes'
import { SearchParams, resultSetSearchParams } from '@/actions/result'

export interface ClientSearchMappedActions {
  setSearchParams: (params: SearchParams) => void
}

export type ClientSearchProps = ClientSearchMappedActions & RouteComponentProps

const { searchContainer } = searchStyle

const identityCheckList = [
  { label: 'Please select…', value: '' },
  { label: 'Pass', value: 'PASS' },
  { label: 'Fail', value: 'FAIL' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Cancelled', value: 'CANCELLED' },
  { label: 'Warnings', value: 'WARNINGS' },
  { label: 'Unchecked', value: 'UNCHECKED' }
]

export const ClientSearch: React.FunctionComponent<ClientSearchProps> = ({ setSearchParams, history }) => {
  const searchContacts = value => {
    setSearchParams(value)
    history.push(Routes.RESULTS)
  }

  return (
    <ErrorBoundary>
      <div className={searchContainer}>
        <h2 className="title is-2">Client Search</h2>
        <Formik
          initialValues={{ name: '', address: '', identityCheck: '' }}
          onSubmit={values => searchContacts(values)}
          render={({ values }) => {
            const disabled = !values.name && !values.address && !values.identityCheck
            return (
              <Form className="mb-8">
                <Input
                  id="name"
                  type="text"
                  placeholder="Firstname or Surname"
                  name="name"
                  labelText="Search by name"
                />
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
            )
          }}
        />
      </div>
    </ErrorBoundary>
  )
}

const mapDispatchToProps = (dispatch: any): ClientSearchMappedActions => ({
  setSearchParams: (params: SearchParams) => dispatch(resultSetSearchParams(params))
})

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(ClientSearch)
)
