import React from 'react'
import { CustomCreateAppModel } from '@/actions/submit-app'
import { onFinish, StepSubmitAppSuccess } from '../step-submit-app-success'
import { shallow } from 'enzyme'

const dispatch = jest.fn()
jest.mock('react-redux', () => ({
  useDispatch: jest.fn(() => dispatch),
}))

jest.mock('formik', () => ({
  useFormikContext: () => ({
    setErrors: jest.fn(),
    values: { name: 'name' },
  }),
}))

describe('StepInputAuthenticationUris', () => {
  it('should match snapshot', () => {
    const wrapper = shallow(
      <StepSubmitAppSuccess handleUpdateFormState={jest.fn} afterClose={jest.fn()} setWizzardStep={jest.fn()} />,
    )
    expect(wrapper).toMatchSnapshot()
  })
  test('onFinish should run correctly', () => {
    const dispatch = jest.fn()
    const setErrors = jest.fn()
    const setWizzardStep = jest.fn()
    const afterClose = jest.fn()
    const values = {
      redirectUris: 'link1,link2',
      signoutUris: 'link1,link2',
    }
    onFinish({ values: (values as unknown) as CustomCreateAppModel, setErrors, dispatch, setWizzardStep, afterClose })()
    expect(dispatch).toHaveBeenCalledWith({
      data: {
        redirectUris: ['link1', 'link2'],
        signoutUris: ['link1', 'link2'],
        setErrors,
        setWizzardStep,
        afterClose,
      },
      type: 'DEVELOPER_SUBMIT_APP',
    })
  })
})
