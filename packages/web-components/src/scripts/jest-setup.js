const MockDate = require('mockdate')

const mockStorage = (() => {
  let store = {
    __REAPIT_MARKETPLACE_GLOBALS__: null,
  }
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

Object.defineProperty(document, 'execCommand', {
  value: jest.fn(),
})

Object.defineProperty(window, 'location', {
  value: {
    href: '',
  },
})

Object.defineProperty(window, 'reapit', {
  value: {
    config: {
      appEnv: 'development',
      sentryDns: '',
      marketplaceApiUrl: '',
      marketplaceApiKey: '',
      platformApiUrl: '',
      uploadApiUrl: '',
      swaggerUrl: '',
      elementDocumentUrl: '',
      cognitoClientId: '',
      googleAnalyticsKey: '',
      googleMapApiKey: '',
    },
  },
})

Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: () => {
      return ''
    },
  }),
})

Object.defineProperty(window, 'open', {
  value: jest.fn(),
})

Object.defineProperty(window, 'alert', {
  value: jest.fn(),
})

// browserMock.js
Object.defineProperty(document, 'currentScript', {
  value: (document.createElement('div').id = 'coordinate-0-0'),
})

global.navigator.geolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn(),
}

// https://github.com/akiran/react-slick/issues/742
window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {},
    }
  }

MockDate.set(1570747191389)
