// import React from 'react'
// import { shallow } from 'enzyme'
// import { appointment } from '@/graphql/__mocks__/appointment'
// import {
//   AppointmentTile,
//   renderFooterItems,
//   renderIconItems,
//   handleDirectionOnClick,
//   renderModalTitle,
//   handleModalClose,
// } from '../appointment-tile'
// import { getMockRouterProps } from '@/core/__mocks__/mock-router'

// const locationMock = { search: '?state=CLIENT', pathname: '/test' }

// jest.mock('react-router-dom', () => ({
//   ...(jest.requireActual('react-router-dom') as Object),
//   useLocation: jest.fn(() => locationMock),
// }))

// describe('appointment-tile', () => {
//   describe('AppointmentTile', () => {
//     it('should match snapshot', () => {
//       const mockProps = {
//         appointment: appointment,
//         nextAppointment: appointment,
//       }
//       const wrapper = shallow(<AppointmentTile {...mockProps} />)
//       expect(wrapper).toMatchSnapshot()
//     })
//   })
//   describe('renderFooterItems', () => {
//     it('should match snapshot', () => {
//       const mockParams = {
//         appointment: appointment,
//         queryParams: {},
//         history: getMockRouterProps({ params: {}, search: '' }).history,
//         setShowDetail: jest.fn(),
//       }
//       const wrapper = shallow(<div>{renderFooterItems(mockParams)}</div>)
//       expect(wrapper).toMatchSnapshot()
//     })
//   })
//   describe('renderIconItems', () => {
//     it('should match snapshot', () => {
//       const mockParams = {
//         appointment: appointment,
//       }
//       const wrapper = shallow(<div>{renderIconItems(mockParams)}</div>)
//       expect(wrapper).toMatchSnapshot()
//     })
//   })
//   describe('handleDirectionOnClick', () => {
//     it('should run correctly', () => {
//       const mockParams = {
//         appointment: appointment,
//         queryParams: {},
//         history: getMockRouterProps({ params: {}, search: '' }).history,
//       }
//       const fn = handleDirectionOnClick(mockParams)
//       fn()
//       expect(mockParams.history.push).toBeCalledWith(
//         '/?appointmentId=NEP1600290&destinationLat=52.079532&destinationLng=-0.790871&tab=map',
//       )
//     })
//   })
//   describe('renderModalTitle', () => {
//     it('should match snapshot', () => {
//       const mockParams = {
//         appointmentType: appointment.appointmentType,
//         heading: 'mockHeading',
//       }
//       const wrapper = shallow(<div>{renderModalTitle(mockParams)}</div>)
//       expect(wrapper).toMatchSnapshot()
//     })

//     it('should match snapshot', () => {
//       const mockParams = {
//         appointmentType: appointment.appointmentType,
//         heading: undefined,
//       }
//       const wrapper = shallow(<div>{renderModalTitle(mockParams)}</div>)
//       expect(wrapper).toMatchSnapshot()
//     })

//     it('should match snapshot', () => {
//       const mockParams = {
//         appointmentType: undefined,
//         heading: 'mock heading',
//       }
//       const wrapper = shallow(<div>{renderModalTitle(mockParams)}</div>)
//       expect(wrapper).toMatchSnapshot()
//     })

//     it('should match snapshot', () => {
//       const mockParams = {
//         appointmentType: undefined,
//         heading: undefined,
//       }
//       const wrapper = shallow(<div>{renderModalTitle(mockParams)}</div>)
//       expect(wrapper).toMatchSnapshot()
//     })
//   })

//   describe('handleModalClose', () => {
//     it('should run correctly', () => {
//       const setShowDetail = jest.fn()
//       const fn = handleModalClose(setShowDetail)
//       fn()
//       expect(setShowDetail).toBeCalledWith(false)
//     })
//   })
// })
