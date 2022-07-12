import {
  AppsBrowseConfigItemInterface,
  AppsBrowseConfigItemContentInterface,
  AppsBrowseConfigItemFiltersInterface,
  AppsBrowseConfigEnum,
  AppBrowseLiveDataInterface,
} from '@reapit/foundations-ts-definitions'
import { IsString, IsArray, IsBoolean, IsEnum, IsDateString, IsNotEmpty } from 'class-validator'
import { Type } from 'class-transformer'

class AppBrowseConfigContentDto implements AppsBrowseConfigItemContentInterface {
  @IsString()
  brandColour?: string

  @IsString()
  strapline?: string

  @IsString()
  imageUrl?: string

  @IsString()
  title?: string

  @IsString()
  iconName?: string
}

class AppsBrowseConfigItemFiltersDto implements AppsBrowseConfigItemFiltersInterface {
  @IsString()
  developerId?: string

  @IsArray()
  category?: string[]

  @IsArray()
  desktopIntegrationTypeId?: string[]

  @IsArray()
  id?: string[]

  @IsString()
  appName?: string

  @IsBoolean()
  isFeatured?: boolean

  @IsBoolean()
  isFree?: boolean
}

class AppBrowseLiveDataDto implements AppBrowseLiveDataInterface {
  @IsDateString()
  timeFrom?: Date

  @IsDateString()
  timeTo?: Date

  @IsBoolean()
  isLive?: boolean
}
export class MarketplaceAppModelDto implements AppsBrowseConfigItemInterface {
  @Type(() => AppsBrowseConfigItemFiltersDto)
  filters?: AppsBrowseConfigItemFiltersDto

  @Type(() => AppBrowseConfigContentDto)
  content?: AppBrowseConfigContentDto

  @IsEnum(AppsBrowseConfigEnum)
  @IsNotEmpty()
  configType: AppsBrowseConfigEnum

  @Type(() => AppBrowseLiveDataDto)
  @IsNotEmpty()
  live: AppBrowseLiveDataDto
}
