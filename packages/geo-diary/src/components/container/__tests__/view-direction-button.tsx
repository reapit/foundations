import * as React from 'react'
import { ViewDirectionButton, mapDispatchToProps } from '../view-direction-button'
import { shallow } from 'enzyme'
import { appointmentDataStub } from '@/sagas/__stubs__/appointment'

describe('ViewDirectionButton', () => {
  it('Should match snapshot', () => {
    const mockProps = {
      handleOnClick: jest.fn()
    }
    const wrapper = shallow(<ViewDirectionButton {...mockProps} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('Should call handleOnClick when clicked', () => {
    const mockProps = {
      handleOnClick: jest.fn()
    }
    const wrapper = shallow(<ViewDirectionButton {...mockProps} />)
    wrapper.simulate('click')
    expect(mockProps.handleOnClick).toBeCalled()
  })

  describe('mapDispatchToProps', () => {
    const mockedDispatch = jest.fn()
    const mockedOwnProps = {
      appointment: appointmentDataStub
    }

    const { handleOnClick } = mapDispatchToProps(mockedDispatch, mockedOwnProps)
    it('run handleOnClick successfully', () => {
      handleOnClick()
      expect(mockedDispatch).toBeCalledTimes(3)
    })
  })
})
