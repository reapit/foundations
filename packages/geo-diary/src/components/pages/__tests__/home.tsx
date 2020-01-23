import * as React from 'react'
import { shallow } from 'enzyme'
import { appointmentsDataStub } from '@/sagas/__stubs__/appointments'
import { appointmentDataStub } from '@/sagas/__stubs__/appointment'
import { OnlineState } from '@/reducers/online'
import { ReduxState } from '@/types/core'
import {
  Home,
  HomeProps,
  changeHomeTabHandler,
  handleUseEffect,
  handleUseCallback,
  mapDispatchToProps,
  handleOnClickFilterTime,
  mapStateToProps,
  tabConfigs,
} from '../home'

describe('Home', () => {
  it('should match a snapshot', () => {
    const mockProps = {
      appointmentsState: {
        appointments: appointmentsDataStub.appointments,
        loading: false,
        time: 'Today',
        selectedAppointment: appointmentsDataStub?.appointments?._embedded?.[0],
      },
      nextAppointmentState: {
        data: null,
      },
      desktopMode: false,
    } as HomeProps

    expect(shallow(<Home {...mockProps} />)).toMatchSnapshot()
  })

  it('should match a snapshot when loading', () => {
    const mockProps = {
      appointmentsState: {
        appointments: appointmentsDataStub.appointments,
        loading: true,
        time: 'Today',
        selectedAppointment: appointmentsDataStub?.appointments?._embedded?.[0],
      },
      nextAppointmentState: {
        data: null,
      },
      desktopMode: true,
    } as HomeProps

    expect(shallow(<Home {...mockProps} />)).toMatchSnapshot()
  })

  describe('changeHomeTabHandler', () => {
    it('should run correctly', () => {
      const mockChangeHomeTabHandler = jest.fn()
      const fn = changeHomeTabHandler(mockChangeHomeTabHandler, 'LIST')
      fn()
      expect(mockChangeHomeTabHandler).toBeCalledWith('LIST')
    })
  })

  describe('handleUseEffect', () => {
    it('should run correctly', () => {
      const appointmentsState = {
        appointments: appointmentsDataStub.appointments,
        time: 'Today',
        loading: false,
      }
      const requestNextAppointment = jest.fn()
      const travelMode = 'WALKING'
      const fn = handleUseEffect({ appointmentsState, requestNextAppointment, travelMode })
      fn()
      expect(requestNextAppointment).toBeCalledWith(travelMode)
    })

    it('should not run requestNextAppointment', () => {
      const appointmentsState = {
        appointments: appointmentsDataStub.appointments,
        time: 'Today',
        loading: true,
      }
      const requestNextAppointment = jest.fn()
      const travelMode = 'WALKING'
      const fn = handleUseEffect({ appointmentsState, requestNextAppointment, travelMode })
      fn()
      expect(requestNextAppointment).not.toBeCalledWith(travelMode)
    })
  })

  describe('handleUseCallBack', () => {
    it('should run correctly', () => {
      const mockSetTravelMode = jest.fn()
      const travelMode = 'WALKING'
      const fn = handleUseCallback({ setTravelMode: mockSetTravelMode })
      fn(travelMode)
      expect(mockSetTravelMode).toBeCalledWith(travelMode)
    })
  })

  describe('mapDispatchToProps', () => {
    it('requestAppointments', () => {
      const mockDispatch = jest.fn()
      const { requestAppointments } = mapDispatchToProps(mockDispatch)
      requestAppointments('Today')
      expect(mockDispatch).toBeCalled()
    })

    it('requestAppointments', () => {
      const mockDispatch = jest.fn()
      const { requestNextAppointment } = mapDispatchToProps(mockDispatch)
      requestNextAppointment('WALKING')
      expect(mockDispatch).toBeCalled()
    })

    it('setSelectedAppointment', () => {
      const mockDispatch = jest.fn()
      const { setSelectedAppointment } = mapDispatchToProps(mockDispatch)
      setSelectedAppointment(appointmentDataStub)
      expect(mockDispatch).toBeCalled()
    })

    it('changeHomeTab', () => {
      const mockDispatch = jest.fn()
      const { changeHomeTab } = mapDispatchToProps(mockDispatch)
      changeHomeTab('LIST')
      expect(mockDispatch).toBeCalled()
    })
  })

  describe('handleOnClickFilterTime', () => {
    it('should run correctly', () => {
      const requestAppointments = jest.fn()
      const setSelectedAppointment = jest.fn()
      const filter = 'TOMORROW'
      const time = 'TODAY'
      const fn = handleOnClickFilterTime({ requestAppointments, filter, time, setSelectedAppointment })
      fn()
      expect(requestAppointments).toBeCalledWith(filter)
      expect(setSelectedAppointment).toBeCalledWith(null)
    })

    it('should not call requestAppointments correctly', () => {
      const requestAppointments = jest.fn()
      const setSelectedAppointment = jest.fn()
      const filter = 'TODAY'
      const time = 'TODAY'
      const fn = handleOnClickFilterTime({ requestAppointments, filter, time, setSelectedAppointment })
      fn()
      expect(requestAppointments).not.toBeCalled()
      expect(setSelectedAppointment).toBeCalledWith(null)
    })
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      const mockState = {
        appointments: appointmentsDataStub.appointments,
        nextAppointment: appointmentDataStub,
        home: {
          homeTab: 'LIST',
        },
        auth: {
          refreshSession: {
            mode: 'DESKTOP',
          },
        },
        online: {
          value: true,
        } as OnlineState,
      } as ReduxState
      const result = mapStateToProps(mockState)
      const expected = {
        appointmentsState: appointmentsDataStub.appointments,
        nextAppointmentState: appointmentDataStub,
        currentTab: 'LIST',
        desktopMode: true,
        isOnline: true,
      }
      expect(result).toEqual(expected)
    })
  })

  describe('tabConfigs', () => {
    it('should run correctly', () => {
      const mockCurrentTab = 'LIST'
      const mockChangeHomeTab = jest.fn()
      const result = tabConfigs({ currentTab: mockCurrentTab, changeHomeTab: mockChangeHomeTab })
      expect(result).toHaveLength(2)
    })
  })
})
