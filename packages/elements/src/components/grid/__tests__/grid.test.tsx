import React from 'react'
import { render } from '@testing-library/react'
import { Grid, Col, ColSplit } from '../grid'

describe('Grid', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <Grid>
        <p>I am child</p>
      </Grid>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Col', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <Col>
        <p>I am child</p>
      </Col>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('ColSplit', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <ColSplit>
        <p>I am child</p>
      </ColSplit>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
