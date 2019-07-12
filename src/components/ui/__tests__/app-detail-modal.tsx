import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { AppDetailInner, AppDetailInnerProps } from '../app-detail-modal'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'

const props = (loading: boolean, error: boolean): AppDetailInnerProps => ({
  appDetailState: { loading, error, appDetailData: { data: appDetailDataStub.data } }
})

describe('AppDetailModalInner', () => {
  it('should match a snapshot when LOADING true', () => {
    expect(toJson(shallow(<AppDetailInner {...props(true, false)} />))).toMatchSnapshot()
  })

  it('should match a snapshot when LOADING false', () => {
    expect(toJson(shallow(<AppDetailInner {...props(false, false)} />))).toMatchSnapshot()
  })

  it('should match a snapshot when ERROR true', () => {
    expect(toJson(shallow(<AppDetailInner {...props(false, true)} />))).toMatchSnapshot()
  })
})
