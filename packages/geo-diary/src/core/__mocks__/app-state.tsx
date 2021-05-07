const defaultAppState = {
  currentLat: null,
  currentLng: null,
  hasGeoLocation: false,
  time: 'TODAY',
  travelMode: 'DRIVING',
  destinationLat: null,
  destinationLng: null,
  appointmentId: null,
  appointment: null,
  tab: 'LIST',
  routeInformation: null,
  destinationAddress: null,
  locationAddress: null,
  mapRefs: null,
  locationQueryAddress: null,
  locationQueryResults: [],
  contactDrawerOpen: false,
  contactDrawerType: 'ATTENDEE',
  contactId: null,
  vendors: [],
}

export const useAppState = () => {
  return {
    appState: defaultAppState,
    setAppState: jest.fn(),
  }
}
