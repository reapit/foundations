import React from 'react'
import { mount } from 'enzyme'
import {
  defaultInitialValues,
  generateInitialValues,
  ContactInformationForm,
  ContactInformationValues,
  handleSubmitContactInformation,
} from '../contact-information-form'
import appState from '@/reducers/__stubs__/app-state'
import { MemberModel } from '@reapit/foundations-ts-definitions'
import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux'

jest.mock('react-redux', () => ({
  ...(jest.requireActual('react-redux') as Object),
  useDispatch: jest.fn(() => jest.fn()),
  useSelector: jest.fn(() => jest.fn()),
}))

const currentMemberInfo: MemberModel | null = appState.currentMember.data

const valuesMock: ContactInformationValues = {
  name: 'name',
  jobTitle: 'jobTitle',
}

describe('ContactInformationForm', () => {
  const mockStore = configureStore()
  const store = mockStore(appState)

  it('should match snapshot', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ContactInformationForm />
      </Provider>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleSubmitContactInformation', () => {
  it('should run correctly', () => {
    const updateCurrentMemberInformation = jest.fn()
    const fn = handleSubmitContactInformation(updateCurrentMemberInformation)
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
    const { name, jobTitle } = currentMemberInfo as MemberModel
    const expectedResult = {
      name,
      jobTitle,
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
