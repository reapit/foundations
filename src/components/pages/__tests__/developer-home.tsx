import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { DeveloperHome, DeveloperProps } from '../developer-home'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { appPermissionStub } from '@/sagas/__stubs__/app-permission'

const props: DeveloperProps = {
  developerState: {
    loading: false,
    developerData: {
      ...appsDataStub,
      scopes: appPermissionStub
    },
    formState: 'PENDING'
  },
  // @ts-ignore: just pick the needed props for the test
  match: {
    params: {
      page: '2'
    }
  }
}

describe('DeveloperHome', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<DeveloperHome {...props} />))).toMatchSnapshot()
  })
})
