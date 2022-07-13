import { MediaType } from '@reapit/elements'
import React from 'react'
import { mockAppsBrowseState } from '../../../core/__mocks__/use-apps-browse-state'
import { render } from '../../../tests/react-testing'
import { AppsInstalledSuggested, handleCarouselCols, handleSortConfigs } from '../apps-installed-suggested'

describe('AppsInstalledSuggested', () => {
  it('should match a snapshot ', () => {
    expect(render(<AppsInstalledSuggested />)).toMatchSnapshot()
  })
})

describe('handleSortConfigs', () => {
  it('should correctly return sorted configs if ids or uris are not provided', () => {
    const curried = handleSortConfigs(mockAppsBrowseState.appsBrowseConfigState)

    const result = curried()

    expect(result).toEqual([])
  })

  it('should correctly return sorted configs if both ids and uris are provided', () => {
    const curried = handleSortConfigs({
      data: [
        {
          filters: {
            id: ['MOCK_ID1'],
          },
          content: {
            imageUrl: 'https://foo.com',
          },
          configType: 'featuredHeroApps',
          live: {},
        },
        {
          filters: {
            id: ['MOCK_ID2'],
          },
          content: {
            imageUrl: 'https://bar.com',
          },
          configType: 'heroApps',
          live: {},
        },
      ],
    })

    const result = curried()

    expect(result).toEqual([
      {
        id: 'MOCK_ID1',
        imageUrl: 'https://foo.com',
      },
      {
        id: 'MOCK_ID2',
        imageUrl: 'https://bar.com',
      },
    ])
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
