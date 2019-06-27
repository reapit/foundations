import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Developer, DeveloperProps } from '../developer'
import { developerDataStub } from '@/sagas/__stubs__/developer'

const props: DeveloperProps = {
  logout: jest.fn(),
  developerState: {
    loading: false,
    developerData: developerDataStub
  }
}

describe('Developer', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Developer {...props} />))).toMatchSnapshot()
  })
})
