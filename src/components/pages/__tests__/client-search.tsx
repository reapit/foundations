import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { ClientSearch, ClientSearchProps } from '../client-search'

const props: ClientSearchProps = {
  setSearchParams: jest.fn(),
  // @ts-ignore: just pick the needed props for the test
  history: {}
}

describe('ClientSearch', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<ClientSearch {...props} />))).toMatchSnapshot()
  })
})
