import React from 'react'
import { shallow } from 'enzyme'
import { CreatePipeline, pipelineCreateFormHandle } from '../pipeline/create-pipeline'

describe('App Pipeline Create', () => {
  it('Should match snapshot', () => {
    expect(shallow(<CreatePipeline appId={'12345'} refreshPipeline={() => {}} />)).toMatchSnapshot()
  })

  it('Form should call refresh on success', async () => {
    const mockRefresh = jest.fn()

    await pipelineCreateFormHandle(
      (values: any) => Promise.resolve(true), // eslint-disable-line no-unused-vars
      mockRefresh,
    )({})
    expect(mockRefresh).toHaveBeenCalled()
  })

  it('Form should not call refresh on error', async () => {
    const mockRefresh = jest.fn()

    await pipelineCreateFormHandle(
      (values: any) => Promise.resolve(false), // eslint-disable-line no-unused-vars
      mockRefresh,
    )({})
    expect(mockRefresh).toBeCalledTimes(0)
  })
})
