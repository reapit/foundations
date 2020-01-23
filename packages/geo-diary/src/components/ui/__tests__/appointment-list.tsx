import * as React from 'react'
import { AppointmentList, handleUseEffect, isBlank } from '../appointment-list'
import toJson from 'enzyme-to-json'
import { shallow } from 'enzyme'
import { appointmentsDataStub } from '@/sagas/__stubs__/appointments'
import { ExtendedAppointmentModel } from '@/types/core'
import { AppointmentsData } from '@/reducers/appointments'
import { FaAddressCard, FaStreetView, FaClock } from 'react-icons/fa'
import { IconList } from '@reapit/elements'

describe('AppointmentList', () => {
  it('Should match snapshot if having no data', () => {
    expect(
      toJson(
        shallow(
          <AppointmentList
            appointments={[]}
            appointmentTypes={[]}
            selectedAppointment={null}
            setSelectedAppointment={jest.fn()}
            isOnline={false}
          />,
        ),
      ),
    ).toMatchSnapshot()
  })

  it('Should match snapshot if having no data', () => {
    expect(
      toJson(
        shallow(
          <AppointmentList
            appointments={appointmentsDataStub?.appointments?._embedded || []}
            appointmentTypes={appointmentsDataStub?.appointmentTypes || []}
            selectedAppointment={appointmentsDataStub?.appointments?._embedded?.[0] as ExtendedAppointmentModel}
            setSelectedAppointment={jest.fn()}
            isOnline={false}
          />,
        ),
      ),
    ).toMatchSnapshot()
  })

  it('should return true if address is blank', () => {
    const input = '            '
    const expected = true
    expect(isBlank(input)).toBe(expected)
  })

  it('should render all 3 icons', () => {
    const smallerAppointmentDataStub: AppointmentsData = {
      ...appointmentsDataStub,
      appointments: {
        _embedded: appointmentsDataStub?.appointments?._embedded?.slice(0, 1),
      },
    }

    const wrapper = shallow(
      <AppointmentList
        appointments={smallerAppointmentDataStub.appointments?._embedded || []}
        appointmentTypes={appointmentsDataStub.appointmentTypes || []}
        selectedAppointment={appointmentsDataStub.appointments?._embedded?.[0] as ExtendedAppointmentModel}
        setSelectedAppointment={jest.fn()}
        isOnline={false}
      ></AppointmentList>,
    )

    const iconList = wrapper.find(IconList).dive()

    expect(iconList.find(FaAddressCard)).toHaveLength(1)
    expect(iconList.find(FaStreetView)).toHaveLength(1)
    expect(iconList.find(FaClock)).toHaveLength(1)
  })

  it('should hide the type icon if type not found', () => {
    const notExistTypeId = 'clearlyNotExistTypeId'

    const anAppointmentSub = appointmentsDataStub.appointments?._embedded?.[0]

    const defectData: AppointmentsData = {
      ...appointmentsDataStub,
      appointments: {
        ...appointmentsDataStub.appointments,
        _embedded: [
          {
            ...anAppointmentSub,
            typeId: notExistTypeId,
          },
        ],
      },
    }

    const wrapper = shallow(
      <AppointmentList
        appointments={defectData.appointments?._embedded || []}
        appointmentTypes={appointmentsDataStub.appointmentTypes || []}
        selectedAppointment={appointmentsDataStub.appointments?._embedded?.[0] as ExtendedAppointmentModel}
        setSelectedAppointment={jest.fn()}
        isOnline={false}
      ></AppointmentList>,
    )

    const iconList = wrapper.find(IconList).dive()

    expect(iconList.find(FaAddressCard)).toHaveLength(1)
    expect(iconList.find(FaStreetView)).toHaveLength(0)
    expect(iconList.find(FaClock)).toHaveLength(1)
  })

  it('should hide address icon if address not found', () => {
    const anAppointmentStub = appointmentsDataStub.appointments?._embedded?.[0]

    const defectData: AppointmentsData = {
      ...appointmentsDataStub,
      appointments: {
        ...appointmentsDataStub.appointments,
        _embedded: [
          {
            ...anAppointmentStub,
            property: {
              ...anAppointmentStub?.property,
              address: {
                ...anAppointmentStub?.property?.address,
                line2: '',
                line3: '',
                line4: '',
                postcode: '',
              },
            },
          },
        ],
      },
    }

    const wrapper = shallow(
      <AppointmentList
        appointments={defectData.appointments?._embedded || []}
        appointmentTypes={appointmentsDataStub.appointmentTypes || []}
        selectedAppointment={appointmentsDataStub.appointments?._embedded?.[0] as ExtendedAppointmentModel}
        setSelectedAppointment={jest.fn()}
        isOnline={false}
      ></AppointmentList>,
    )

    const iconList = wrapper.find(IconList).dive()

    expect(iconList.find(FaAddressCard)).toHaveLength(0)
    expect(iconList.find(FaStreetView)).toHaveLength(1)
    expect(iconList.find(FaClock)).toHaveLength(1)
  })

  it('should hide address and type icon if both not found', () => {
    const notExistTypeId = 'clearlyNotExistTypeId'
    const anAppointmentStub = appointmentsDataStub.appointments?._embedded?.[0] as ExtendedAppointmentModel

    const defectData: AppointmentsData = {
      ...appointmentsDataStub,
      appointments: {
        ...appointmentsDataStub.appointments,
        _embedded: [
          {
            ...anAppointmentStub,
            typeId: notExistTypeId,
            property: {
              ...anAppointmentStub?.property,
              address: {
                // ...anAppointmentStub?.property?.address,
                line2: '',
                line3: '',
                line4: '',
                postcode: '',
              },
            },
          },
        ],
      },
    }

    const wrapper = shallow(
      <AppointmentList
        appointments={defectData.appointments?._embedded || []}
        appointmentTypes={appointmentsDataStub.appointmentTypes || []}
        selectedAppointment={appointmentsDataStub.appointments?._embedded?.[0] as ExtendedAppointmentModel}
        setSelectedAppointment={jest.fn()}
        isOnline={false}
      ></AppointmentList>,
    )

    const iconList = wrapper.find(IconList).dive()

    expect(iconList.find(FaAddressCard)).toHaveLength(0)
    expect(iconList.find(FaStreetView)).toHaveLength(0)
    expect(iconList.find(FaClock)).toHaveLength(1)
  })

  describe('handleUseEffect', () => {
    it('should run correctly', () => {
      const mockRefAppointment = {
        current: {
          scrollIntoView: jest.fn(),
        },
      }
      const fn = handleUseEffect({ refAppointment: mockRefAppointment })
      fn()
      expect(mockRefAppointment.current.scrollIntoView).toBeCalled()
    })
  })
})
