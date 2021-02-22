import { VendorContactRelationshipModel } from '@reapit/foundations-ts-definitions'

export const vendorRelationshipStub: VendorContactRelationshipModel = {
  id: 'OXF20002002',
  vendorId: 'OXF190001',
  created: '2020-01-25T15:44:28.0000000Z',
  modified: '2020-01-26T09:24:02.0000000Z',
  associatedType: 'contact',
  associatedId: 'OXF2000002',
  isMain: true,
  _links: {
    self: {
      href: '/vendors/OXF190001/relationships/OXF20002002',
    },
    contact: {
      href: '/contacts/OXF2000002',
    },
  },
  _embedded: null,
}
