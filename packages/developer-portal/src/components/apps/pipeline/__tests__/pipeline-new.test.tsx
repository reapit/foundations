import React from 'react'
import { render, setViewport } from '../../../../tests/react-testing'
import { PipelineNew } from '../pipeline-new'

jest.mock('../../state/use-app-state')

describe('PipelineNew', () => {
  it('Should match snapshot', () => {
    expect(render(<PipelineNew />)).toMatchSnapshot()
  })

  it('should match snapshot for mobile view', () => {
    const testElem = document.createElement('div')
    testElem.id = 'root'
    document.body.appendChild(testElem)

    setViewport('Mobile')
    expect(render(<PipelineNew />)).toMatchSnapshot()
  })
})
