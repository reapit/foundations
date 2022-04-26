import React from 'react'
import { TaskList } from '../pipeline-tasks-list'
import { render } from '../../../../tests/react-testing'
import { mockPipelineRunnerResponse } from '../../../../tests/__stubs__/pipeline'

describe('TaskList', () => {
  it('should match snapshot with tasks', () => {
    expect(render(<TaskList tasks={mockPipelineRunnerResponse.items[0].tasks} />)).toMatchSnapshot()
  })

  it('should match snapshot with no tasks', () => {
    expect(render(<TaskList tasks={[]} />)).toMatchSnapshot()
  })
})
