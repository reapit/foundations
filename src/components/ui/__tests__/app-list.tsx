import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { AppList, AppListProps } from '../app-list'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import Loader from '../loader'

// @ts-ignore: just pick needed props for the test
const props: AppListProps = {
  list: appsDataStub.data.data!
}

describe('AppList', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<AppList {...props} />))).toMatchSnapshot()
  })

  it('should show loading', () => {
    const wrapper = shallow(<AppList {...props} loading={true} />)
    expect(wrapper.find(Loader)).toHaveLength(1)
  })
})
