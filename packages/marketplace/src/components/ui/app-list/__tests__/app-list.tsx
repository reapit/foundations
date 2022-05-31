import * as React from 'react'
import { render } from '../../../../tests/react-testing'

import { AppList, AppListProps } from '../app-list'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'

const props: AppListProps = {
  list: appsDataStub.data as AppSummaryModel[],
  loading: false,
  onCardClick: jest.fn(),
  onSettingsClick: jest.fn(),
  infoType: 'CLIENT_APPS_EMPTY',
}

describe('AppList', () => {
  it('should match a snapshot', () => {
    expect(render(<AppList {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot when use empty infoType', () => {
    expect(render(<AppList {...props} infoType={''} />)).toMatchSnapshot()
  })
})
