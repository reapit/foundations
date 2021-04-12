import * as React from 'react'
import { shallow } from 'enzyme'
import ProjectorApp from '../projectorApp'

describe('ProjectorApp', () => {
  it('should match a snapshot', () => {
    expect(shallow(<ProjectorApp />)).toMatchSnapshot()
  })
})
