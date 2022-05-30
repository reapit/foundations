import React from 'react'
import { render } from '@testing-library/react'
import { Title, Subtitle, BodyText, SmallText } from '..'

describe('Typography components', () => {
  it('Title should match a snapshot', () => {
    const wrapper = render(<Title>I am a title</Title>)
    expect(wrapper).toMatchSnapshot()
  })

  it('SubTitle should match a snapshot', () => {
    const wrapper = render(<Subtitle>I am a subtitle</Subtitle>)
    expect(wrapper).toMatchSnapshot()
  })

  it('BodyText should match a snapshot', () => {
    const wrapper = render(<BodyText>I am body text</BodyText>)
    expect(wrapper).toMatchSnapshot()
  })

  it('SmallText should match a snapshot', () => {
    const wrapper = render(<SmallText>I am small text</SmallText>)
    expect(wrapper).toMatchSnapshot()
  })

  it('SmallText should match a snapshot', () => {
    const wrapper = render(<SmallText>I am small text</SmallText>)
    expect(wrapper).toMatchSnapshot()
  })

  it('Title should match a snapshot with all modifiers', () => {
    const wrapper = render(
      <Title hasGreyText hasRegularText hasItalicText hasNoMargin hasCenteredText hasSectionMargin>
        I am a title
      </Title>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('SubTitle should match a snapshot with all modifiers', () => {
    const wrapper = render(
      <Subtitle hasGreyText hasBoldText hasItalicText hasNoMargin hasCenteredText hasSectionMargin>
        I am a subtitle
      </Subtitle>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('BodyText should match a snapshot with all modifiers', () => {
    const wrapper = render(
      <BodyText hasGreyText hasBoldText hasItalicText hasNoMargin hasCenteredText hasSectionMargin>
        I am body text
      </BodyText>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('SmallText should match a snapshot with all modifiers', () => {
    const wrapper = render(
      <SmallText hasGreyText hasBoldText hasItalicText hasNoMargin hasCenteredText hasSectionMargin>
        I am small text
      </SmallText>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('SmallText should match a snapshot with all modifiers', () => {
    const wrapper = render(
      <SmallText hasGreyText hasBoldText hasItalicText hasNoMargin hasCenteredText hasSectionMargin>
        I am small text
      </SmallText>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
