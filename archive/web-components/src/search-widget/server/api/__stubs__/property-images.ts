import { PagedResultPropertyImageModel_ } from '@reapit/foundations-ts-definitions'
import { PickedPagedResultPropertyImageModel_ } from '../../../types'

export const propertyImagesStub: PagedResultPropertyImageModel_ = {
  _embedded: [
    {
      id: 'RPT200079_02.png',
      created: '2020-03-03T12:18:36.0000000Z',
      modified: '2020-03-04T10:02:19.0000000Z',
      propertyId: 'RPT200079',
      url: 'https://reapit-dev.s3.eu-west-2.amazonaws.com/pictures/RPT/20/RPT200079_02.png',
      caption: 'Living room',
      type: 'photograph',
      order: 1,
      _eTag: '"81BA2F4F26E91F78B131A773A06BA7BD"',
      _links: { self: { href: '/propertyImages/RPT200079_02.png' }, property: { href: '/properties/RPT200079' } },
      _embedded: undefined,
    },
    {
      id: 'RPT200073_02.png',
      created: '2020-02-24T13:36:30.0000000Z',
      modified: '2020-02-24T13:36:30.0000000Z',
      propertyId: 'RPT200073',
      url: 'https://reapit-dev.s3.eu-west-2.amazonaws.com/pictures/RPT/20/RPT200073_02.png',
      caption: 'Living room',
      type: 'photograph',
      order: 2,
      _eTag: '"6A5698239EBD2E01C1EC03FF547F9D2A"',
      _links: { self: { href: '/propertyImages/RPT200073_02.png' }, property: { href: '/properties/RPT200073' } },
      _embedded: undefined,
    },
  ],
  pageNumber: 1,
  pageSize: 2,
  pageCount: 2,
  totalCount: 9244,
  _links: {
    self: { href: '/propertyImages/?PageNumber=1&PageSize=2' },
    first: { href: '/propertyImages/?PageNumber=1&PageSize=2' },
    next: { href: '/propertyImages/?PageNumber=2&PageSize=2' },
    last: { href: '/propertyImages/?PageNumber=4622&PageSize=2' },
  },
}

export const propertyImagesMinimalStub: PickedPagedResultPropertyImageModel_ = {
  pageNumber: 1,
  pageSize: 2,
  pageCount: 2,
  totalCount: 9244,
  _links: {
    self: { href: '/propertyImages/?PageNumber=1&PageSize=2' },
    first: { href: '/propertyImages/?PageNumber=1&PageSize=2' },
    next: { href: '/propertyImages/?PageNumber=2&PageSize=2' },
    last: { href: '/propertyImages/?PageNumber=4622&PageSize=2' },
  },
  _embedded: [
    {
      id: 'RPT200079_02.png',
      propertyId: 'RPT200079',
      url: 'https://reapit-dev.s3.eu-west-2.amazonaws.com/pictures/RPT/20/RPT200079_02.png',
    },
    {
      id: 'RPT200073_02.png',
      propertyId: 'RPT200073',
      url: 'https://reapit-dev.s3.eu-west-2.amazonaws.com/pictures/RPT/20/RPT200073_02.png',
    },
  ],
}
