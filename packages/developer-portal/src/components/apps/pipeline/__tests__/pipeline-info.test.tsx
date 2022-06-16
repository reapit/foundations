import React from 'react'
import { render } from '../../../../tests/react-testing'
import { getAppFromPipeline, PipelineInfo } from '../pipeline-info'

jest.mock('../../state/use-app-state')
jest.mock('../../../../core/use-global-state')

describe('Pipelineinfo', () => {
  it('Should match snapshot', () => {
    expect(render(<PipelineInfo />)).toMatchSnapshot()
  })
})

describe('getAppFromPipeline', () => {
  const options = [
    {
      isGithub: false,
      appEnv: 'production',
      url: 'https://bitbucket.org/site/addons/authorize?addon_key=reapit',
    },
    {
      isGithub: false,
      appEnv: 'development',
      url: 'https://bitbucket.org/site/addons/authorize?addon_key=reapit-dev',
    },
    {
      isGithub: true,
      appEnv: 'production',
      url: 'https://github.com/apps/reapit',
    },
    {
      isGithub: true,
      appEnv: 'development',
      url: 'https://github.com/apps/reapit-dev',
    },
  ]

  options.forEach((option) => {
    it('should return the correct urls', () => {
      window.reapit.config.appEnv = option.appEnv as 'production' | 'development' | 'local'
      expect(getAppFromPipeline(option.isGithub)).toEqual(option.url)
    })
  })
})
