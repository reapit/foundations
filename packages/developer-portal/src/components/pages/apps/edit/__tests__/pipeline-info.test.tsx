import React from 'react'
import { render } from '../../../../../tests/react-testing'
import { PipelineInfo } from '../pipeline-info'

describe('Pipelineinfo', () => {
  it('Should match snapshot', () => {
    expect(
      render(
        <PipelineInfo
          pipeline={{
            id: 'pipelineId',
            buildStatus: 'IN_PROGRESS',
          }}
        />,
      ),
    ).toMatchSnapshot()
  })
})
