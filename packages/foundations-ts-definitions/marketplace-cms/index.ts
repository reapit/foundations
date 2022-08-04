export interface AppsBrowseConfigItemContentInterface {
  brandColour?: string
  strapline?: string
  imageUrl?: string
  title?: string
  iconName?: string
}

export interface AppsBrowseConfigItemFiltersInterface {
  developerId?: string
  category?: string[]
  desktopIntegrationTypeId?: string[]
  id?: string[]
  appName?: string
  isFeatured?: boolean
  isFree?: boolean
  searchTerm?: string
}

export enum AppsBrowseConfigEnum {
  FEATURED_HERO = 'featuredHeroApps',
  HERO = 'heroApps',
  FILTERS = 'appsFilters',
  FEATURED = 'featuredApps',
  SIMPLE = 'simpleApps',
}

export interface AppBrowseLiveDataInterface {
  timeFrom?: string
  timeTo?: string
  isLive?: boolean
}

export interface AppsBrowseConfigItemInterface {
  id?: string
  index?: number
  filters?: AppsBrowseConfigItemFiltersInterface
  content?: AppsBrowseConfigItemContentInterface
  configType: AppsBrowseConfigEnum
  live: AppBrowseLiveDataInterface
}
