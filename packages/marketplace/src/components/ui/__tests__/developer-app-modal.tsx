import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import {
  DeveloperAppModalInner,
  DeveloperAppInnerProps,
  DeveloperAppModal,
  DeveloperAppModalProps
} from '../developer-app-modal'

// @ts-ignore: just need to pick relevant props to test
const daiProps = (loading: boolean, error: boolean): DeveloperAppInnerProps => ({
  appDetailState: {
    loading,
    error,
    appDetailData: { data: appDetailDataStub.data },
    authentication: {
      loading: false,
      code: ''
    },
    isStale: false
  },
  closeParentModal: jest.fn(),
  // @ts-ignore: just pick the needed props for the test
  history: {
    push: jest.fn()
  }
})

describe('DeveloperAppModalInner', () => {
  it('should match a snapshot when LOADING true', () => {
    expect(toJson(shallow(<DeveloperAppModalInner {...daiProps(true, false)} />))).toMatchSnapshot()
  })

  it('should match a snapshot when LOADING false', () => {
    expect(toJson(shallow(<DeveloperAppModalInner {...daiProps(false, false)} />))).toMatchSnapshot()
  })

  it('should match a snapshot when ERROR true', () => {
    expect(toJson(shallow(<DeveloperAppModalInner {...daiProps(false, true)} />))).toMatchSnapshot()
  })
})

// @ts-ignore: just need to pick relevant props to test
const damProps = (): DeveloperAppModalProps => ({
  afterClose: jest.fn(),
  // @ts-ignore: just pick the needed props for the test
  history: {
    push: jest.fn()
  }
})

describe('DeveloperAppModal', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<DeveloperAppModal {...damProps()} />))).toMatchSnapshot()
  })
})
