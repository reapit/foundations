import * as React from 'react'
import { shallow } from 'enzyme'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import ClientAppHeader, { ClientAppHeaderProps } from '../client-app-header'

const mockProps: ClientAppHeaderProps = {
  appDetailData: {
    ...appDetailDataStub.data,
    apiKey: '',
  },
}

describe('ClientAppHeader', () => {
  it('should match a snapshot', () => {
    expect(shallow(<ClientAppHeader {...mockProps} />)).toMatchSnapshot()
  })
})
