import React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { AcButton, AcLink } from './index'
import { Section, Content } from '../Layout/index'
import { getDynamicLink } from './dynamic-link-gen'
import { DynamicLinkScenario, dynamicLinkScenarios } from './__stubs__/scenarios'
import { H6 } from '../Typography/index'

export default {
  title: 'Rereshed-Docs/DynamicLinks',
  component: AcButton,
  subcomponents: { AcLink },
}

export const DynamicButtonsAndLinks: Story<any> = () => (
  <Content>
    {dynamicLinkScenarios.map((scenario: DynamicLinkScenario, index: number) => (
      <Section key={index}>
        <H6>{scenario.description}</H6>
        <p>Link generated is: {getDynamicLink(scenario.dynamicLinkParams)}</p>
        <p>
          <AcButton
            buttonProps={{
              variant: 'primary',
              disabled: false,
              loading: false,
              fullWidth: false,
              type: 'button',
            }}
            dynamicLinkParams={scenario.dynamicLinkParams}
            navigateParentWindow={window}
          >
            Navigate
          </AcButton>
          <AcLink dynamicLinkParams={scenario.dynamicLinkParams} navigateParentWindow={window}>
            Navigate
          </AcLink>
        </p>
      </Section>
    ))}
  </Content>
)
DynamicButtonsAndLinks.args = {}
