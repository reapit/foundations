import React from 'react'
import { SubmitAppWizard, handleSubmit } from '../submit-app-wizard'
import { shallow } from 'enzyme'
import { FormikHelpers } from '@reapit/elements'
import { CustomCreateAppModel } from '@/actions/submit-app'

jest.mock('react-redux', () => ({
  useSelector: () => false,
  useDispatch: jest.fn(),
}))

describe('SubmitAppWizard', () => {
  test('handleSubmit should run correctly', () => {
    const dispatch = jest.fn()
    const setWizardStep = jest.fn()
    const afterClose = jest.fn()
    const values = {
      redirectUris: 'link1,link2',
      signoutUris: 'link1,link2',
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
