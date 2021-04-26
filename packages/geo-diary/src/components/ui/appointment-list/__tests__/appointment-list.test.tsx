// import React from 'react'
// import { shallow } from 'enzyme'
// import { appointment } from '@/graphql/__mocks__/appointment'
// import { AppointmentList, getTodayNextAppointment } from '../appointment-list'
// import { ExtendedAppointmentModel } from '@/types/global'

// describe('appointment-list', () => {
//   describe('AppointmentList', () => {
//     it('should match snapshot', () => {
//       const mockProps = {
//         appointments: [appointment],
//       }
//       const wrapper = shallow(<AppointmentList {...mockProps} />)
//       expect(wrapper).toMatchSnapshot()
//     })
//   })
//   describe('getTodayNextAppointment', () => {
//     it('Should return the next appointment in today', () => {
//       const appointments = [
//         { start: '2019-10-10T22:00:00' },
//         { start: '2019-10-10T22:45:00' },
//         { start: '2019-10-10T23:00:00' },
//       ] as ExtendedAppointmentModel[]
//       expect(getTodayNextAppointment(appointments)).toBe(appointments[1])
//     })
//     it('Should return undefined if appointments are from another day(s)', () => {
//       const appointments = [
//         { start: '2019-02-18T16:30:00' },
//         { start: '2019-13-18T17:10:00' },
//         { start: '2019-15-18T16:30:00' },
//       ] as ExtendedAppointmentModel[]
//       expect(getTodayNextAppointment(appointments)).toBeUndefined()
//     })
//   })
// })
