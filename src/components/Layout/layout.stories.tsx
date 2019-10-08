import React from 'react'
import { storiesOf } from '@storybook/react'
import { FlexContainer, Grid, GridColumn, Level, LevelLeft, LevelRight, LevelItem, Section } from './index'

const Placeholder = ({ text }) => (
  <div style={{ width: '100%', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {text}
  </div>
)

storiesOf('Layout', module)
  .add('FlexContainerRowCenteredPadding', () => (
    <FlexContainer flexColumn={false} centerContent={true} hasPadding={true}>
      <Placeholder text="FlexContainerRow Centered Padding" />
      <Placeholder text="FlexContainerRow Centered Padding" />
    </FlexContainer>
  ))
  .add('FlexContainerColumnCenteredPadding', () => (
    <FlexContainer flexColumn={true} centerContent={true} hasPadding={true}>
      <Placeholder text="FlexContainerColumn Centered Padding" />
      <Placeholder text="FlexContainerColumn Centered Padding" />
    </FlexContainer>
  ))
  .add('FlexContainerRowNoCenterNoPadding', () => (
    <FlexContainer flexColumn={false} centerContent={false} hasPadding={false}>
      <Placeholder text="FlexContainerRow NoCenter NoPadding" />
      <Placeholder text="FlexContainerRow NoCenter NoPadding" />
    </FlexContainer>
  ))
  .add('GridTenItems', () => (
    <Grid>
      <GridColumn>
        <Placeholder text="GridColumn1" />
      </GridColumn>
      <GridColumn>
        <Placeholder text="GridColumn2" />
      </GridColumn>
      <GridColumn>
        <Placeholder text="GridColumn3" />
      </GridColumn>
      <GridColumn>
        <Placeholder text="GridColumn4" />
      </GridColumn>
      <GridColumn>
        <Placeholder text="GridColumn5" />
      </GridColumn>
      <GridColumn>
        <Placeholder text="GridColumn6" />
      </GridColumn>
      <GridColumn>
        <Placeholder text="GridColumn7" />
      </GridColumn>
      <GridColumn>
        <Placeholder text="GridColumn8" />
      </GridColumn>
      <GridColumn>
        <Placeholder text="GridColumn9" />
      </GridColumn>
      <GridColumn>
        <Placeholder text="GridColumn10" />
      </GridColumn>
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
