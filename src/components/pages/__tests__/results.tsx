import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { PagedResultContactModel_ } from '@/types/contact-api-schema'
import { Result, ResultProps } from '../results'
import { contacts } from '@/sagas/__stubs__/contacts'

const props = (loading: boolean, contacts: PagedResultContactModel_ | null): ResultProps => ({
  resultState: {
    loading: loading,
    search: { name: '1' },
    contacts: contacts
  },
  fetchContacts: jest.fn(),
  setSearchParams: jest.fn(),
  // @ts-ignore: just pick the needed props for the test
  location: {
    state: {
      name: '1'
    }
  }
})

describe('Result', () => {
  it('should match a snapshot when LOADING true', () => {
    expect(toJson(shallow(<Result {...props(true, null)} />))).toMatchSnapshot()
  })

  it('should match a snapshot when LOADING false', () => {
    expect(toJson(shallow(<Result {...props(false, contacts)} />))).toMatchSnapshot()
  })
})
