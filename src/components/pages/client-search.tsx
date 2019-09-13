import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Button, Input, SelectBox } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import searchStyle from '@/styles/pages/client-search.scss?mod'
import { Formik, Form } from 'formik'

export type ClientSearchProps = RouteComponentProps<{ page?: any }>

const { searchContainer } = searchStyle

const identityCheckList = [
  { label: 'Please select', value: '' },
  { label: 'Pass', value: 'PASS' },
  { label: 'Fail', value: 'FAIL' },
  { label: 'Pending', value: 'PENDING' },
  { label: 'Cancelled', value: 'CANCELLED' },
  { label: 'Warnings', value: 'WARNINGS' },
  { label: 'Unchecked', value: 'UNCHECKED' }
]

export const ClientSearch: React.FunctionComponent<ClientSearchProps> = ({ history }) => {
  const searchContacts = value => {
    history.push('/result', value)
  }

  return (
    <ErrorBoundary>
      <div className={searchContainer}>
        <h2 className="title is-2">Client Search</h2>
        <Formik
          initialValues={{ name: '' }}
          onSubmit={values => searchContacts(values)}
          render={() => (
            <Form className="mb-8">
              <Input id="name" type="text" placeholder="First or last name" name="name" labelText="Enter name" />
              <Button type="submit" variant="primary">
                Search
              </Button>
            </Form>
          )}
        />
        <Formik
          initialValues={{ address: '' }}
          onSubmit={values => searchContacts(values)}
          render={() => (
            <Form className="mb-8">
              <Input
                id="address"
                type="text"
                placeholder="Streetname, Town or postcode"
                name="address"
                labelText="Enter address"
              />
              <Button type="submit" variant="primary">
                Search
              </Button>
            </Form>
          )}
        />
        <Formik
          initialValues={{ identityCheck: '' }}
          onSubmit={values => searchContacts(values)}
          render={() => (
            <Form>
              <SelectBox id="identityCheck" name="identityCheck" labelText="ID Status" options={identityCheckList} />
              <Button type="submit" variant="primary">
                Search
              </Button>
            </Form>
          )}
        />
      </div>
    </ErrorBoundary>
  )
}

export default withRouter(ClientSearch)
