import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  AppNavContainer,
  FlexContainerBasic,
  FlexContainerResponsive,
  Grid,
  GridItem,
  GridFiveCol,
  GridFourColItem,
  Level,
  LevelLeft,
  LevelRight,
  LevelItem,
  Section,
  Content
} from './index'
import { Menu } from '../Menu/Menu'
import { mockMenuProps } from '../Menu/__mocks__/menu-props'
import { MemoryRouter } from 'react-router'

export const Placeholder = ({ text }) => (
  <div style={{ width: '100%', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {text}
  </div>
)

storiesOf('Layout', module)
  .addDecorator(story => <MemoryRouter initialEntries={['/']}>{story()}</MemoryRouter>)
  .add('AppNavContainer', () => (
    <AppNavContainer>
      <Menu {...mockMenuProps} />
      <FlexContainerBasic>
        <Placeholder text="AppBody FlexContainerBasic NoCenter Padding" />
      </FlexContainerBasic>
    </AppNavContainer>
  ))
  .add('FlexContainerBasicRowCenteredPadding', () => (
    <FlexContainerBasic centerContent hasPadding>
      <Placeholder text="FlexContainerBasicRow Centered Padding" />
      <Placeholder text="FlexContainerBasicRow Centered Padding" />
    </FlexContainerBasic>
  ))
  .add('FlexContainerBasicColumnCenteredPadding', () => (
    <FlexContainerBasic flexColumn centerContent hasPadding>
      <Placeholder text="FlexContainerBasicColumn Centered Padding" />
      <Placeholder text="FlexContainerBasicColumn Centered Padding" />
    </FlexContainerBasic>
  ))
  .add('FlexContainerBasicRowNoCenterNoPadding', () => (
    <FlexContainerBasic>
      <Placeholder text="FlexContainerBasicRow NoCenter NoPadding" />
      <Placeholder text="FlexContainerBasicRow NoCenter NoPadding" />
    </FlexContainerBasic>
  ))
  .add('FlexContainerResponsiveRowCenteredPadding', () => (
    <FlexContainerResponsive centerContent hasPadding>
      <Placeholder text="FlexContainerResponsiveRow Centered Padding" />
      <Placeholder text="FlexContainerResponsiveRow Centered Padding" />
    </FlexContainerResponsive>
  ))
  .add('FlexContainerResponsiveColumnCenteredPadding', () => (
    <FlexContainerResponsive flexColumn centerContent hasPadding>
      <Placeholder text="FlexContainerResponsiveColumn Centered Padding" />
      <Placeholder text="FlexContainerResponsiveColumn Centered Padding" />
    </FlexContainerResponsive>
  ))
  .add('FlexContainerResponsiveRowNoCenterNoPadding', () => (
    <FlexContainerResponsive>
      <Placeholder text="FlexContainerResponsiveRow NoCenter NoPadding" />
      <Placeholder text="FlexContainerResponsiveRow NoCenter NoPadding" />
    </FlexContainerResponsive>
  ))
  .add('GridFourColEightItems', () => (
    <GridFiveCol>
      <GridFourColItem>
        <Placeholder text="GridFourColItem1" />
      </GridFourColItem>
      <GridFourColItem>
        <Placeholder text="GridFourColItem2" />
      </GridFourColItem>
      <GridFourColItem>
        <Placeholder text="GridFourColItem3" />
      </GridFourColItem>
      <GridFourColItem>
        <Placeholder text="GridFourColItem4" />
      </GridFourColItem>
      <GridFourColItem>
        <Placeholder text="GridFourColItem5" />
      </GridFourColItem>
      <GridFourColItem>
        <Placeholder text="GridFourColItem6" />
      </GridFourColItem>
      <GridFourColItem>
        <Placeholder text="GridFourColItem7" />
      </GridFourColItem>
      <GridFourColItem>
        <Placeholder text="GridFourColItem8" />
      </GridFourColItem>
      <GridFourColItem>
        <Placeholder text="GridFourColItem9" />
      </GridFourColItem>
      <GridFourColItem>
        <Placeholder text="GridFourColItem10" />
      </GridFourColItem>
    </GridFiveCol>
  ))
  .add('Grid', () => (
    <Grid>
      <GridItem>
        <Placeholder text="GridItem1" />
      </GridItem>
      <GridItem>
        <Placeholder text="GridItem2" />
      </GridItem>
      <GridItem>
        <Placeholder text="GridItem3" />
      </GridItem>
      <GridItem>
        <Placeholder text="GridItem4" />
      </GridItem>
      <GridItem>
        <Placeholder text="GridItem5" />
      </GridItem>
      <GridItem>
        <Placeholder text="GridItem6" />
      </GridItem>
      <GridItem>
        <Placeholder text="GridItem7" />
      </GridItem>
      <GridItem>
        <Placeholder text="GridItem8" />
      </GridItem>
      <GridItem>
        <Placeholder text="GridItem9" />
      </GridItem>
      <GridItem>
        <Placeholder text="GridItem10" />
      </GridItem>
    </Grid>
  ))
  .add('GridMultiline', () => (
    <Grid isMultiLine>
      <GridItem isMultiLine>
        <Placeholder text="GridMultiLineItem1" />
      </GridItem>
      <GridItem isMultiLine>
        <Placeholder text="GridMultiLineItem2" />
      </GridItem>
      <GridItem isMultiLine>
        <Placeholder text="GridMultiLineItem3" />
      </GridItem>
      <GridItem isMultiLine>
        <Placeholder text="GridMultiLineItem4" />
      </GridItem>
      <GridItem isMultiLine>
        <Placeholder text="GridMultiLineItem5" />
      </GridItem>
      <GridItem isMultiLine>
        <Placeholder text="GridMultiLineItem6" />
      </GridItem>
      <GridItem isMultiLine>
        <Placeholder text="GridMultiLineItem7" />
      </GridItem>
      <GridItem isMultiLine>
        <Placeholder text="GridMultiLineItem8" />
      </GridItem>
      <GridItem isMultiLine>
        <Placeholder text="GridMultiLineItem9" />
      </GridItem>
      <GridItem isMultiLine>
        <Placeholder text="GridMultiLineItem10" />
      </GridItem>
    </Grid>
  ))
  .add('Levels', () => (
    <>
      <Level>
        <LevelLeft>
          <LevelItem>
            <Placeholder text="LevelItemLevelLeft" />
          </LevelItem>
        </LevelLeft>
        <LevelRight>
          <LevelItem>
            <Placeholder text="LevelItemLevelRight" />
          </LevelItem>
        </LevelRight>
      </Level>
      <Level>
        <LevelItem>
          <Placeholder text="LevelItem" />
        </LevelItem>
      </Level>
    </>
  ))
  .add('Section', () => (
    <Section>
      <Placeholder text="Section" />
    </Section>
  ))
  .add('Content', () => (
    <Content>
      <Placeholder text="Content - you can put anything in here and it'll look nice" />
    </Content>
  ))
