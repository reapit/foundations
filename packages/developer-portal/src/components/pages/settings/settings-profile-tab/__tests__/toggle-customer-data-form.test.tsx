import React from 'react'
import { mount } from 'enzyme'
import appState from '@/reducers/__stubs__/app-state'
import { MemberModel } from '@reapit/foundations-ts-definitions'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import ToggleCustomerDataForm, {
  generateInitialValues,
  handleSubmitToggleCustomerData,
  defaultInitialValues,
  ToggleCustomerDataValues,
} from '../toggle-customer-data-form'

const dispatch = jest.fn()
jest.mock('react-redux', () => ({
  ...(jest.requireActual('react-redux') as Object),
  useDispatch: jest.fn(() => dispatch),
  useSelector: jest.fn(() => jest.fn()),
}))

const currentMemberInfo: MemberModel | null = appState.currentMember.data

const valuesMock: ToggleCustomerDataValues = {
  useCustomerData: false,
}

describe('ToggleCustomerDataForm', () => {
  const mockStore = configureStore()
  const store = mockStore(appState)

  it('should match snapshot', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ToggleCustomerDataForm />
      </Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleSubmitToggleCustomerData', () => {
  it('should run correctly', () => {
    const updateCurrentMemberInformation = jest.fn()
    const fn = handleSubmitToggleCustomerData(updateCurrentMemberInformation)
    fn(valuesMock)
    expect(updateCurrentMemberInformation).toHaveBeenCalledWith(valuesMock)
  })
})

describe('generateInitialValues', () => {
  it('should return correctly', () => {
    const result = generateInitialValues({
      currentMemberInfo,
      defaultInitialValues,
    })
    const { useCustomerData } = currentMemberInfo as MemberModel
    const expectedResult = {
      useCustomerData,
    }
    expect(result).toEqual(expectedResult)
  })

  it('should return correctly with currentMemberInfo null', () => {
    const result = generateInitialValues({
      currentMemberInfo: null,
      defaultInitialValues,
    })
    expect(result).toEqual(defaultInitialValues)
  })
})
