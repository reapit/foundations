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
}

export enum AppsBrowseConfigType {
  featuredHeroApps = 'featuredHeroApps',
  heroApps = 'heroApps',
  appsFilters = 'appsFilters',
  featuredApps = 'featuredApps',
  simpleApps = 'simpleApps',
}

export interface AppBrowseLiveDataInterface {
  timeFrom?: Date
  timeTo?: Date
  isLive?: boolean
}

export interface AppsBrowseConfigItemInterface {
  id?: string
  filters?: AppsBrowseConfigItemFiltersInterface
  content?: AppsBrowseConfigItemContentInterface
  configType: AppsBrowseConfigType
  live: AppBrowseLiveDataInterface
}
