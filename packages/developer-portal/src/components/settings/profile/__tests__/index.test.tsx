import { useReapitConnect } from '@reapit/connect-session'
import React from 'react'
import { SettingsProfilePage } from '..'
import { render, setViewport } from '../../../../tests/react-testing'
import { mockDeveloperModel } from '../../../../tests/__stubs__/developers'

jest.mock('../../../../core/use-global-state')
jest.mock('@reapit/connect-session')

const mockUseReapitConnect = useReapitConnect as jest.Mock

describe('SettingsProfilePage', () => {
  process.env.swaggerWhitelist = [mockDeveloperModel.id as string]
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

  it('should match snapshot for mobile view', () => {
    const testElem = document.createElement('div')
    testElem.id = 'root'
    document.body.appendChild(testElem)

    setViewport('Mobile')
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
