import React from 'react'
import { PipelineDeploymentInfo } from '../deployment-info'
import { PackageManagerEnum } from '@reapit/foundations-ts-definitions'
import { render } from '../../../../../tests/react-testing'

describe('PipelineDeploymentInfo', () => {
  it('Should match snapshot', () => {
    expect(
      render(
        <PipelineDeploymentInfo
          setPipeline={() => {}}
          channel={{ bind: jest.fn(), unbind: jest.fn() }}
          pipeline={{
            id: 'pipelineId',
            buildStatus: 'IN_PORGRESS',
            repository: 'https://github.com/bashleigh/reapit-react-test',
            packageManager: PackageManagerEnum.YARN,
            buildCommand: 'build',
            outDir: 'build',
            subDomain: 'sub-domain',
          }}
        />,
      ),
    ).toMatchSnapshot()
  })
})
