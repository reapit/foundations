import React from 'react'
import { render } from '../../../../tests/react-testing'
import { PipelineInfo } from '../pipeline-info'

jest.mock('../../state/use-app-state')
jest.mock('../../../../core/use-global-state')

describe('Pipelineinfo', () => {
  it('Should match snapshot', () => {
    expect(render(<PipelineInfo />)).toMatchSnapshot()
  })
})
