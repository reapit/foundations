import getProjectorProperties from '../projector-properties'
import { mockBrowserSession } from '@/platform-api/__mocks__/session'
import mockPropertyProjectorConfig from '../__mocks__/config'
import mockProperty from '../__mocks__/property'
import mockPropertyImage from '../__mocks__/property-image'

jest.mock('@reapit/elements')

const mockedProperties = {
  _embedded: [mockProperty],
}

const mockedPropertyImages = [mockPropertyImage]

jest.mock('@/platform-api/properties-api', () => {
  return {
    getProperties: jest.fn(() => Promise.resolve(mockedProperties)),
  }
})

jest.mock('@/platform-api/property-images-api', () => {
  return {
    getAllPropertyImages: jest.fn(() => Promise.resolve(mockedPropertyImages)),
  }
})

describe('getProjectorProperties', () => {
  it('should return an array of properties with images', async () => {
    expect(await getProjectorProperties(mockBrowserSession, mockPropertyProjectorConfig)).toEqual([
      {
        ...mockProperty,
        images: ['https://www.exampleurl.com/images/OXF100008_01.jpg'],
      },
    ])
  })
})
