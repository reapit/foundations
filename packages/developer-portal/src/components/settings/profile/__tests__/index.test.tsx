import { useReapitConnect } from '@reapit/connect-session'
import React from 'react'
import { SettingsProfilePage } from '..'
import { render } from '../../../../tests/react-testing'

jest.mock('../../../../core/use-global-state')
jest.mock('@reapit/connect-session')

const mockUseReapitConnect = useReapitConnect as jest.Mock

describe('SettingsProfilePage', () => {
  it('should match snapshot', () => {
    mockUseReapitConnect.mockReturnValue({
      connectSession: {
        loginIdentity: {
          orgName: 'Some Org',
          developerId: 'SOME_ID',
          groups: [],
        },
      },
    })
    expect(render(<SettingsProfilePage />)).toMatchSnapshot()
  })
})
