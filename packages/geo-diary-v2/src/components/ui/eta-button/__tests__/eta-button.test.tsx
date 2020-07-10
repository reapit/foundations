import * as React from 'react'
import { ETAButton, getAttendeeHaveMobilePhone, getNegotiator, handleUseEffect } from '../eta-button'
import { shallow } from 'enzyme'
import { appointment } from '@/graphql/__mocks__/appointment'

let userAgentGetter
jest.mock('../api', () => ({
  fetchDestinationInformation: jest.fn().mockResolvedValue({
    rows: [
      {
        elements: [{ duration: { text: 'mockText', value: 1 } }],
      },
    ],
  }),
}))
describe('eta-button', () => {
  describe('ETAButton', () => {
    beforeEach(() => {
      userAgentGetter = jest.spyOn(window.navigator, 'userAgent', 'get')
    })
    it('Should match snapshot', () => {
      const mockProps = {
        appointment: appointment,
        queryParams: {},
      }
      expect(shallow(<ETAButton {...mockProps} />)).toMatchSnapshot()
    })

    it('Should include body message if using Android phone', () => {
      const mockProps = {
        appointment: appointment,
        queryParams: {},
      }
      userAgentGetter.mockReturnValue(
        'Mozilla/5.0 (Linux; U; Android 1.6; en-us; HTC_TATTOO_A3288 Build/DRC79)' +
          ' AppleWebKit/528.5+ (KHTML, like Gecko) Version/3.1.2 Mobile Safari/525.20.1',
      )
      const wrapper = shallow(<ETAButton {...mockProps} />)
      expect(wrapper.find('[data-test="eta-button"]').prop('href')).toBe(
        'sms:undefined?&body=Hi , I am on my way to you. I will be with you in approximately undefined.',
      )
    })
  })
  describe('handleUseEffect', () => {
    it('should run correctly', done => {
      const mockParams = { setDuration: jest.fn(), queryParams: {}, appointment }
      const fn = handleUseEffect(mockParams)
      fn()
      setTimeout(() => {
        expect(mockParams.setDuration).toBeCalledWith({ text: 'mockText', value: 1 })
        done()
      }, 1000)
    })
  })
  describe('getNegotiator', () => {
    it('should run correctly', () => {
      const mockParams = {
        appointment: appointment,
        userCode: 'LJW',
      }
      const fn = getNegotiator(mockParams)
      const result = fn()
      expect(result).toEqual({
        __typename: 'NegotiatorModel',
        _eTag: '"CB9E584CE62E60C463C142EDCB433608"',
        _embedded: {},
        _links: {
          office: {
            href: '/offices/ALB',
          },
          self: {
            href: '/negotiators/LJW',
          },
        },
        active: true,
        created: '2014-11-10T15:24:39Z',
        email: 'emilie.boyd@reapitestates.net',
        id: 'LJW',
        jobTitle: '',
        metadata: {},
        mobilePhone: '',
        modified: '2020-07-07T08:14:31Z',
        name: 'Liam Jowett',
        officeId: 'ALB',
        workPhone: '',
      })
    })
    it('should run correctly', () => {
      const mockParams = {
        appointment: appointment,
        userCode: '',
      }
      const fn = getNegotiator(mockParams)
      const result = fn()
      expect(result).toEqual(undefined)
    })
  })
  describe('getAttendeeHaveMobilePhone a', () => {
    it('should run correctly', () => {
      const fn = getAttendeeHaveMobilePhone(appointment)
      const result = fn()
      expect(result).toEqual(undefined)
    })
  })
})
