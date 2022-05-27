import * as React from 'react'
import { render } from '../../../tests/react-testing'

import { Loader } from '@reapit/elements-legacy'

describe('Loader', () => {
  it('should match a snapshot', () => {
    expect(render(<Loader />)).toMatchSnapshot()
  })
})
