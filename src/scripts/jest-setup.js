const Adapter = require('enzyme-adapter-react-16')
const Enzyme = require('enzyme')
const fetchMock = require('jest-fetch-mock')

Enzyme.configure({ adapter: new Adapter() })
global.fetch = fetchMock
