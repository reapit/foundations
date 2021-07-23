const Adapter = require('@wojtekmaj/enzyme-adapter-react-17')
const Enzyme = require('enzyme')

Enzyme.configure({ adapter: new Adapter() })

jest.mock('@linaria/core', () => {
  return {
    css: jest.fn(() => ''),
    cx: jest.fn(() => ''),
  }
})

Object.defineProperty(window, 'reapit', {
  value: {
    config: {
      connectClientId: 'SOME_CLIENT_ID',
      connectOAuthUrl: 'SOME_OAUTH_URL',
    },
  },
})
