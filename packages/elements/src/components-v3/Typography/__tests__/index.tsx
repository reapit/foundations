import * as React from 'react'
import { shallow } from 'enzyme'
import { Title, Subtitle, BodyText, SmallText } from '../'

describe('Typography components', () => {
  it('Title should match a snapshot', () => {
    const wrapper = shallow(<Title>I am a title</Title>)
    expect(wrapper).toMatchSnapshot()
  })
  it('SubTitle should match a snapshot', () => {
    const wrapper = shallow(<Subtitle>I am a subtitle</Subtitle>)
    expect(wrapper).toMatchSnapshot()
  })
  it('BodyText should match a snapshot', () => {
    const wrapper = shallow(<BodyText>I am body text</BodyText>)
    expect(wrapper).toMatchSnapshot()
  })
  it('SmallText should match a snapshot', () => {
    const wrapper = shallow(<SmallText>I am small text</SmallText>)
    expect(wrapper).toMatchSnapshot()
  })
})
