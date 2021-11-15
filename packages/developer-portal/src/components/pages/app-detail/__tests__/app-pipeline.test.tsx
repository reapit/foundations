import React from 'react'
import { shallow } from 'enzyme'
import { AppPipeline } from '../pipeline'

describe('App Pipeline', () => {
  it('should match snapshot', () => {
    expect(shallow(<AppPipeline />)).toMatchSnapshot()
  })
})
