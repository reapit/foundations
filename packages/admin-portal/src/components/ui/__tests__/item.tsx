import * as React from 'react'
import { shallow } from 'enzyme'

import { Loader } from '@reapit/elements-legacy'

describe('Loader', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Loader />)).toMatchSnapshot()
  })
})
