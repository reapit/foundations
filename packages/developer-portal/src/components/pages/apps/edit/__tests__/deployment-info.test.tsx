import React from 'react'
import { shallow } from 'enzyme'
import { PipelineDeploymentInfo } from '../deployment-info'
import { PackageManagerEnum } from '@reapit/foundations-ts-definitions'

describe('Deployment info', () => {
  it('Should match snapshot', () => {
    expect(
      shallow(
        <PipelineDeploymentInfo
          channel={{}}
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
