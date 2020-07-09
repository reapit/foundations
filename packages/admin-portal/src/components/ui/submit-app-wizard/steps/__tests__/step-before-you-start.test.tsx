import React from 'react'
import { onCreateNewApp, StepBeforeYouStart } from '../step-before-you-start'
import { shallow } from 'enzyme'
import { wizzardSteps } from '../../constant'

describe('StepBeforeYouStart', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<StepBeforeYouStart setWizardStep={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
  test('onCreateNewApp should run correctly', () => {
    const setWizardStep = jest.fn()
    onCreateNewApp(setWizardStep)()
    expect(setWizardStep).toBeCalledWith(wizzardSteps.INPUT_APP_NAME)
  })
})
