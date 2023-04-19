import React from 'react'
import {
  DeveloperEditionModal,
  handleCloseModal,
  handleDownload,
  handleOnConfirm,
  HAS_SUB_MESSAGE,
} from '../developer-edition-modal'
import { render } from '../../../tests/react-testing'
import { mockDeveloperModel } from '../../../tests/__stubs__/developers'
import { useReapitUpdate } from '@reapit/use-reapit-data'
import { useReapitConnect } from '@reapit/connect-session'
import { useGlobalState } from '../../../core/use-global-state'
import { mockMemberModel } from '../../../tests/__stubs__/members'

jest.mock('../../../core/use-global-state')
jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitUpdate: jest.fn(() => []),
}))
jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: jest.fn(() => ({
    connectSession: {
      idToken: 'MOCK_TOKEN',
      loginIdentity: {
        developerId: 'MOCK_DEVELOPER_ID',
        agencyCloudId: 'SBOX',
        groups: [],
      },
    },
  })),
}))

const mockUseReapitUpdate = useReapitUpdate as jest.Mock
const mockUseReapitConnect = useReapitConnect as jest.Mock
const mockUseGlobalState = useGlobalState as jest.Mock

describe('DeveloperEditionModal', () => {
  beforeEach(() => {
    const testElem = document.createElement('div')
    testElem.id = 'root'
    document.body.appendChild(testElem)
  })
  it('should match snapshot when visible', () => {
    const wrapper = render(<DeveloperEditionModal visible={true} setSubscribingState={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot when not visible', () => {
    const wrapper = render(<DeveloperEditionModal visible={false} setSubscribingState={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot when has subscribed', () => {
    mockUseReapitUpdate.mockReturnValue([false, false, jest.fn(), true])
    const wrapper = render(<DeveloperEditionModal visible={true} setSubscribingState={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot when has a subscription already', () => {
    mockUseReapitUpdate.mockReturnValue([false, false, jest.fn(), false, HAS_SUB_MESSAGE])
    const wrapper = render(<DeveloperEditionModal visible={true} setSubscribingState={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot when has billing content and is an admin', () => {
    mockUseGlobalState.mockReturnValue({
      globalDataState: {
        currentDeveloper: {
          ...mockDeveloperModel,
          status: 'incomplete',
        },
        currentMember: {
          ...mockMemberModel,
          role: 'admin',
        },
      },
    })
    mockUseReapitUpdate.mockReturnValue([false, false, jest.fn(), false, null])
    const wrapper = render(<DeveloperEditionModal visible={true} setSubscribingState={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot when has billing content and is a user', () => {
    mockUseGlobalState.mockReturnValue({
      globalDataState: {
        currentDeveloper: {
          ...mockDeveloperModel,
          status: 'incomplete',
        },
        currentMember: {
          ...mockMemberModel,
          role: 'user',
        },
      },
    })
    mockUseReapitUpdate.mockReturnValue([false, false, jest.fn(), false, null])
    const wrapper = render(<DeveloperEditionModal visible={true} setSubscribingState={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match snapshot when has client data', () => {
    mockUseReapitConnect.mockReturnValue({
      connectSession: {
        idToken: 'MOCK_TOKEN',
        loginIdentity: {
          developerId: 'MOCK_DEVELOPER_ID',
          agencyCloudId: 'SOM',
          groups: ['ReapitUser'],
        },
      },
    })
    mockUseReapitUpdate.mockReturnValue([false, false, jest.fn(), false, null])
    const wrapper = render(<DeveloperEditionModal visible={true} setSubscribingState={jest.fn()} />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleDownload', () => {
  it('should open download link', () => {
    const downloadURL = 'downloadURL'
    process.env.developerEditionDownloadUrl = downloadURL
    window.open = jest.fn()

    handleDownload()
    expect(window.open).toBeCalledWith(downloadURL, '_self')
  })
})

describe('handleOnConfirm', () => {
  it('should correctly handle creating a sub', async () => {
    const developer = mockDeveloperModel
    const email = 'test@example.com'
    const createSubscription = jest.fn(() => new Promise<boolean>((resolve) => resolve(true)))
    const setSubscribingState = jest.fn()

    const curried = handleOnConfirm(developer, createSubscription, setSubscribingState, email)

    await curried()

    expect(createSubscription).toHaveBeenCalledTimes(1)
    expect(setSubscribingState).toHaveBeenCalledWith('INITIAL')
  })
})

describe('handleCloseModal', () => {
  it('should correctly handle close', () => {
    const setSubscribingState = jest.fn()
    const closeModal = jest.fn()

    const curried = handleCloseModal(setSubscribingState, closeModal)
    curried()

    expect(setSubscribingState).toHaveBeenCalledWith('INITIAL')
    expect(closeModal).toHaveBeenCalledTimes(1)
  })
})
