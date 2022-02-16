import React from 'react'
import { shallow } from 'enzyme'
import { AppPipeline } from '../app-pipeline'

describe('App Pipeline', () => {
  it('should match snapshot', () => {
    expect(shallow(<AppPipeline />)).toMatchSnapshot()
  })
})
