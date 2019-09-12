import * as React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Button } from '@reapit/elements'
import ErrorBoundary from '@/components/hocs/error-boundary'
import searchStyle from '@/styles/pages/client-search.scss?mod'
import { SearchParams } from '@/actions/result'

export type ClientSearchProps = RouteComponentProps<{ page?: any }>

const { searchContainer } = searchStyle
const identityCheckType = ['PASS', 'FAIL', 'PENDING', 'CANCELLED', 'WARNINGS', 'UNCHECKED']

export const ClientSearch: React.FunctionComponent<ClientSearchProps> = ({ history }) => {
  const [values, setValues] = React.useState<SearchParams>({ name: '', address: '', identityCheck: 'PASS' })

  const handleChange = evt => {
    setValues({ ...values, [evt.target.name]: evt.target.value })
  }

  const searchContacts = value => {
    history.push('/result', value)
  }

  return (
    <ErrorBoundary>
      <div className={searchContainer}>
        <h2 className="title is-2">Client Search</h2>
        <div className="field">
          <label className="label">Enter Name</label>
          <div className="control flex">
            <input
              className="input mr-4"
              type="text"
              name="name"
              placeholder="First or last name"
              value={values.name}
              onChange={handleChange}
            />
            <Button type="button" variant="primary" onClick={() => searchContacts({ name: values.name })}>
              Search
            </Button>
          </div>
        </div>
        <div className="field">
          <label className="label">Enter Address</label>
          <div className="control flex">
            <input
              className="input mr-4"
              type="text"
              name="address"
              placeholder="Streetname, Town or postcode"
              value={values.address}
              onChange={handleChange}
            />
            <Button type="button" variant="primary" onClick={() => searchContacts({ address: values.address })}>
              Search
            </Button>
          </div>
        </div>
        <div className="field">
          <label className="label">Enter Address</label>
          <div className="control">
            <div className="select is-primary mr-4">
              <select name="identityCheck" value={values.identityCheck} onChange={handleChange}>
                {identityCheckType.map(item => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
            <Button
              type="button"
              variant="primary"
              onClick={() => searchContacts({ identityCheck: values.identityCheck })}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default withRouter(ClientSearch)
