import * as React from 'react'
import { render } from '@testing-library/react'
import { AcLink, AcButton } from '../index'
import { dynamicLinkScenarios } from '../__stubs__/scenarios'
import { getDynamicLink } from '../dynamic-link-gen'

describe('AcButton AcLink', () => {
  const mockWindow = ({
    postMessage: jest.fn(),
    location: {
      origin: 'http://localhost',
    },
  } as unknown) as Window

  dynamicLinkScenarios.forEach((scenario) => {
    it('should match a snapshot for scenario ' + scenario.description, () => {
      expect(
        render(
          <div>
            <AcButton
              buttonProps={{
                variant: 'primary',
                disabled: false,
                loading: false,
                fullWidth: false,
                type: 'button',
              }}
              dynamicLinkParams={scenario.dynamicLinkParams}
              navigateParentWindow={mockWindow}
            >
              Navigate
            </AcButton>
            <AcLink dynamicLinkParams={scenario.dynamicLinkParams} navigateParentWindow={mockWindow}>
              Navigate
            </AcLink>
          </div>,
        ),
      )
    })

    it('should return the correct link for ' + scenario.description, () => {
      expect(getDynamicLink(scenario.dynamicLinkParams)).toEqual(scenario.expectedLink)
    })
  })
})
