const Adapter = require('enzyme-adapter-react-16')
const Enzyme = require('enzyme')
const fetchMock = require('jest-fetch-mock')

Enzyme.configure({ adapter: new Adapter() })
global.fetch = fetchMock

const mockStorage = (() => {
  let store = {}
  return {
    getItem: key => {
      return store[key]
    },
    setItem: (key, value) => {
      store[key] = value.toString()
    },
    removeItem: key => {
      store[key] = undefined
    },
    clear: () => {
      store = {}
    },
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: mockStorage,
})

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: () => {
      return ''
    },
  }),
})

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
}

global.navigator.geolocation = mockGeolocation

// browserMock.js
Object.defineProperty(document, 'currentScript', {
  value: (document.createElement('div').id = 'coordinate-0-0'),
})
