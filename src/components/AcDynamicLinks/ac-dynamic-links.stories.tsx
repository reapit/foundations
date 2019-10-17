import React from 'react'

import { storiesOf } from '@storybook/react'
import { AcButton, AcLink } from './index'
import { Section, Content } from '../Layout/index'
import { DynamicLinkParams, EntityType, EntityParams, getDynamicLink, AppParams } from './dynamic-link-gen'
import { H5, SubTitleH6 } from '../Typography/index'

export interface DynamicLinkScenario {
  dynamicLinkParams: DynamicLinkParams
  description: string
  expectedLink: string // Hardcoded, for unit test assertions
}

export const dynamicLinkScenarios: DynamicLinkScenario[] = [
  {
    dynamicLinkParams: {
      appMode: 'DESKTOP',
      entityType: EntityType.APPS,
      queryParams: {
        id: '516060af-ea0a-4384-8465-28befc6f34b3'
      },
      webRoute: 'https://dev.geo-diary-app.reapit.com'
    },
    description: 'Launch (eg Geo Diary) in desktop from existing app',
    expectedLink: 'agencycloud://apps?id=516060af-ea0a-4384-8465-28befc6f34b3'
  },
  {
    dynamicLinkParams: {
      appMode: 'WEB',
      entityType: EntityType.APPS,
      queryParams: {
        id: '516060af-ea0a-4384-8465-28befc6f34b3'
      },
      webRoute: 'https://dev.geo-diary-app.reapit.com'
    },
    description: 'Launch app (eg Geo Diary) in web mode from existing app',
    expectedLink: 'https://dev.geo-diary-app.reapit.com'
  },
  {
    dynamicLinkParams: {
      appMode: 'DESKTOP',
      entityType: EntityType.PROPERTY,
      entityCode: 'BED140946',
      entityParams: EntityParams.JOURNAL
    },
    description: 'Launch the journal for a property',
    expectedLink: 'agencycloud://properties/BED140946/Journal'
  },
  {
    dynamicLinkParams: {
      appMode: 'DESKTOP',
      entityType: EntityType.PROPERTY,
      entityCode: 'BED140946',
      entityParams: EntityParams.LANDLORD
    },
    description: 'Launch the landlord for a property',
    expectedLink: 'agencycloud://properties/BED140946/Landlord'
  },
  {
    dynamicLinkParams: {
      appMode: 'DESKTOP',
      entityType: EntityType.CONTACT,
      entityCode: 'AYL19000002',
      queryParams: {
        closeApp: true
      }
    },
    description: 'Launch a contact and close app',
    expectedLink: 'agencycloud://contacts/AYL19000002?closeApp=true'
  },
  {
    dynamicLinkParams: {
      appMode: 'DESKTOP',
      entityType: EntityType.CONTACT,
      entityCode: '',
      queryParams: {
        name: 'Bob',
        appPram: AppParams.CONTACT_CODE,
        appId: '516060af-ea0a-4384-8465-28befc6f34b3'
      }
    },
    description: 'Launch a contact search for name "Bob" and return to marketplace',
    expectedLink: 'agencycloud://contacts?name=Bob&appPram=cntCode&appId=516060af-ea0a-4384-8465-28befc6f34b3'
  },
  {
    dynamicLinkParams: {
      appMode: 'DESKTOP',
      entityType: EntityType.PROPERTY,
      entityCode: 'BED140946',
      queryParams: {
        closeApp: true
      }
    },
    description: 'Launch a property and close app',
    expectedLink: 'agencycloud://properties/BED140946?closeApp=true'
  },
  {
    dynamicLinkParams: {
      appMode: 'DESKTOP',
      entityType: EntityType.PROPERTY,
      queryParams: {
        address: 'E2'
      }
    },
    description: 'Launch a property search for address "E2"',
    expectedLink: 'agencycloud://properties?address=E2'
  },
  {
    dynamicLinkParams: {
      appMode: 'DESKTOP',
      entityType: EntityType.PROPERTY,
      queryParams: {
        address: 'E2',
        mode: 'Sales'
      }
    },
    description: 'Launch a property search for address "E2" where mode is "Sales"',
    expectedLink: 'agencycloud://properties?address=E2&mode=Sales'
  },
  {
    dynamicLinkParams: {
      appMode: 'DESKTOP',
      entityType: EntityType.PROPERTY,
      queryParams: {
        address: 'E2',
        closeApp: true
      }
    },
    description: 'Launch a property search for address "E2" and close app',
    expectedLink: 'agencycloud://properties?address=E2&closeApp=true'
  }
]

// I need to change the outermost window in storybook and because it uses iframes, get this recursively
const getWindow = (windowToChange: Window = window): Window => {
  if (
    windowToChange.parent.location.href.includes('localhost') ||
    windowToChange.parent.location.href.includes('reapit.com')
  ) {
    return windowToChange.parent
  }

  return getWindow(windowToChange.parent)
}

storiesOf('AcDynamicLinks', module).add('AcButtonsAndLinks', () => (
  <Content>
    {dynamicLinkScenarios.map((scenario: DynamicLinkScenario, index: number) => (
      <Section key={index}>
        <H5>{scenario.description}</H5>
        <SubTitleH6>Link generated is: {getDynamicLink(scenario.dynamicLinkParams)}</SubTitleH6>
        <p>
          <AcButton
            buttonProps={{
              variant: 'primary',
              disabled: false,
              loading: false,
              fullWidth: false,
              type: 'button'
            }}
            dynamicLinkParams={scenario.dynamicLinkParams}
            navigateParentWindow={getWindow()}
          >
            Navigate
          </AcButton>
          <AcLink dynamicLinkParams={scenario.dynamicLinkParams} navigateParentWindow={getWindow()}>
            Navigate
          </AcLink>
        </p>
      </Section>
    ))}
  </Content>
))
