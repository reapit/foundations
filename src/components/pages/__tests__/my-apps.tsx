import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { MyApps, MyAppsProps } from '../my-apps'
import { appsDataStub } from '@/sagas/__stubs__/apps'

const props: MyAppsProps = {
  myAppsState: {
    loading: false,
    myAppsData: appsDataStub
  },
  // @ts-ignore: just pick the needed props for the test
  match: {
    params: {
      page: '2'
    }
  }
}

describe('MyApps', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<MyApps {...props} />))).toMatchSnapshot()
  })
})
