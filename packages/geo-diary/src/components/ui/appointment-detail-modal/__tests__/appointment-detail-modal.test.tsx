import React from 'react'
import { shallow, mount } from 'enzyme'
import { MockedProvider } from '@apollo/react-testing'
import { AppointmentAttendeeModel } from '@reapit/foundations-ts-definitions'
import { appointment } from '@/graphql/__mocks__/appointment'
import {
  capitalizeFirstLetter,
  renderCommunicationDetail,
  renderNotes,
  renderArrangements,
  renderAttendee,
  renderAddress,
  renderOffices,
  renderNegotiators,
  renderStartAndEndDate,
  renderDateTime,
  handleShowConfirmModal,
  handleHideConfirmModal,
  CancelConfirmModal,
  handleUpdateAppointment,
  AppointmentDetailModal,
} from '../appointment-detail-modal'
import UPDATE_APPOINTMENT_BY_ID from '../../../../graphql/mutations/update-appointment-by-id.graphql'

describe('appointment-detail-modal', () => {
  describe('capitalizeFirstLetter', () => {
    it('should run correctly', () => {
      const input = ''
      const result = capitalizeFirstLetter(input)
      expect(result).toEqual('')
    })
    it('should run correctly', () => {
      const input = 'abc'
      const result = capitalizeFirstLetter(input)
      expect(result).toEqual('Abc')
    })
  })

  describe('renderCommunicationDetail', () => {
    it('should match snapshot for commuication details', () => {
      const input = {
        homePhone: '070000000',
        workPhone: '070000000',
        mobilePhone: '070000000',
        email: 'chase.maclean@reapitestates.net',
      }
      const data = renderCommunicationDetail(input, false)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot for empty commuication details', () => {
      const input = {}
      const data = renderCommunicationDetail(input, true)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('renderNotes', () => {
    it('should match snapshot for commuication details', () => {
      const input = 'mockDescription'
      const data = renderNotes(input)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot for empty commuication details', () => {
      const input = ''
      const data = renderNotes(input)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('renderArrangements', () => {
    it('should match snapshot for commuication details', () => {
      const input = 'mockDescription'
      const data = renderArrangements(input)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot for empty commuication details', () => {
      const input = ''
      const data = renderArrangements(input)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('renderAttendee', () => {
    it('should match snapshot for commuication details', () => {
      const data = renderAttendee({} as AppointmentAttendeeModel, 'DESKTOP', false)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot for commuication details', () => {
      const data = renderAttendee({} as AppointmentAttendeeModel, 'DESKTOP', true)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot for empty commuication details', () => {
      const data = renderAttendee({} as AppointmentAttendeeModel, 'WEB', true)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot for empty commuication details', () => {
      const data = renderAttendee({} as AppointmentAttendeeModel, 'WEB', false)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('renderAddress', () => {
    it('should match snapshot for commuication details', () => {
      const data = renderAddress(appointment.property, 'DESKTOP')
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot for empty commuication details', () => {
      const data = renderAddress(appointment.property, 'WEB')
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('renderOffices', () => {
    it('should render correctly', () => {
      const data = renderOffices(appointment.offices, 'DESKTOP')
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should render correctly', () => {
      const data = renderOffices(appointment.offices, 'WEB')
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should render correctly', () => {
      const data = renderOffices([], 'DESKTOP')
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should render correctly', () => {
      const data = renderOffices([], 'WEB')
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('renderNegotiators', () => {
    it('should render correctly', () => {
      const data = renderNegotiators(appointment.negotiators)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should render correctly', () => {
      const data = renderNegotiators([])
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('renderStartAndEndDate', () => {
    it('should run correctly', () => {
      const result = renderStartAndEndDate(appointment.start, appointment.end)
      expect(result).toEqual('11 May 2019 05:30 PM - 06:00 PM')
    })
  })
  describe('renderDateTime', () => {
    it('should match snapshot', () => {
      const data = renderDateTime(appointment)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })
  })
  describe('handleShowConfirmModal', () => {
    it('should run correctly', () => {
      const setIsShowConfirmModal = jest.fn()
      const fn = handleShowConfirmModal(setIsShowConfirmModal)
      fn()
      expect(setIsShowConfirmModal).toBeCalledWith(true)
    })
  })
  describe('handleHideConfirmModal', () => {
    it('should run correctly', () => {
      const setIsShowConfirmModal = jest.fn()
      const fn = handleHideConfirmModal(setIsShowConfirmModal)
      fn()
      expect(setIsShowConfirmModal).toBeCalledWith(false)
    })
  })
  describe('handleUpdateAppointment', () => {
    it('should run correctly', () => {
      const mockParams = {
        updateAppointment: jest.fn(),
        appointment,
      }
      const fn = handleUpdateAppointment(mockParams)
      fn()
      expect(mockParams.updateAppointment).toHaveBeenCalledWith({
        variables: {
          id: appointment.id,
          cancelled: true,
          _eTag: appointment._eTag,
        },
      })
    })

    it('should run correctly', () => {
      const mockParams = {
        updateAppointment: jest.fn(),
        appointment: {},
      } as any
      const fn = handleUpdateAppointment(mockParams)
      fn()
      expect(mockParams.updateAppointment).toHaveBeenCalledWith({
        variables: {
          id: '',
          cancelled: true,
          _eTag: '',
        },
      })
    })
  })

  describe('CancelConfirmModal', () => {
    it('should match snapshot', () => {
      const mockProps = {
        isShowConfirmModal: true,
        appointment: appointment,
        setIsShowConfirmModal: jest.fn(),
      }
      const mocks = [
        {
          request: {
            query: UPDATE_APPOINTMENT_BY_ID,
            variables: { id: appointment.id, cancelled: true, _eTag: appointment._eTag },
          },
          result: { data: { appointment } },
        },
      ]
      const wrapper = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
          <CancelConfirmModal {...mockProps} />
        </MockedProvider>,
      )
      expect(wrapper).toMatchSnapshot()
    })
    it('should match snapshot', () => {
      const mockProps = {
        isShowConfirmModal: true,
        appointment: appointment,
        setIsShowConfirmModal: jest.fn(),
      }
      const wrapper = mount(
        <MockedProvider mocks={[]} addTypename={false}>
          <CancelConfirmModal {...mockProps} />
        </MockedProvider>,
      )
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const mockProps = {
        isShowConfirmModal: false,
        appointment: appointment,
        setIsShowConfirmModal: jest.fn(),
      }
      const mocks = [
        {
          request: {
            query: UPDATE_APPOINTMENT_BY_ID,
            variables: { id: appointment.id, cancelled: true, _eTag: appointment._eTag },
          },
          result: { data: { appointment } },
        },
      ]
      const wrapper = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
          <CancelConfirmModal {...mockProps} />
        </MockedProvider>,
      )
      expect(wrapper).toMatchSnapshot()
    })
    it('should match snapshot', () => {
      const mockProps = {
        isShowConfirmModal: false,
        appointment: appointment,
        setIsShowConfirmModal: jest.fn(),
      }
      const wrapper = mount(
        <MockedProvider mocks={[]} addTypename={false}>
          <CancelConfirmModal {...mockProps} />
        </MockedProvider>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('AppointmentDetailModal', () => {
    it('should match snapshot', () => {
      const mockProps = {
        appointment: appointment,
      }
      const wrapper = shallow(<AppointmentDetailModal {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should match snapshot', () => {
      const mockProps = {
        appointment: appointment,
      }
      const wrapper = shallow(<AppointmentDetailModal {...mockProps} />)
      expect(wrapper).toMatchSnapshot()
    })
  })
})
