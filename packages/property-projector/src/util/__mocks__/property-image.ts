import { PropertyImageModel } from '@reapit/foundations-ts-definitions'

const mockPropertyImage: PropertyImageModel = {
  id: 'OXF100008_01.jpg',
  created: '2018-12-12T12:30:23.0000000Z',
  modified: '2019-01-08T12:30:34.0000000Z',
  propertyId: 'SOME_ID',
  url: 'https://www.exampleurl.com/images/OXF100008_01.jpg',
  caption: 'Living room',
  type: 'photograph',
  order: 1,
  _links: {
    self: {
      href: '/propertyImages/OXF100008_01.jpg',
    },
    property: {
      href: '/properties/OXF100008',
    },
  },
}

export default mockPropertyImage
