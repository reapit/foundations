import * as React from 'react'
import { shallow } from 'enzyme'

import { Loader } from '@reapit/elements'

describe('Loader', () => {
  it('should match a snapshot', () => {
    expect(shallow(<Loader />)).toMatchSnapshot()
  })
})
