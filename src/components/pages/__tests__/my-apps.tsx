import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { MyApps, MyAppsProps } from '../my-apps'
import { myAppsDataStub } from '@/sagas/__stubs__/my-apps'

const props: MyAppsProps = {
  myAppsState: {
    loading: false,
    myAppsData: myAppsDataStub
  }
}

describe('MyApps', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<MyApps {...props} />))).toMatchSnapshot()
  })
})
