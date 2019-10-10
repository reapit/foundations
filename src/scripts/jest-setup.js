const Adapter = require('enzyme-adapter-react-16')
const Enzyme = require('enzyme')
const fetchMock = require('jest-fetch-mock')
const MockDate = require('mockdate');

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

// Had to remove this mock because dayjs.extend throws an error as not being mocked - see this PR: https://github.com/reapit/elements/pull/82
// jest.mock('dayjs', () =>
//   jest.fn((...args) => jest.requireActual('dayjs')(args.filter(arg => arg).length > 0 ? args : '2019-12-18T16:30:00'))
// )
// Replaced with this for now:
MockDate.set(1570747191389);