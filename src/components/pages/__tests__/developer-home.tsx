import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { DeveloperHome, DeveloperHomeProps } from '../developer-home'
import { developerDataStub } from '@/sagas/__stubs__/developer'

const props: DeveloperHomeProps = {
  developerState: {
    loading: false,
    developerData: developerDataStub
  }
}

describe('DeveloperHome', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<DeveloperHome {...props} />))).toMatchSnapshot()
  })
})
