import viewBookingBuidConfigurations from './rollup.config.viewing-booking'
import appointmentBookingConfigurations from './rollup.config.appointment-bookings'
import searchWidgetConfigurations from './rollup.config.search-widget'
import themesConfiguration from './rollup.config.themes.js'

/**
 *  all required modules for demo-site packages
 */
const buildConfigurations = [
  ...searchWidgetConfigurations,
  ...viewBookingBuidConfigurations,
  ...appointmentBookingConfigurations,
  themesConfiguration,
]

export default buildConfigurations
