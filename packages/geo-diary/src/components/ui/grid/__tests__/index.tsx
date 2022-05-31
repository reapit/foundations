import * as React from 'react'
import { render } from '../../../../tests/react-testing'
import Grid, { Col } from '../'

describe('Grid component', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <Grid>
        <p>I am child</p>
      </Grid>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Col component', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = render(
      <Col>
        <p>I am child</p>
      </Col>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render with the correct classNames when supplied span and offset props', () => {
    const wrapper = render(
      <Col span={4} offset={2}>
        <p>I am child</p>
      </Col>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
