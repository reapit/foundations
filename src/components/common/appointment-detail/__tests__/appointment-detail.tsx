import React from 'react'
import { shallow } from 'enzyme'
import {
  AppointmentModal,
  renderStartAndEndDate,
  renderAddress,
  renderCheckMark,
  renderCommunicationDetail,
  renderCommunicationType,
  mapStateToProps,
  mapDispatchToProps,
  renderHrefLink,
  filterLoggedInUser,
  getAdditionalAttendees,
  getApplicantAttendees,
  getModalHeader
} from '../appointment-detail'

import { attendees } from '../__stubs__/mockData'
import { appointmentDataStub } from '../../../../sagas/__stubs__/appointment'
import { LoginMode } from '@reapit/cognito-auth'
import { ReduxState } from '@/types/core'

const { applicant, contact, landlord, negotiator, office, tenant } = attendees

describe('AppointmentModal', () => {
  describe('filter attendees', () => {
    it('filter additional attendees when using getAdditionalAttendees', () => {
      expect(getAdditionalAttendees(Object.values(attendees))).toEqual([negotiator, office])
    })
    it('filter applicant attendees when using getAdditionalAttendees', () => {
      expect(getApplicantAttendees(Object.values(attendees))).toEqual([landlord, contact, applicant, tenant])
    })
  })

  describe('AppointmentModal', () => {
    it('should render correctly', () => {
      const mockProps = {
        appointment: appointmentDataStub,
        visible: true,
        afterClose: jest.fn(),
        isLoading: false,
        userCode: 'mockUserCode',
        appointmentTypes: [],
        loginMode: 'DESKTOP' as LoginMode,
        additionalAttendees: [],
        applicantAttendees: [],
        handleCancelAppointment: jest.fn(),
        isConfirmContentVisible: false
      }
      const wrapper = shallow(<AppointmentModal {...mockProps} />)
      expect(wrapper.find('Modal')).toHaveLength(1)
      expect(wrapper).toMatchSnapshot()
    })

    it('should render correctly for confirm content', () => {
      const mockProps = {
        appointment: appointmentDataStub,
        visible: true,
        afterClose: jest.fn(),
        isLoading: false,
        userCode: 'mockUserCode',
        appointmentTypes: [],
        loginMode: 'DESKTOP' as LoginMode,
        additionalAttendees: [],
        applicantAttendees: [],
        handleCancelAppointment: jest.fn(),
        isConfirmContentVisible: true
      }
      const wrapper = shallow(<AppointmentModal {...mockProps} />)
      expect(wrapper.find('Modal')).toHaveLength(1)
      expect(wrapper).toMatchSnapshot()
    })

    it('should render a header correctly', () => {
      const Header = getModalHeader({
        basicAddress: 'Some address',
        afterClose: jest.fn(),
        type: { value: 'Some type' }
      })
      const wrapper = shallow(<Header />)
      expect(wrapper).toMatchSnapshot()
    })

    it('should render correctly when loading', () => {
      const mockProps = {
        appointment: appointmentDataStub,
        visible: true,
        afterClose: jest.fn(),
        isLoading: true,
        userCode: 'mockUserCode',
        appointmentTypes: [],
        loginMode: 'DESKTOP' as LoginMode,
        additionalAttendees: [],
        applicantAttendees: [],
        handleCancelAppointment: jest.fn(),
        isConfirmContentVisible: false
      }
      const wrapper = shallow(<AppointmentModal {...mockProps} />)
      expect(wrapper.find('Loader')).toHaveLength(1)
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('renderStartAndEndDate', () => {
    it('should run correctly and show Today', () => {
      const input = {
        startDate: '2016-12-18T16:30:00',
        endDate: '2016-12-18T17:30:00'
      }
      const dateData = renderStartAndEndDate(input.startDate, input.endDate)
      expect(dateData.indexOf('Today')).toEqual(-1)
    })
    it('should run correctly and not show Today', () => {
      const input = {
        startDate: '2019-01-01T16:30:00',
        endDate: '2019-01-01T17:30:00'
      }
      const dateData = renderStartAndEndDate(input.startDate, input.endDate)
      expect(dateData.indexOf('01 Jan 2019')).toBeGreaterThanOrEqual(0)
    })
  })

  describe('renderAddress', () => {
    it('should matchSnapshot', () => {
      const input = {
        id: 'BED1600597',
        created: '2019-05-12T17:58:40',
        modified: '2016-12-18T16:03:45',
        start: '2016-12-18T16:30:00',
        end: '2016-12-18T17:30:00',
        type: 'IA',
        recurring: false,
        cancelled: false,
        property: {
          id: 'SOME_ID',
          address: {
            buildingName: '',
            buildingNumber: '65',
            line1: 'Lindsey Close',
            line2: 'Great Denham',
            line3: 'Bedford',
            line4: 'Bedfordshire',
            postcode: 'MK40 4GT',
            country: '',
            geolocation: {
              latitude: 52.1284,
              longitude: -0.507145
            }
          }
        },
        attendees: []
      }
      const data = renderAddress('DESKTOP' as LoginMode, input.property.address, input.property.id)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should run correctly and show not Today', () => {
      const input = {
        id: 'BED1600597',
        created: '2019-05-12T17:58:40',
        modified: '2016-12-18T16:03:45',
        start: '2016-12-18T16:30:00',
        end: '2016-12-18T17:30:00',
        type: 'IA',
        recurring: false,
        cancelled: false,
        property: {
          id: 'SOME_ID',
          address: {
            buildingName: '',
            buildingNumber: '65',
            line1: 'Lindsey Close',
            line2: 'Great Denham',
            line3: 'Bedford',
            line4: 'Bedfordshire',
            postcode: 'MK40 4GT',
            country: '',
            geolocation: {
              latitude: 52.1284,
              longitude: -0.507145
            }
          }
        },
        attendees: []
      }
      const data = renderAddress('DESKTOP' as LoginMode, input.property.address, input.property.id)
      expect(data).not.toBeNull()
    })
    it('should run correctly and show Today', () => {
      const data = renderAddress('DESKTOP' as LoginMode, undefined, undefined)
      expect(data).toBeNull()
    })
  })

  describe('renderCheckMark', () => {
    it('should match snapshot', () => {
      const input = true
      const data = renderCheckMark(input)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('to show TiTick when isConfirmed', () => {
      const input = true
      const data = renderCheckMark(input)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper.find('TiTick')).toHaveLength(1)
    })
    it('to show TiTimes when !isConfirmed', () => {
      const input = false
      const data = renderCheckMark(input)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper.find('TiTimes')).toHaveLength(1)
    })
  })

  describe('renderCommunicationDetail', () => {
    it('should match snapshot', () => {
      const input = [
        {
          label: 'E-Mail',
          detail: 'chase.maclean@reapitestates.net'
        }
      ]
      const data = renderCommunicationDetail(input)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should show when have comminicationDetail', () => {
      const input = [
        {
          label: 'E-Mail',
          detail: 'chase.maclean@reapitestates.net'
        }
      ]
      const data = renderCommunicationDetail(input)
      expect(data).not.toBeNull()
    })
    it('should return null when doesnt have', () => {
      const input = undefined
      const data = renderCommunicationDetail(input)
      expect(data).toBeNull()
    })
  })

  describe('renderCommunicationType', () => {
    it('should match snapshot', () => {
      const input = 'E-Mail'
      const data = renderCommunicationType(input)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper).toMatchSnapshot()
    })
    it('should return <TiMail />', () => {
      const input = 'E-Mail'
      const data = renderCommunicationType(input)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper.find('TiMail')).toHaveLength(1)
    })
    it('should return <TiHome />', () => {
      const input = 'Home'
      const data = renderCommunicationType(input)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper.find('TiHome')).toHaveLength(1)
    })
    it('should return <TiDevicePhone />', () => {
      const input = 'Mobile'
      const data = renderCommunicationType(input)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper.find('TiDevicePhone')).toHaveLength(1)
    })
    it('should return <TiHome />', () => {
      const input = 'Work'
      const data = renderCommunicationType(input)
      const wrapper = shallow(<div>{data}</div>)
      expect(wrapper.find('TiPhoneOutline')).toHaveLength(1)
    })
    it('should return null', () => {
      const input = ''
      const data = renderCommunicationType(input)
      expect(data).toBeNull()
    })
  })
  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      // @ts-ignore: only pick neccessary props
      const mockState = {
        appointmentDetail: {
          confirmModal: {
            isConfirmContentVisible: true
          },
          appointmentDetail: appointmentDataStub,
          isModalVisible: true,
          loading: true
        },
        auth: {
          loginSession: {
            loginIdentity: { userCode: 'cbryan@reapit.com' }
          },
          refreshSession: {
            mode: 'DESKTOP'
          }
        },
        appointments: {
          appointmentTypes: []
        }
      } as ReduxState
      const expected = {
        isConfirmContentVisible: true,
        appointment: appointmentDataStub,
        visible: true,
        isLoading: true,
        appointmentTypes: [],
        loginMode: 'DESKTOP',
        applicantAttendees: [],
        additionalAttendees: [
          {
            id: 'JJS',
            type: 'negotiator',
            name: 'Chase MacLean',
            confirmed: true,
            communicationDetails: [
              {
                label: 'E-Mail',
                detail: 'chase.maclean@reapitestates.net'
              }
            ]
          }
        ]
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(expected)
    })

    it('should return {}', () => {
      const mockState = {
        appointmentDetail: {
          isModalVisible: true,
          loading: true
        },
        auth: {
          loginSession: {
            loginIdentity: { userCode: 'cbryan@reapit.com' }
          }
        },
        appointments: {
          appointmentTypes: []
        }
      } as any
      const expected = {
        visible: true,
        isLoading: true,
        appointment: {},
        appointmentTypes: [],
        loginMode: 'WEB',
        additionalAttendees: [],
        applicantAttendees: []
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(expected)
    })
  })
  describe('mapDispatchToProps', () => {
    it('afterClose should run correctly', () => {
      const mockDispatch = jest.fn()
      const fn = mapDispatchToProps(mockDispatch)
      fn.afterClose()
      expect(mockDispatch).toBeCalled()
    })

    it('handleCancelAppointment should run correctly', () => {
      const mockDispatch = jest.fn()
      const fn = mapDispatchToProps(mockDispatch)
      fn.handleCancelAppointment()
      expect(mockDispatch).toBeCalled()
    })
  })
  describe('renderHrefLink', () => {
    it('should run correctly and return mailto', () => {
      const input = 'E-Mail'
      const output = 'mailto:'
      const result = renderHrefLink(input)
      expect(result).toEqual(output)
    })
    it('should run correctly and return tel:', () => {
      const input = 'Home'
      const output = 'tel:'
      const result = renderHrefLink(input)
      expect(result).toEqual(output)
    })
  })
  describe('filterLoggedInUser', () => {
    it('should run and filter correctly 1', () => {
      const input = [
        {
          id: 'JJS',
          type: 'negotiator',
          name: 'Chase MacLean',
          confirmed: true,
          communicationDetails: [
            {
              label: 'E-Mail',
              detail: 'chase.maclean@reapitestates.net'
            }
          ]
        },
        {
          id: 'JJS1',
          type: 'seller',
          name: 'Chase MacLean',
          confirmed: true,
          communicationDetails: [
            {
              label: 'E-Mail',
              detail: 'cbryan@reapit.com'
            }
          ]
        }
      ]
      const output = [
        {
          id: 'JJS',
          type: 'negotiator',
          name: 'Chase MacLean',
          confirmed: true,
          communicationDetails: [
            {
              label: 'E-Mail',
              detail: 'chase.maclean@reapitestates.net'
            }
          ]
        }
      ]
      const result = filterLoggedInUser(input, 'JJS1')
      expect(result).toEqual(output)
    })

    it('should run and filter correctly 2', () => {
      const input = [
        {
          id: 'JJS1',
          type: 'negotiator',
          name: 'Chase MacLean',
          confirmed: true,
          communicationDetails: [
            {
              label: 'E-Mail',
              detail: 'chase.maclean@reapitestates.net'
            }
          ]
        },
        {
          id: 'JJS2',
          type: 'seller',
          name: 'Chase MacLean',
          confirmed: true,
          communicationDetails: [
            {
              label: 'E-Mail',
              detail: 'chase.maclean@reapitestates.net'
            }
          ]
        }
      ]
      const output = [
        {
          id: 'JJS1',
          type: 'negotiator',
          name: 'Chase MacLean',
          confirmed: true,
          communicationDetails: [
            {
              label: 'E-Mail',
              detail: 'chase.maclean@reapitestates.net'
            }
          ]
        },
        {
          id: 'JJS2',
          type: 'seller',
          name: 'Chase MacLean',
          confirmed: true,
          communicationDetails: [
            {
              label: 'E-Mail',
              detail: 'chase.maclean@reapitestates.net'
            }
          ]
        }
      ]
      const result = filterLoggedInUser(input, 'JSS')
      expect(result).toEqual(output)
    })

    it('should run and filter correctly 3', () => {
      const input = [
        {
          id: 'JJS',
          type: 'negotiator',
          name: 'Chase MacLean',
          confirmed: true,
          communicationDetails: [
            {
              label: 'Home',
              detail: '123456789'
            }
          ]
        },
        {
          id: 'JJS',
          type: 'seller',
          name: 'Chase MacLean',
          confirmed: true,
          communicationDetails: [
            {
              label: 'Home',
              detail: '123456789'
            }
          ]
        }
      ]
      const output = [
        {
          id: 'JJS',
          type: 'negotiator',
          name: 'Chase MacLean',
          confirmed: true,
          communicationDetails: [
            {
              label: 'Home',
              detail: '123456789'
            }
          ]
        },
        {
          id: 'JJS',
          type: 'seller',
          name: 'Chase MacLean',
          confirmed: true,
          communicationDetails: [
            {
              label: 'Home',
              detail: '123456789'
            }
          ]
        }
      ]
      const result = filterLoggedInUser(input, 'cbryan@reapit.com')
      expect(result).toEqual(output)
    })

    it('should run and filter correctly 5', () => {
      const input = []
      const output = []
      const result = filterLoggedInUser(input, 'cbryan@reapit.com')
      expect(result).toEqual(output)
    })
  })
})
