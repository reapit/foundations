import React from 'react'

import { storiesOf } from '@storybook/react'
import { H1, H2, H3, H4, H5, H6, SubTitleH1, SubTitleH2, SubTitleH3, SubTitleH4, SubTitleH5, SubTitleH6 } from '.'
import { Section } from '@/components/Layout'

storiesOf('Typography', module).add('Titles', () => {
  return (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
      <H1>I am a H1</H1>
      <H2>I am a H2</H2>
      <H3>I am a H3</H3>
      <H4>I am a H4</H4>
      <H5>I am a H5</H5>
      <H6>I am a H6</H6>
    </Section>
  )
})

storiesOf('Typography', module).add('TitlesCentered', () => {
  return (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
      <H1 isCentered>I am a H1</H1>
      <H2 isCentered>I am a H2</H2>
      <H3 isCentered>I am a H3</H3>
      <H4 isCentered>I am a H4</H4>
      <H5 isCentered>I am a H5</H5>
      <H6 isCentered>I am a H6</H6>
    </Section>
  )
})

storiesOf('Typography', module).add('SubTitles', () => {
  return (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
      <SubTitleH1>I am a SubTitle H1</SubTitleH1>
      <SubTitleH2>I am a SubTitle H2</SubTitleH2>
      <SubTitleH3>I am a SubTitle H3</SubTitleH3>
      <SubTitleH4>I am a SubTitle H4</SubTitleH4>
      <SubTitleH5>I am a SubTitle H5</SubTitleH5>
      <SubTitleH6>I am a SubTitle H6</SubTitleH6>
    </Section>
  )
})

storiesOf('Typography', module).add('SubTitlesCentered', () => {
  return (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
      <SubTitleH1 isCentered>I am a SubTitle H1</SubTitleH1>
      <SubTitleH2 isCentered>I am a SubTitle H2</SubTitleH2>
      <SubTitleH3 isCentered>I am a SubTitle H3</SubTitleH3>
      <SubTitleH4 isCentered>I am a SubTitle H4</SubTitleH4>
      <SubTitleH5 isCentered>I am a SubTitle H5</SubTitleH5>
      <SubTitleH6 isCentered>I am a SubTitle H6</SubTitleH6>
    </Section>
  )
})

storiesOf('Typography', module).add('TileSubTitleCombo', () => {
  return (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
      <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
        <H1>I am a H1</H1>
        <SubTitleH3>I am a SubTitle H3</SubTitleH3>
      </Section>
      <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
        <H4>I am a H4</H4>
        <SubTitleH6>I am a SubTitle H6</SubTitleH6>
      </Section>
    </Section>
  )
})
