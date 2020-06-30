import React from 'react'
import { SubmitAppWizard, handleSubmit } from '../submit-app-wizard'
import { shallow } from 'enzyme'
import { FormikHelpers } from '@reapit/elements'
import { CustomCreateAppModel } from '@/actions/submit-app'
import AuthFlow from '@/constants/app-auth-flow'

jest.mock('react-redux', () => ({
  useSelector: () => false,
  useDispatch: jest.fn(),
}))

describe('SubmitAppWizard', () => {
  test('handleSubmit should run correctly when authFlow = clientCredentials', () => {
    const dispatch = jest.fn()
    const setWizardStep = jest.fn()
    const afterClose = jest.fn()
    const values = {
      // should be trimem, and empty value should be removed
      redirectUris: 'link1 , link2 ,',
      signoutUris: 'link1 , link2 ,',
      authFlow: AuthFlow.CLIENT_SECRET,
    }
    const actions = {
      setErrors: jest.fn(),
    }
    handleSubmit({
      dispatch,
      setWizardStep,
      afterClose,
    })(values, (actions as unknown) as FormikHelpers<CustomCreateAppModel>)
    expect(dispatch).toHaveBeenCalledWith({
      data: {
        setErrors: actions.setErrors,
        setWizardStep,
        afterClose,
        authFlow: values.authFlow,
      },
      type: 'DEVELOPER_SUBMIT_APP',
    })
  })
  test('handleSubmit should run correctly when authFlow = authorisationCode', () => {
    const dispatch = jest.fn()
    const setWizardStep = jest.fn()
    const afterClose = jest.fn()
    const values = {
      // should be trimem, and empty value should be removed
      redirectUris: 'link1 , link2 ,',
      signoutUris: 'link1 , link2 ,',
      authFlow: AuthFlow.USER_SESSION,
    }
    const actions = {
      setErrors: jest.fn(),
    }
    handleSubmit({
      dispatch,
      setWizardStep,
      afterClose,
    })(values, (actions as unknown) as FormikHelpers<CustomCreateAppModel>)
    expect(dispatch).toHaveBeenCalledWith({
      data: {
        redirectUris: ['link1', 'link2'],
        signoutUris: ['link1', 'link2'],
        authFlow: AuthFlow.USER_SESSION,
        setErrors: actions.setErrors,
        setWizardStep,
        afterClose,
      },
      type: 'DEVELOPER_SUBMIT_APP',
    })
  })
  it('should match snapshot when visible = true', () => {
    const wrapper = shallow(<SubmitAppWizard afterClose={jest.fn} />)
    expect(wrapper).toMatchSnapshot()
  })
})
