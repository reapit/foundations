import { useReapitGet } from '@reapit/utils-react'
import React from 'react'
import { MediaType } from '@reapit/elements'
import { render } from '../../../tests/react-testing'
import { mockAppDetailModel } from '../../../tests/__stubs__/apps'
import { mockDesktopIntegrationTypeModelPagedResult } from '../../../tests/__stubs__/desktop-integration-types'
import { mockDeveloperModel } from '../../../tests/__stubs__/developers'
import { AppsDetail, handleCarouselCols } from '../apps-detail'

jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [null, false]),
  HTMLRender: () => <div>Mock Component</div>,
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('AppsDetail', () => {
  it('should match a snapshot with data', () => {
    mockUseReapitGet
      .mockReturnValue([mockAppDetailModel, false])
      .mockReturnValue([mockDeveloperModel, false])
      .mockReturnValue([mockDesktopIntegrationTypeModelPagedResult, false])
    expect(render(<AppsDetail />)).toMatchSnapshot()
  })

  it('should match a snapshot when loading', () => {
    mockUseReapitGet.mockReturnValue([null, true]).mockReturnValue([null, true]).mockReturnValue([null, true])
    expect(render(<AppsDetail />)).toMatchSnapshot()
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
