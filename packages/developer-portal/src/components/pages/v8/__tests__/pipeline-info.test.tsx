import React from 'react'
import { shallow } from 'enzyme'
import { PipelineInfo } from '../pipeline/pipeline-info'

describe('Pipeline info', () => {
  it('Should match snapshot', () => {
    expect(
      shallow(
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
