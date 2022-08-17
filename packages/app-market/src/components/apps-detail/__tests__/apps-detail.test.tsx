import { useReapitGet } from '@reapit/utils-react'
import React from 'react'
import { MediaType } from '@reapit/elements'
import { render, setViewport, viewPortOptions } from '../../../tests/react-testing'
import { mockAppDetailModel } from '../../../tests/__stubs__/apps'
import { mockDesktopIntegrationTypeModelPagedResult } from '../../../tests/__stubs__/desktop-integration-types'
import { AppsDetail, handleCarouselCols, handleOpenVideoModal, VideoType } from '../apps-detail'

window.reapit.config.clientHiddenAppIds = {}
window.reapit.config.orgAdminRestrictedAppIds = []

jest.mock('@reapit/connect-session', () => ({
  ReapitConnectBrowserSession: jest.fn(),
  useReapitConnect: jest.fn(() => ({
    connectSession: {
      loginIdentity: {
        clientId: 'MOCK_CLIENT_ID',
        groups: ['OrganisationAdmin'],
      },
    },
    connectIsDesktop: false,
  })),
}))

jest.mock('@reapit/utils-react', () => ({
  ...jest.requireActual('@reapit/utils-react'),
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

describe('handleOpenModal', () => {
  it('should handle opening modal', () => {
    const setVideoUrl = jest.fn()
    const videoOpenModal = jest.fn()
    const videoUrl = 'https://example.com'

    const curried = handleOpenVideoModal(setVideoUrl, videoOpenModal, 'Marketing Presentation' as VideoType, videoUrl)

    curried()

    expect(setVideoUrl).toHaveBeenCalledWith(videoUrl)
    expect(videoOpenModal).toHaveBeenCalledTimes(1)
  })
})
