import React from 'react'
import { render } from '../../../../../tests/react-testing'
import { AppPipeline } from '../app-pipeline'

describe('AppPipeline', () => {
  it('should match snapshot', () => {
    expect(render(<AppPipeline />)).toMatchSnapshot()
  })
})
