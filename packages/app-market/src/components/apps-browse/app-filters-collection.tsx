import { FC } from 'react'
import { AppsBrowseConfigItem } from './use-apps-browse-state'

interface AppFiltersCollectionProps {
  configItem: AppsBrowseConfigItem
}

export const AppFiltersCollection: FC<AppFiltersCollectionProps> = ({ configItem }) => {
  const { filters, content } = configItem

  console.log('App Filters: ', filters, content)

  return null
}
