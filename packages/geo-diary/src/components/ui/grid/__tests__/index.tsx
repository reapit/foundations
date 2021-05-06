import * as React from 'react'
import { shallow } from 'enzyme'
import Grid, { Col } from '../'

describe('Grid component', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = shallow(
      <Grid>
        <p>I am child</p>
      </Grid>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('Col component', () => {
  it('should match a snapshot and render children', () => {
    const wrapper = shallow(
      <Col>
        <p>I am child</p>
      </Col>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should render with the correct classNames when supplied span and offset props', () => {
    const wrapper = shallow(
      <Col span={4} offset={2}>
        <p>I am child</p>
      </Col>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
