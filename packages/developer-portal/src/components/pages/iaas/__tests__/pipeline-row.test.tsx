import React from 'react'
import { render } from '../../../../tests/react-testing'
import { PipelineRow } from '../pipeline-row'

describe('PipelineRow', () => {
  it('should match snapshot', () => {
    expect(
      render(
        <PipelineRow
          pipeline={{
            buildStatus: 'IN_PROGRESS',
          }}
        />,
      ),
    ).toMatchSnapshot()
  })
})
