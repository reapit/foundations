import React, { ChangeEvent } from 'react'
import { handleChangeTab, PipelineTabs } from '../pipeline-tabs'
import { render } from '../../../../tests/react-testing'
import Routes from '../../../../constants/routes'

describe('PipelineTabs', () => {
  it('should match snapshot', () => {
    expect(render(<PipelineTabs />)).toMatchSnapshot()
  })
})

describe('handleChangeTab', () => {
  it('should handle change tab', () => {
    const navigate = jest.fn()
    const appId = 'MOCK_ID'

    const curried = handleChangeTab(navigate, appId)

    curried({
      target: {
        value: 'configure',
      },
    } as unknown as ChangeEvent<HTMLInputElement>)

    expect(navigate).toHaveBeenCalledWith(Routes.APP_PIPELINE_CONFIGURE.replace(':appId', appId))
  })
})
