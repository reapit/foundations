import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import AppHeader, { AppHeaderProps } from '../ui-app-header'

const mockProps: AppHeaderProps = {
  appDetailData: {
    ...appDetailDataStub.data,
    apiKey: '',
  },
}

describe('AppHeader', () => {
  it('should match a snapshot', () => {
    expect(render(<AppHeader {...mockProps} />)).toMatchSnapshot()
  })
})
