import React from 'react'
import { shallow } from 'enzyme'
import { PackageManagerEnum } from '@reapit/foundations-ts-definitions'
import { PipelineDeploymentTable, pipelineRunnerSetter } from '../pipeline/pipeline-runner-table'

describe('Pipeline Deployment Table', () => {
  it('Should match snapshot', () => {
    expect(
      shallow(
        <PipelineDeploymentTable
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
          loading={false}
          initialDeployments={null}
          newRunner={undefined}
        />,
      ),
    ).toMatchSnapshot()
  })

  describe('Pipeline deployments initial values', () => {
    it('Will skip if initial deployments are null', () => {
      const fn = jest.fn()

      const result = pipelineRunnerSetter({
        initialDeployments: null,
        setPagination: fn,
      })

      result()

      expect(fn).not.toHaveBeenCalled()
    })

    it('Will skip if current deployments are not set', () => {
      const fn = jest.fn()

      const result = pipelineRunnerSetter({
        initialDeployments: {
          items: [
            {
              id: 'pipelineRunnerId',
              tasks: [],
            },
          ],
        },
        setPagination: fn,
      })

      result()

      expect(fn).toHaveBeenCalled()
    })

    it('Can set initial deployments if current values are previously set', () => {
      const result = pipelineRunnerSetter({
        initialDeployments: {
          items: [
            {
              id: 'pipelineRunnerId',
              tasks: [],
            },
          ],
        },
        setPagination: (value) => {
          // @ts-ignore
          const result = value({ items: [{ id: 'pipelineRunnerId', tasks: [] }] })
          expect(result).toStrictEqual({ items: [{ id: 'pipelineRunnerId', tasks: [] }] })
        },
      })

      result()
    })
  })
})
