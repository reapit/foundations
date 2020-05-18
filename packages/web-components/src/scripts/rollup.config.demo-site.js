import { baseConfigurationWithoutTheme as viewBookingBuidConfiguration } from './rollup.config.viewing-booking'
import { baseConfigurationWithoutTheme as appointmentBookingConfiguration } from './rollup.config.appointment-bookings'
import { baseConfigurationWithoutTheme as searchWidgetConfiguration } from './rollup.config.search-widget'
import { baseConfigurationWithoutTheme as propertyDetailConfiguration } from './rollup.config.property-detail'
import themeConfiguration from './rollup.config.themes'

/**
 *  all required modules for demo-site packages
 */

const buildConfigurations = [
  propertyDetailConfiguration,
  searchWidgetConfiguration,
  viewBookingBuidConfiguration,
  appointmentBookingConfiguration,
  themeConfiguration,
]

export default buildConfigurations
