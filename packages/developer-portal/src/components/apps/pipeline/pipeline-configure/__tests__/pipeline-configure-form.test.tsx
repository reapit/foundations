import React from 'react'
import {
  handlePipelineUpdate,
  PipelineConfigureForm,
  handleSavePipeline,
  handleUpdateSuccess,
  getDefaultValues,
} from '../pipeline-configure-form'
import { render } from '../../../../../tests/react-testing'
import Routes from '../../../../../constants/routes'
import { mockPipelineModelInterface } from '../../../../../tests/__stubs__/pipeline'
import { mockAppDetailModel } from '../../../../../tests/__stubs__/apps'
import { PackageManagerEnum } from '@reapit/foundations-ts-definitions'

jest.mock('../../../state/use-app-state')

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: jest.fn(() => ({
    connectSession: {
      idToken: 'MOCK_TOKEN',
    },
  })),
}))

describe('PipelineConfigure', () => {
  it('Should match snapshot', () => {
    expect(render(<PipelineConfigureForm />)).toMatchSnapshot()
  })
})

describe('handlePipelineUpdate', () => {
  it('should handle a pipeline update', async () => {
    const updatePipeline = jest.fn(() => new Promise<boolean>((resolve) => resolve(true)))
    const setAppPipelineSaving = jest.fn()
    const refresh = jest.fn()
    const appId = 'MOCK_ID'
    const values = {
      name: 'MOCK_NAME',
      branch: 'master',
      repository: { repositoryUrl: 'https://github.com/' },
      packageManager: PackageManagerEnum.NPM,
      buildCommand: 'build',
      outDir: 'build',
      runtime: 'NODE_16',
    }

    const curried = handlePipelineUpdate(updatePipeline, setAppPipelineSaving, refresh, appId)

    await curried(values)

    expect(updatePipeline).toHaveBeenCalledWith({
      ...values,
      appId,
      packageManager: 'npm',
      appType: 'react',
    })
  })
})

describe('handleUpdateSuccess', () => {
  it('should handle update success', () => {
    const navigate = jest.fn()
    const appId = 'MOCK_ID'
    const updateSuccessful = true

    const curried = handleUpdateSuccess(navigate, appId, updateSuccessful)

    curried()

    expect(navigate).toHaveBeenCalledWith(Routes.APP_PIPELINE.replace(':appId', appId))
  })
})

describe('handleSavePipeline', () => {
  it('should handle saving pipelines', () => {
    const submitHandler = jest.fn()
    const appPipelineSaving = true
    const setAppPipelineSaving = jest.fn()

    const curried = handleSavePipeline(submitHandler, appPipelineSaving, setAppPipelineSaving)

    curried()

    expect(submitHandler).toHaveBeenCalledTimes(1)
    expect(setAppPipelineSaving).toHaveBeenCalledWith(false)
  })
})

describe('getDefaultValues', () => {
  it('should handle getting default values where there is an a pipeline', () => {
    const values = getDefaultValues(mockPipelineModelInterface, mockAppDetailModel)

    const { name, branch, repository, buildCommand, packageManager, outDir } = mockPipelineModelInterface
    expect(values).toEqual({
      name,
      branch,
      repository,
      buildCommand,
      outDir,
      packageManager,
      runtime: 'NODE_16',
    })
  })

  it('should handle getting default values where there is no pipeline', () => {
    const values = getDefaultValues(null, mockAppDetailModel)

    expect(values).toEqual({
      name: mockAppDetailModel?.name,
      buildCommand: 'build',
      branch: 'main',
      outDir: 'build',
      packageManager: PackageManagerEnum.NPM,
      runtime: 'NODE_18',
    })
  })
})
