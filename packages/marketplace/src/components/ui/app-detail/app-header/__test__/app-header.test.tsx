import * as React from 'react'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import AppHeader, { AppHeaderProps } from '../app-header'
import { shallow } from 'enzyme'

const mockProps: AppHeaderProps = {
  appDetailData: {
    ...appDetailDataStub.data,
    apiKey: '',
  },
}

describe('AppContent', () => {
  it('should match a snapshot', () => {
    expect(shallow(<AppHeader {...mockProps} />)).toMatchSnapshot()
  })
})
