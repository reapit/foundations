import React from 'react'
import { render } from '../../../../tests/react-testing'
import { CreatePipeline, pipelineCreateFormHandle } from '../create-pipeline'

describe('CreatePipeline', () => {
  it('Should match snapshot', () => {
    expect(render(<CreatePipeline appId={'12345'} refreshPipeline={() => {}} />)).toMatchSnapshot()
  })

  it('Form should call refresh on success', async () => {
    const mockRefresh = jest.fn()

    await pipelineCreateFormHandle(
      (values: any) => Promise.resolve(true), // eslint-disable-line no-unused-vars
      mockRefresh,
      'app-id',
    )({})
    expect(mockRefresh).toHaveBeenCalled()
  })

  it('Form should not call refresh on error', async () => {
    const mockRefresh = jest.fn()

    await pipelineCreateFormHandle(
      (values: any) => Promise.resolve(false), // eslint-disable-line no-unused-vars
      mockRefresh,
      'app-id',
    )({})
    expect(mockRefresh).toBeCalledTimes(0)
  })
})
