import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { MyApps, MyAppsProps } from '../my-apps'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { MyAppsItem } from '@/reducers/my-apps'

const mockProps = (loading: boolean, appData: MyAppsItem | null): MyAppsProps => ({
  myAppsState: {
    loading: loading,
    myAppsData: appData
  },
  // @ts-ignore: just pick the needed props for the test
  match: {
    params: {
      page: '2'
    }
  }
})

describe('MyApps', () => {
  it('should match a snapshot when LOADING false', () => {
    expect(toJson(shallow(<MyApps {...mockProps(true, appsDataStub)} />))).toMatchSnapshot()
  })

  it('should match a snapshot when LOADING true', () => {
    expect(toJson(shallow(<MyApps {...mockProps(true, null)} />))).toMatchSnapshot()
  })
})
