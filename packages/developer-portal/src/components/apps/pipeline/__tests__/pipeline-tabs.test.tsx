import React, { ChangeEvent } from 'react'
import { handleChangeTab, PipelineTabs } from '../pipeline-tabs'
import { render } from '../../../../tests/react-testing'
import Routes from '../../../../constants/routes'
import { History } from 'history'

describe('PipelineTabs', () => {
  it('should match snapshot', () => {
    expect(render(<PipelineTabs />)).toMatchSnapshot()
  })
})

describe('handleChangeTab', () => {
  it('should handle change tab', () => {
    const history = {
      push: jest.fn(),
    } as unknown as History
    const appId = 'MOCK_ID'

    const curried = handleChangeTab(history, appId)

    curried({
      target: {
        value: 'configure',
      },
    } as unknown as ChangeEvent<HTMLInputElement>)

    expect(history.push).toHaveBeenCalledWith(Routes.APP_PIPELINE_CONFIGURE.replace(':appId', appId))
  })
})
