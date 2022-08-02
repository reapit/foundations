import React, { FC, useMemo } from 'react'
import { isTruthy } from '@reapit/utils-common'
import { InstalledSuggestedImage, InstalledSuggestedImageWrapper } from './__styles__'
import { elFadeIn, MediaType, Subtitle, useMediaQuery } from '@reapit/elements'
import { AppsBrowseConfigCollection, useAppsBrowseState } from '../../core/use-apps-browse-state'
import { Carousel } from '../carousel'
import { navigate } from '../../utils/navigation'
import { Routes } from '../../constants/routes'
import { useHistory } from 'react-router-dom'

export const handleCarouselCols = (mediaQuery: MediaType) => () => {
  const { isMobile, isTablet, isDesktop } = mediaQuery

  if (isMobile) {
    return 1
  }

  if (isTablet || isDesktop) {
    return 2
  }

  return 3
}

export const handleSortConfigs = (appsBrowseConfigState: AppsBrowseConfigCollection | null) => () => {
  const featuredHeroApps =
    appsBrowseConfigState?.items.filter((config) => config.configType === 'featuredHeroApps') ?? []
  const heroApps = appsBrowseConfigState?.items.filter((config) => config.configType === 'heroApps') ?? []

  const featuredHeroAppDetails = featuredHeroApps
    .map(({ content, filters }) => {
      if (content?.imageUrl && filters?.id && filters?.id[0]) {
        return {
          imageUrl: content.imageUrl,
          id: filters.id[0],
        }
      }
    })
    .flat()
    .filter(isTruthy)

  const heroAppDetails = heroApps
    .map(({ content, filters }) => {
      if (content?.imageUrl && filters?.id && filters?.id[0]) {
        return {
          imageUrl: content.imageUrl,
          id: filters.id[0],
        }
      }
    })
    .flat()
    .filter(isTruthy)

  return [...featuredHeroAppDetails, ...heroAppDetails]
}

export const AppsInstalledSuggested: FC = () => {
  const { appsBrowseConfigState } = useAppsBrowseState()
  const history = useHistory()
  const mediaQuery = useMediaQuery()
  const suggestedAppImages = useMemo(handleSortConfigs(appsBrowseConfigState), [appsBrowseConfigState])
  const carouselCols = useMemo<number>(handleCarouselCols(mediaQuery), [mediaQuery])

  return suggestedAppImages.length ? (
    <div className={elFadeIn}>
      <Subtitle hasBoldText>Suggested Apps</Subtitle>
      <Carousel
        numberCols={carouselCols}
        items={suggestedAppImages?.map(({ imageUrl, id }) => {
          return (
            <InstalledSuggestedImageWrapper onClick={navigate(history, `${Routes.APPS_BROWSE}/${id}`)} key={id}>
              <InstalledSuggestedImage src={imageUrl} alt={imageUrl} />
            </InstalledSuggestedImageWrapper>
          )
        })}
      />
    </div>
  ) : null
}
