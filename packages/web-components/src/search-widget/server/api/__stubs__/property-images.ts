import { PagedResultPropertyImageModel_ } from '@reapit/foundations-ts-definitions'

export const propertyImagesStub: PagedResultPropertyImageModel_ = {
  _embedded: [
    {
      id: 'OXF100008_01.jpg',
      created: '2018-12-12T12:30:23.0000000Z',
      modified: '2019-01-08T12:30:34.0000000Z',
      propertyId: 'OXF100008',
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
    },
  ],
  pageNumber: 1,
  pageSize: 1,
  pageCount: 1,
  totalCount: 25,
  _links: {
    self: {
      href: '/propertyImages/?PageNumber=1&PageSize=1',
    },
    first: {
      href: '/propertyImages/?PageNumber=1&PageSize=1',
    },
    next: {
      href: '/propertyImages/?PageNumber=2&PageSize=1',
    },
    last: {
      href: '/propertyImages/?PageNumber=25&PageSize=1',
    },
  },
}
