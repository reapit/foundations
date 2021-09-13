import React from 'react'
import { shallow } from 'enzyme'
import { Grid, Col, ColSplit } from '../grid'

describe('Grid', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = shallow(
      <Grid>
        <p>I am child</p>
      </Grid>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Col', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = shallow(
      <Col>
        <p>I am child</p>
      </Col>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('ColSplit', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = shallow(
      <ColSplit>
        <p>I am child</p>
      </ColSplit>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
