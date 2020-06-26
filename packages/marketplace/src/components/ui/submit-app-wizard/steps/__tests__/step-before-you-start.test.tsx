import React from 'react'
import Routes from '@/constants/routes'
import { History } from 'history'
import { onViewDocs, onCreateNewApp, StepBeforeYouStart } from '../step-before-you-start'
import { shallow } from 'enzyme'

describe('StepBeforeYouStart', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(<StepBeforeYouStart setWizardStep={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
  test('onViewDocs should run correctly', () => {
    const history = { push: jest.fn() }
    onViewDocs((history as unknown) as History<unknown>)()
    expect(history.push).toBeCalledWith(`${Routes.DEVELOPER_API_DOCS}/developer-portal`)
  })
  test('onCreateNewApp should run correctly', () => {
    const setWizardStep = jest.fn()
    onCreateNewApp(setWizardStep)()
    expect(setWizardStep).toBeCalledWith('INPUT_APP_NAME')
  })
})
