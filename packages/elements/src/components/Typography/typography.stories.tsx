import React from 'react'
import { Story } from '@storybook/react/types-6-0'

import { H1, H2, H3, H4, H5, H6, SubTitleH1, SubTitleH2, SubTitleH3, SubTitleH4, SubTitleH5, SubTitleH6 } from '.'
import { Section } from '@/components/Layout'

export default {
  title: 'Rereshed-Docs/Typography',
  component: H1,
  subcomponents: { H2, H3, H4, H5, H6, SubTitleH1, SubTitleH2, SubTitleH3, SubTitleH4, SubTitleH5, SubTitleH6 },
}

export const Titles: Story = args => (
  <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
    <H1 {...args}>I am a H1</H1>
    <H2 {...args}>I am a H2</H2>
    <H3 {...args}>I am a H3</H3>
    <H4 {...args}>I am a H4</H4>
    <H5 {...args}>I am a H5</H5>
    <H6 {...args}>I am a H6</H6>
  </Section>
)
Titles.args = {
  className: '',
  id: '',
  isCentered: false,
  isHeadingSection: false,
}

export const TitlesCentered: Story = args => (
  <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
    <H1 {...args}>I am a H1</H1>
    <H2 {...args}>I am a H2</H2>
    <H3 {...args}>I am a H3</H3>
    <H4 {...args}>I am a H4</H4>
    <H5 {...args}>I am a H5</H5>
    <H6 {...args}>I am a H6</H6>
  </Section>
)
TitlesCentered.args = {
  className: '',
  id: '',
  isCentered: true,
  isHeadingSection: false,
}

export const SubTitles: Story = args => (
  <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
    <SubTitleH1 {...args}>I am a H1</SubTitleH1>
    <SubTitleH2 {...args}>I am a H2</SubTitleH2>
    <SubTitleH3 {...args}>I am a H3</SubTitleH3>
    <SubTitleH4 {...args}>I am a H4</SubTitleH4>
    <SubTitleH5 {...args}>I am a H5</SubTitleH5>
    <SubTitleH6 {...args}>I am a H6</SubTitleH6>
  </Section>
)
SubTitles.args = {
  className: '',
  id: '',
  isCentered: false,
  isHeadingSection: false,
}

export const SubTitlesCentered: Story = args => (
  <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
    <SubTitleH1 {...args}>I am a H1</SubTitleH1>
    <SubTitleH2 {...args}>I am a H2</SubTitleH2>
    <SubTitleH3 {...args}>I am a H3</SubTitleH3>
    <SubTitleH4 {...args}>I am a H4</SubTitleH4>
    <SubTitleH5 {...args}>I am a H5</SubTitleH5>
    <SubTitleH6 {...args}>I am a H6</SubTitleH6>
  </Section>
)
SubTitlesCentered.args = {
  className: '',
  id: '',
  isCentered: true,
  isHeadingSection: false,
}

export const TileSubTitleCombo: Story = args => (
  <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
    <H1 {...args}>I am a H1</H1>
    <SubTitleH3 {...args}>I am a SubTitle H3</SubTitleH3>
    <br />
    <H4 {...args}>I am a H4</H4>
    <SubTitleH6 {...args}>I am a SubTitle H6</SubTitleH6>
  </Section>
)
TileSubTitleCombo.args = {
  className: '',
  id: '',
  isCentered: false,
  isHeadingSection: false,
}
