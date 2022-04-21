import React from 'react'
import { render } from '../../../../tests/react-testing'
import { PipelineNew } from '../pipeline-new'

jest.mock('../../state/use-app-state')

describe('PipelineNew', () => {
  it('Should match snapshot', () => {
    expect(render(<PipelineNew />)).toMatchSnapshot()
  })
})
