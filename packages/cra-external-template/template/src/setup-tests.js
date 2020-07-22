const Adapter = require('enzyme-adapter-react-16')
const Enzyme = require('enzyme')

Enzyme.configure({ adapter: new Adapter() })

jest.mock('linaria', () => {
  return {
    css: jest.fn(() => ''),
    cx: jest.fn(() => ''),
  }
})
