export const API_VERSION = '2020-01-31'

export const URLS = {
  areas: '/areas',
  contacts: '/contacts',
  offices: '/offices',
  appointments: '/appointments',
  identityChecks: '/identityChecks',
  negotiators: '/negotiators',
<<<<<<< HEAD
  properties: '/properties',
  propertyTypes: '/configuration/appointmentTypes',
=======
  configurations: '/configuration',
>>>>>>> support GET configurations and configuration (by ID) by pre-defined types
}

export const HEADERS = {
  'Content-Type': 'application/json',
  'api-version': API_VERSION,
}
