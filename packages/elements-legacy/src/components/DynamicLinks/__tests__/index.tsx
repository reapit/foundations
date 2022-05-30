import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { AcLink, AcButton } from '../index'
import toJson from 'enzyme-to-json'
import { dynamicLinkScenarios } from '../__stubs__/scenarios'
import { getDynamicLink } from '../dynamic-link-gen'

const postMessageOrigin = process.env.MARKETPLACE_URL

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
        toJson(
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
        ),
      )
    })

    it('should return the correct link for ' + scenario.description, () => {
      expect(getDynamicLink(scenario.dynamicLinkParams)).toEqual(scenario.expectedLink)
    })

    it('should respond to a button click event by navigating to expected url for ' + scenario.description, () => {
      const component = render(
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
        </AcButton>,
      )
      if (scenario.expectedLink) {
        component.simulate('click', { preventDefault: jest.fn() })
        expect(mockWindow.postMessage).toHaveBeenLastCalledWith(
          { dynamicLink: scenario.expectedLink },
          postMessageOrigin,
        )
      }
    })

    it('should respond to a link click event by navigating to expected url for ' + scenario.description, () => {
      const component = render(
        <AcLink dynamicLinkParams={scenario.dynamicLinkParams} navigateParentWindow={mockWindow}>
          Navigate
        </AcLink>,
      )
      component.simulate('click', { preventDefault: jest.fn() })
      if (scenario.expectedLink) {
        expect(mockWindow.postMessage).toHaveBeenLastCalledWith(
          { dynamicLink: scenario.expectedLink },
          postMessageOrigin,
        )
      }
    })
  })
})
