import React from 'react'
import ReactDOM from 'react-dom'
import NotificationApi, { getPlacementStyle } from '../'

describe('Notification', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  afterEach(() => {
    NotificationApi.destroy()
  })

  describe('NotificationApi', () => {
    it('not duplicate create holder', () => {
      const originRender = ReactDOM.render
      const argsList = []
      const spyRender = jest.spyOn(ReactDOM, 'render').mockImplementation((...args) => {
        argsList.push(args as never)
      })
      for (let i = 0; i < 5; i += 1) {
        NotificationApi.open({
          message: 'Notification Title',
          duration: 0,
          prefixCls: 'additional-holder',
        })
      }

      argsList.forEach(args => {
        originRender(args[0], args[1], args[2])
      })

      const count = document.querySelectorAll('.additional-holder').length
      expect(count).toEqual(1)

      spyRender.mockRestore()
    })
  })

  it('should be able to hide manually', async () => {
    NotificationApi.open({
      message: 'Notification Title',
      duration: 0,
      key: '1',
    })
    NotificationApi.open({
      message: 'Notification Title',
      duration: 0,
      key: '2',
    })

    await Promise.resolve()
    expect(document.querySelectorAll('.reapit-notification-notice').length).toBe(2)
    NotificationApi.close('1')
    await Promise.resolve()
    jest.runAllTimers()
    expect(document.querySelectorAll('.reapit-notification-notice').length).toBe(1)
    NotificationApi.close('2')
    await Promise.resolve()
    jest.runAllTimers()
    expect(document.querySelectorAll('.reapit-notification-notice').length).toBe(0)
  })

  it('should be able to destroy globally', async () => {
    NotificationApi.open({
      message: 'Notification Title',
      duration: 0,
    })
    NotificationApi.open({
      message: 'Notification Title',
      duration: 0,
    })
    await Promise.resolve()
    expect(document.querySelectorAll('.reapit-notification').length).toBe(1)
    expect(document.querySelectorAll('.reapit-notification-notice').length).toBe(2)
    NotificationApi.destroy()
    await Promise.resolve()
    expect(document.querySelectorAll('.reapit-notification').length).toBe(0)
    expect(document.querySelectorAll('.reapit-notification-notice').length).toBe(0)
  })

  it('should be able to destroy after config', () => {
    NotificationApi.config({
      bottom: 100,
    })
    NotificationApi.destroy()
  })

  it('trigger onClick', () => {
    NotificationApi.open({
      message: 'Notification Title',
      duration: 0,
    })
    expect(document.querySelectorAll('.reapit-notification').length).toBe(1)
  })

  it('support closeIcon', () => {
    NotificationApi.open({
      message: 'Notification Title',
      duration: 0,
      closeIcon: <span className="test-customize-icon" />,
    })
    expect(document.querySelectorAll('.test-customize-icon').length).toBe(1)
  })

  it('support config closeIcon', () => {
    NotificationApi.config({
      closeIcon: <span className="test-customize-icon" />,
    })
    NotificationApi.open({
      message: 'Notification Title',
      duration: 0,
      closeIcon: <span className="test-customize-icon" />,
    })
    expect(document.querySelectorAll('.test-customize-icon').length).toBe(1)
  })

  describe('getPlacementStyle', () => {
    it('should run correctly', () => {
      expect(getPlacementStyle('topLeft', 10, 20)).toEqual({
        left: 0,
        top: 10,
        bottom: 'auto',
      })

      expect(getPlacementStyle('topRight', 10, 20)).toEqual({
        right: 0,
        top: 10,
        bottom: 'auto',
      })

      expect(getPlacementStyle('bottomLeft', 10, 20)).toEqual({
        left: 0,
        bottom: 20,
        top: 'auto',
      })

      expect(getPlacementStyle('bottomRight', 10, 20)).toEqual({
        right: 0,
        bottom: 20,
        top: 'auto',
      })
    })
  })
})
