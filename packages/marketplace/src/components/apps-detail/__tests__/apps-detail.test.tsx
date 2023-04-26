import { useReapitGet } from '@reapit/use-reapit-data'
import React from 'react'
import { MediaType } from '@reapit/elements'
import { render, setViewport, viewPortOptions } from '../../../tests/react-testing'
import { mockAppDetailModel } from '../../../tests/__stubs__/apps'
import { mockDesktopIntegrationTypeModelPagedResult } from '../../../tests/__stubs__/desktop-integration-types'
import {
  AppsDetail,
  handleCarouselCols,
  handleCloseVideoModal,
  handleOpenInstallModal,
  handleOpenVideoModal,
  handleSalesBannerClick,
  VideoType,
} from '../apps-detail'
import { trackEvent } from '../../../core/analytics'
import { TrackingEvent } from '../../../core/analytics-events'
import { LoginIdentity } from '@reapit/connect-session'

process.env.clientHiddenAppIds = {}
process.env.orgAdminRestrictedAppIds = []

jest.useFakeTimers()
jest.mock('../../../core/analytics')
jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: jest.fn(() => ({
    connectSession: {
      loginIdentity: {
        offGrouping: true,
        clientId: 'MOCK_CLIENT_ID',
        groups: ['OrganisationAdmin'],
      },
    },
    connectIsDesktop: false,
  })),
}))

jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [null, false]),
  HTMLRender: () => <div>Mock Component</div>,
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('AppsDetail', () => {
  it('should match a snapshot with data', () => {
    const testElem = document.createElement('div')
    testElem.id = 'root'
    document.body.appendChild(testElem)

    mockUseReapitGet
      .mockReturnValueOnce([mockAppDetailModel, false])
      .mockReturnValueOnce([mockDesktopIntegrationTypeModelPagedResult, false])
    expect(render(<AppsDetail />)).toMatchSnapshot()
  })

  it('should match a snapshot when not installed', () => {
    const testElem = document.createElement('div')
    testElem.id = 'root'
    document.body.appendChild(testElem)

    mockUseReapitGet
      .mockReturnValueOnce([{ ...mockAppDetailModel, installedOn: 'FOO' }, false])
      .mockReturnValueOnce([mockDesktopIntegrationTypeModelPagedResult, false])
    expect(render(<AppsDetail />)).toMatchSnapshot()
  })

  it('should match a snapshot when loading', () => {
    mockUseReapitGet.mockReturnValue([null, true])

    expect(render(<AppsDetail />)).toMatchSnapshot()
  })

  viewPortOptions.forEach((option) => {
    it(`should match a snapshot for viewport ${option}`, () => {
      setViewport(option)
      expect(render(<AppsDetail />)).toMatchSnapshot()
    })
  })
})

describe('handleCarouselCols', () => {
  it('should  return the correct number of cols when mobile', () => {
    const mediaQuery = {
      isMobile: true,
    } as MediaType
    const curried = handleCarouselCols(mediaQuery)

    const result = curried()

    expect(result).toEqual(1)
  })

  it('should  return the correct number of cols when tablet', () => {
    const mediaQuery = {
      isTablet: true,
    } as MediaType
    const curried = handleCarouselCols(mediaQuery)

    const result = curried()

    expect(result).toEqual(2)
  })

  it('should  return the correct number of cols when desktop', () => {
    const mediaQuery = {
      isDesktop: true,
    } as MediaType
    const curried = handleCarouselCols(mediaQuery)

    const result = curried()

    expect(result).toEqual(2)
  })

  it('should  return the correct number of cols when other resolutions', () => {
    const mediaQuery = {
      isWideScreen: true,
    } as MediaType
    const curried = handleCarouselCols(mediaQuery)

    const result = curried()

    expect(result).toEqual(3)
  })
})

describe('handleOpenVideoModal', () => {
  it('should handle opening video modal', () => {
    const setVideoUrl = jest.fn()
    const videoOpenModal = jest.fn()
    const videoUrl = 'https://www.youtube.com/embed/'

    const curried = handleOpenVideoModal(setVideoUrl, videoOpenModal, 'Marketing Presentation' as VideoType, videoUrl)

    curried()

    expect(setVideoUrl).toHaveBeenCalledWith(videoUrl)
    expect(videoOpenModal).toHaveBeenCalledTimes(1)
  })

  it('should handle opening video for a non whitelisted video', () => {
    const windowSpy = jest.spyOn(window, 'open')
    const setVideoUrl = jest.fn()
    const videoOpenModal = jest.fn()
    const videoUrl = 'https://example.com'

    const curried = handleOpenVideoModal(setVideoUrl, videoOpenModal, 'Marketing Presentation' as VideoType, videoUrl)

    curried()

    expect(windowSpy).toHaveBeenCalledWith(videoUrl, '_blank', 'noopener, noreferrer')
    expect(setVideoUrl).not.toHaveBeenCalled()
    expect(videoOpenModal).not.toHaveBeenCalled()
  })
})

describe('handleOpenInstallModal', () => {
  it('should handle opening install modal', () => {
    const appInstallOpenModal = jest.fn()
    const appName = 'MOCK_APP_NAME'
    const clientId = 'MOCK_CLIENT_ID'
    const email = 'mail@example.com'

    const curried = handleOpenInstallModal(appInstallOpenModal, appName, clientId, email)

    curried()

    expect(appInstallOpenModal).toHaveBeenCalledTimes(1)
    expect(trackEvent).toHaveBeenCalledWith(TrackingEvent.ClickInstallAppButton, true, { appName, clientId, email })
  })
})

describe('handleCloseVideoModal', () => {
  it('should handle opening video modal', () => {
    const closeModal = jest.fn()

    const curried = handleCloseVideoModal(closeModal)

    curried()

    expect(trackEvent).toHaveBeenCalledWith(TrackingEvent.ClickCloseVideo, true)
    expect(closeModal).toHaveBeenCalledTimes(1)
  })
})

describe('handleSalesBannerClick', () => {
  it('handles sales banner click', () => {
    const setSalesBannerVisible = jest.fn()
    const salesBannerVisibile = true
    const loginIdentity = {
      email: 'test@mail.com',
      name: 'MOCK_NAME',
      clientId: 'MOCK_CLIENT_ID',
      userCode: 'MOCK_USER_CODE',
      orgName: 'MOCK_ORG_NAME',
    } as LoginIdentity
    const curried = handleSalesBannerClick(setSalesBannerVisible, salesBannerVisibile, loginIdentity)
    curried()
    expect(setSalesBannerVisible).toBeCalledWith(false)
    expect(trackEvent).toHaveBeenCalledWith(TrackingEvent.ClickSalesLeadBanner, true, loginIdentity)
  })
})
