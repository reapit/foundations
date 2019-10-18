import * as React from 'react'
import { shallow } from 'enzyme'
import { AcLink, AcButton } from '../index'
import toJson from 'enzyme-to-json'
import { dynamicLinkScenarios } from '../ac-dynamic-links.stories'
import { getDynamicLink } from '../dynamic-link-gen'

describe('AcButton AcLink', () => {
  const mockWindow = ({
    postMessage: jest.fn(),
    location: {
      origin: 'http://localhost'
    }
  } as unknown) as Window

  dynamicLinkScenarios.forEach(scenario => {
    it('should match a snapshot for scenario ' + scenario.description, () => {
      expect(
        toJson(
          shallow(
            <div>
              <AcButton
                buttonProps={{
                  variant: 'primary',
                  disabled: false,
                  loading: false,
                  fullWidth: false,
                  type: 'button'
                }}
                dynamicLinkParams={scenario.dynamicLinkParams}
                navigateParentWindow={mockWindow}
              >
                Navigate
              </AcButton>
              <AcLink dynamicLinkParams={scenario.dynamicLinkParams} navigateParentWindow={mockWindow}>
                Navigate
              </AcLink>
            </div>
          )
        )
      )
    })

    it('should return the correct link for ' + scenario.description, () => {
      expect(getDynamicLink(scenario.dynamicLinkParams)).toEqual(scenario.expectedLink)
    })

    it('should respond to a button click event by navigating to expected url for ' + scenario.description, () => {
      const component = shallow(
        <AcButton
          buttonProps={{
            variant: 'primary',
            disabled: false,
            loading: false,
            fullWidth: false,
            type: 'button'
          }}
          dynamicLinkParams={scenario.dynamicLinkParams}
          navigateParentWindow={mockWindow}
        >
          Navigate
        </AcButton>
      )
      component.simulate('click', { preventDefault: jest.fn() })
      expect(mockWindow.postMessage).toHaveBeenLastCalledWith(
        { dynamicLink: scenario.expectedLink },
        'https://dev.reapit.marketplace.com'
      )
    })

    it('should respond to a link click event by navigating to expected url for ' + scenario.description, () => {
      const component = shallow(
        <AcLink dynamicLinkParams={scenario.dynamicLinkParams} navigateParentWindow={mockWindow}>
          Navigate
        </AcLink>
      )
      component.simulate('click', { preventDefault: jest.fn() })
      expect(mockWindow.postMessage).toHaveBeenLastCalledWith(
        { dynamicLink: scenario.expectedLink },
        'https://dev.reapit.marketplace.com'
      )
    })
  })
})
