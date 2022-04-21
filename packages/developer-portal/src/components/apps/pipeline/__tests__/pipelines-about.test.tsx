import React from 'react'
import { PipelinesAbout } from '../pipelines-about'
import { render } from '../../../../tests/react-testing'

describe('PipelinesAbout', () => {
  it('should match snapshot', () => {
    expect(render(<PipelinesAbout />)).toMatchSnapshot()
  })
})
