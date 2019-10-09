import React from 'react'
import { storiesOf } from '@storybook/react'
import {
  AppNavContainer,
  FlexContainerBasic,
  FlexContainerResponsive,
  Grid,
  GridItem,
  GridFiveCol,
  GridFiveColItem,
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

const Placeholder = ({ text }) => (
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
  .add('GridFiveColTenItems', () => (
    <GridFiveCol>
      <GridFiveColItem>
        <Placeholder text="GridFiveColItem1" />
      </GridFiveColItem>
      <GridFiveColItem>
        <Placeholder text="GridFiveColItem2" />
      </GridFiveColItem>
      <GridFiveColItem>
        <Placeholder text="GridFiveColItem3" />
      </GridFiveColItem>
      <GridFiveColItem>
        <Placeholder text="GridFiveColItem4" />
      </GridFiveColItem>
      <GridFiveColItem>
        <Placeholder text="GridFiveColItem5" />
      </GridFiveColItem>
      <GridFiveColItem>
        <Placeholder text="GridFiveColItem6" />
      </GridFiveColItem>
      <GridFiveColItem>
        <Placeholder text="GridFiveColItem7" />
      </GridFiveColItem>
      <GridFiveColItem>
        <Placeholder text="GridFiveColItem8" />
      </GridFiveColItem>
      <GridFiveColItem>
        <Placeholder text="GridFiveColItem9" />
      </GridFiveColItem>
      <GridFiveColItem>
        <Placeholder text="GridFiveColItem10" />
      </GridFiveColItem>
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
