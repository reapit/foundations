import React from 'react'
import { mount } from 'enzyme'
import appState from '@/reducers/__stubs__/app-state'
import { MemberModel } from '@reapit/foundations-ts-definitions'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'
import ToggleCustomerDataForm, {
  generateInitialValues,
  handleSubmitToggleCustomerData,
  ToggleCustomerDataValues,
} from '../toggle-customer-data-form'

jest.mock('react-redux', () => ({
  ...(jest.requireActual('react-redux') as Object),
  useDispatch: jest.fn(() => jest.fn()),
  useSelector: jest.fn(() => jest.fn()),
}))

const currentMemberInfo: MemberModel | null = appState.currentMember.data

const valuesMock: ToggleCustomerDataValues = {
  useCustomerData: false,
  sandboxId: 'GBR',
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
    })
    const { useCustomerData, sandboxId } = currentMemberInfo as MemberModel
    const expectedResult = {
      useCustomerData,
      sandboxId,
    }
    expect(result).toEqual(expectedResult)
  })

  it('should return correctly with currentMemberInfo null', () => {
    const result = generateInitialValues({
      currentMemberInfo: null,
    })
    expect(result).toEqual(valuesMock)
  })
})
