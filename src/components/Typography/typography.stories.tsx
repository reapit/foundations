import React from 'react'

import { storiesOf } from '@storybook/react'
import { H1, H2, H3, H4, H5, H6, SubTitleH1, SubTitleH2, SubTitleH3, SubTitleH4, SubTitleH5, SubTitleH6 } from '.'

storiesOf('Typography', module).add('Titles', () => {
  return (
    <section className="section">
      <H1>I am a H1</H1>
      <H2>I am a H2</H2>
      <H3>I am a H3</H3>
      <H4>I am a H4</H4>
      <H5>I am a H5</H5>
      <H6>I am a H6</H6>
    </section>
  )
})

storiesOf('Typography', module).add('SubTitles', () => {
  return (
    <section className="section">
      <SubTitleH1>I am a SubTitle H1</SubTitleH1>
      <SubTitleH2>I am a SubTitle H2</SubTitleH2>
      <SubTitleH3>I am a SubTitle H3</SubTitleH3>
      <SubTitleH4>I am a SubTitle H4</SubTitleH4>
      <SubTitleH5>I am a SubTitle H5</SubTitleH5>
      <SubTitleH6>I am a SubTitle H6</SubTitleH6>
    </section>
  )
})

storiesOf('Typography', module).add('TileSubTitleCombo', () => {
  return (
    <section className="section">
      <section className="section">
        <H1>I am a H1</H1>
        <SubTitleH3>I am a SubTitle H3</SubTitleH3>
      </section>
      <section className="section">
        <H4>I am a H4</H4>
        <SubTitleH6>I am a SubTitle H6</SubTitleH6>
      </section>
    </section>
  )
})
