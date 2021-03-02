import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import {
  AppNavContainer,
  FlexContainerBasic,
  FlexContainerResponsive,
  FlexContainerProps,
  LayoutProps,
  Grid,
  GridProps,
  GridItem,
  GridFourCol,
  GridThreeColItem,
  GridFourColItem,
  Level,
  LevelLeft,
  LevelRight,
  LevelItem,
  Section,
  SectionProps,
  Content,
} from './index'
import { Menu } from '../Menu/Menu'
import { mockMenuProps } from '../Menu/__mocks__/menu-props'
import { MemoryRouter } from 'react-router'

export default {
  title: 'Rereshed-Docs/Layout',
  component: FlexContainerResponsive,
}

export const FlexContainerResponsive_: Story<FlexContainerProps> = (args) => (
  <FlexContainerResponsive {...args}>
    <p>Child of FlexContainerResponsive 1</p>
    <p>Child of FlexContainerResponsive 2</p>
  </FlexContainerResponsive>
)
FlexContainerResponsive_.args = {
  flexColumn: true,
  centerContent: true,
  hasPadding: true,
}

export const AppNavContainer_: Story<LayoutProps> = (args) => (
  <MemoryRouter initialEntries={['/']}>
    <AppNavContainer {...args}>
      <Menu {...mockMenuProps} />
    </AppNavContainer>
  </MemoryRouter>
)
FlexContainerResponsive_.args = {
  className: 'is-full-height',
}

export const FlexContainerBasic_: Story<FlexContainerProps> = (args) => (
  <FlexContainerBasic {...args}>
    <p>Child of FlexContainerBasicRow 1</p>
    <p>Child of FlexContainerBasicRow 2</p>
  </FlexContainerBasic>
)
FlexContainerBasic_.args = {
  flexColumn: true,
  centerContent: true,
  hasPadding: true,
}

export const GridFourColItem_: Story<LayoutProps> = () => (
  <GridFourCol>
    <GridFourColItem>
      <p>Column item 1</p>
    </GridFourColItem>
    <GridFourColItem>
      <p>Column item 2</p>
    </GridFourColItem>
    <GridFourColItem>
      <p>Column item 3</p>
    </GridFourColItem>
    <GridFourColItem>
      <p>Column item 4</p>
    </GridFourColItem>
    <GridFourColItem>
      <p>Column item 5</p>
    </GridFourColItem>
    <GridFourColItem>
      <p>Column item 6</p>
    </GridFourColItem>
  </GridFourCol>
)
GridFourColItem_.args = {}

export const GridThreeColItem_: Story<LayoutProps> = () => (
  <GridFourCol>
    <GridThreeColItem>
      <p>Column item 1</p>
    </GridThreeColItem>
    <GridThreeColItem>
      <p>Column item 2</p>
    </GridThreeColItem>
    <GridThreeColItem>
      <p>Column item 3</p>
    </GridThreeColItem>
    <GridThreeColItem>
      <p>Column item 4</p>
    </GridThreeColItem>
    <GridThreeColItem>
      <p>Column item 5</p>
    </GridThreeColItem>
    <GridThreeColItem>
      <p>Column item 6</p>
    </GridThreeColItem>
  </GridFourCol>
)
GridThreeColItem_.args = {}

export const Grid_: Story<GridProps> = () => (
  <Grid>
    <GridItem>
      <p>Column item 1</p>
    </GridItem>
    <GridItem>
      <p>Column item 2</p>
    </GridItem>
    <GridItem>
      <p>Column item 3</p>
    </GridItem>
    <GridItem>
      <p>Column item 4</p>
    </GridItem>
  </Grid>
)
Grid_.args = {}

export const GridMultiline: Story<GridProps> = (args) => (
  <Grid {...args}>
    <GridItem isMultiLine>
      <p>Column item 1</p>
    </GridItem>
    <GridItem isMultiLine>
      <p>Column item 2</p>
    </GridItem>
    <GridItem isMultiLine>
      <p>Column item 3</p>
    </GridItem>
    <GridItem isMultiLine>
      <p>Column item 4</p>
    </GridItem>
  </Grid>
)
GridMultiline.args = {
  isMultiLine: true,
}

export const LevelLeftAndLevelRight: Story<LayoutProps> = () => (
  <Level>
    <LevelLeft>
      <LevelItem>
        <p>Level left item 1</p>
      </LevelItem>
    </LevelLeft>
    <LevelRight>
      <LevelItem>
        <p>Lavel right item 2</p>
      </LevelItem>
    </LevelRight>
  </Level>
)
LevelLeftAndLevelRight.args = {}

export const Level_: Story<LayoutProps> = () => (
  <Level>
    <LevelItem>
      <p>Level item</p>
    </LevelItem>
  </Level>
)
Level_.args = {}

export const Section_: Story<SectionProps> = (args) => (
  <Section {...args}>
    <p>Section content</p>
  </Section>
)
Section_.args = {}

export const Content_: Story<LayoutProps> = () => (
  <Content>
    <p>Content - you can put anything in here and it will look nice</p>
  </Content>
)
Content_.args = {}
