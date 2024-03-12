import React from 'react'
import { render } from '../../../tests/react-testing'
import { ToggleSupportNotification, handleSetSupportNotification } from '../toggle-support-notification'

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitUpdate: jest.fn(() => [undefined, undefined, jest.fn(), false]),
}))

describe('ToggleSupportNotification', () => {
  it('should match a snapshot', () => {
    expect(render(<ToggleSupportNotification appId="MOCK_ID" hasReadAccess={true} />)).toMatchSnapshot()
  })

  it('handleSetSupportNotification', () => {
    const setNotificationFunction = jest.fn()

    const curried = handleSetSupportNotification(setNotificationFunction)

    curried()

    expect(setNotificationFunction).toHaveBeenCalledTimes(1)
  })
})
