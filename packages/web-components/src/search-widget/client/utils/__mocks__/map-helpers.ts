export const loadMap = jest.fn()
export const centerMapToMarker = jest.fn()
export const fitMapToBounds = jest.fn()
export const getMarker = jest.fn()
export const getInfoWindow = jest.fn(() => ({
  open: jest.fn(),
  close: jest.fn(),
}))
