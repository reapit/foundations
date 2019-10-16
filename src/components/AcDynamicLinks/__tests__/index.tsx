import * as React from 'react'
import { shallow } from 'enzyme'
import { AcLink, AcButton } from '../index'
import toJson from 'enzyme-to-json'
import { dynamicLinkScenarios } from '../ac-dynamic-links.stories'
import { getDynamicLink, navigateDynamicApp } from '../dynamic-link-gen'

describe('AcButton AcLink', () => {
  let mockWindow = {
    location: {
      href: ''
    }
  }
  dynamicLinkScenarios(mockWindow as Window).forEach(scenario => {
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
              >
                Navigate
              </AcButton>
              <AcLink dynamicLinkParams={scenario.dynamicLinkParams}>Navigate</AcLink>
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
        >
          Navigate
        </AcButton>
      )
      component.simulate('click', { preventDefault: jest.fn() })
      expect(mockWindow.location.href).toEqual(scenario.expectedLink)
    })

    it('should respond to a link click event by navigating to expected url for ' + scenario.description, () => {
      const component = shallow(<AcLink dynamicLinkParams={scenario.dynamicLinkParams}>Navigate</AcLink>)
      component.simulate('click', { preventDefault: jest.fn() })
      expect(mockWindow.location.href).toEqual(scenario.expectedLink)
    })
  })
})
