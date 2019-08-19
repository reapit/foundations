import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { AppDetail, AppDetailProps } from '../app-detail'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { FormState } from '@/types/core'

const props = (isClient: boolean, formState: FormState, installedOn?: string): AppDetailProps => ({
  data: { ...appDetailDataStub.data, installedOn: installedOn },
  fetchAppPermission: jest.fn(),
  setAppDetailModalStatePermission: jest.fn(),
  requestUninstall: jest.fn(),
  isCurrentLoggedUserClient: isClient,
  appUninstallFormState: formState
})

describe('AppDetailModalInner', () => {
  it('should match a snapshot when isCurrentLoggedUserClient true', () => {
    expect(toJson(shallow(<AppDetail {...props(true, 'PENDING')} />))).toMatchSnapshot()
  })

  it('should match a snapshot when isCurrentLoggedUserClient true and app installed', () => {
    expect(toJson(shallow(<AppDetail {...props(true, 'PENDING', '2019-08-15T08:38:58')} />))).toMatchSnapshot()
  })

  it('should match a snapshot when isCurrentLoggedUserClient false', () => {
    expect(toJson(shallow(<AppDetail {...props(false, 'PENDING')} />))).toMatchSnapshot()
  })
})
