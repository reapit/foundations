import React from 'react'
import { render } from '../../../tests/react-testing'
import NotificationApi from '../'

describe('notification.hooks', () => {
  beforeAll(() => {
    jest.useFakeTimers()
  })

  afterAll(() => {
    jest.useRealTimers()
  })

  afterEach(() => {
    NotificationApi.destroy()
  })

  it('should run correctly', () => {
    const Context = React.createContext('light')

    const Demo = () => {
      const [api, holder] = NotificationApi.useNotification()

      return (
        <Context.Provider value="bamboo">
          <button
            type="button"
            onClick={() => {
              api.open({
                message: (
                  <Context.Consumer>{(name) => <span className="hook-test-result">{name}</span>}</Context.Consumer>
                ),
                duration: 0,
              })
            }}
          />
          {holder}
        </Context.Provider>
      )
    }

    const wrapper = render(<Demo />)
    wrapper.find('button').simulate('click')
    expect(document.querySelectorAll('.reapit-notification-notice').length).toBe(1)
    const messageEl = document.querySelector('.hook-test-result')
    expect(messageEl?.innerHTML).toEqual('bamboo')
  })
})
