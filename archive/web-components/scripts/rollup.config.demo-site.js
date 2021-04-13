import { baseConfigurationWithoutTheme as bookViewingWidgetConfiguration } from './rollup.config.book-viewing-widget'
// eslint-disable-next-line max-len
import { baseConfigurationWithoutTheme as bookValuationWidgetConfiguration } from './rollup.config.book-valuation-widget'
import { baseConfigurationWithoutTheme as searchWidgetConfiguration } from './rollup.config.search-widget'
// eslint-disable-next-line max-len
import { baseConfigurationWithoutTheme as propertyDetailWidgetConfiguration } from './rollup.config.property-detail-widget'
import themeConfiguration from './rollup.config.themes'

/**
 *  all required modules for demo-site packages
 */

const buildConfigurations = [
  propertyDetailWidgetConfiguration,
  searchWidgetConfiguration,
  bookViewingWidgetConfiguration,
  bookValuationWidgetConfiguration,
  themeConfiguration,
]

export default buildConfigurations
