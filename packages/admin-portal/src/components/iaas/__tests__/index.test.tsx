import { useReapitGet } from '@reapit/use-reapit-data'
import React from 'react'
import { render } from '../../../tests/react-testing'
import { mockPipelineRunnerResponse } from '../../../tests/__stubs__/pipelines'
import { handleDeletePipeline, handleOpenModal, IaaS } from '../index'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [null, false]),
  useReapitUpdate: jest.fn(() => [undefined, undefined, jest.fn()]),
}))

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: () => ({
    connectSession: {
      idToken: 'MOCK_TOKEN',
      loginIdentity: {
        developerId: 'MOCK_DEVELOPER_ID',
      },
    },
    connectInternalRedirect: '',
  }),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('IaaS', () => {
  it('should match snapshot with pipelines', () => {
    mockUseReapitGet.mockReturnValue([mockPipelineRunnerResponse, false])
    expect(render(<IaaS />)).toMatchSnapshot()
  })

  it('should match snapshot when loading', () => {
    mockUseReapitGet.mockReturnValue([null, true])
    expect(render(<IaaS />)).toMatchSnapshot()
  })
})

describe('handleDeletePipeline', () => {
  it('handleDeletePipeline should correctly delete pipeline', async () => {
    const deletePipeline = jest.fn(() => Promise.resolve(true))
    const closeModal = jest.fn()
    const refreshPipelines = jest.fn()

    const curried = handleDeletePipeline(deletePipeline, closeModal, refreshPipelines)

    curried()

    await Promise.resolve()

    expect(deletePipeline).toHaveBeenCalledTimes(1)
    expect(closeModal).toHaveBeenCalledTimes(1)
    expect(refreshPipelines).toHaveBeenCalledTimes(1)
  })
})

describe('handleOpenModal', () => {
  it('handleOpenModal should correctly open modal', () => {
    const setAppId = jest.fn()
    const openModal = jest.fn()
    const appId = 'MOCK_ID'
    const curried = handleOpenModal(setAppId, openModal, appId)

    curried()

    expect(setAppId).toHaveBeenCalledWith(appId)
    expect(openModal).toHaveBeenCalledTimes(1)
  })
})
