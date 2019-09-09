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
    }
  }
})()

Object.defineProperty(window, 'localStorage', {
  value: mockStorage
})

// https://github.com/akiran/react-slick/issues/742
window.matchMedia =
  window.matchMedia ||
  function() {
    return {
      matches: false,
      addListener: function() {},
      removeListener: function() {}
    }
  }

const mockGeolocation = {
  getCurrentPosition: jest.fn(),
  watchPosition: jest.fn()
};

global.navigator.geolocation = mockGeolocation;

jest.mock('dayjs', () =>
  jest.fn((...args) => jest.requireActual('dayjs')(args.filter(arg => arg).length > 0 ? args : '2019-12-18T16:30:00'))
)

// browserMock.js
Object.defineProperty(document, 'currentScript', {
  value: document.createElement('div',).id='coordinate-0-0'
});
