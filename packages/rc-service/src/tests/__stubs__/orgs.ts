import { OrganisationModelPagedResult } from '@reapit/foundations-ts-definitions'

export const mockOrganisationModelPagedResult: OrganisationModelPagedResult = {
  _embedded: [
    {
      id: '0d109d75-e131-47c1-a92d-0a74bfc504c5',
      created: '2023-02-23T11:14:05.0000000Z',
      name: 'test again 2',
      agencyCloudId: '',
      marketplaceId: '96140b16-d489-4b71-ac03-674e4e5175b7',
      inactive: false,
      website: '',
      taxNumber: '',
      registrationNumber: '',
      billingEmail: 'foo@bar.com',
      billingTelephone: '07498294982',
      billingName: 'test',
      mfaStatus: 'inactive',
      product: 'agencyCloud',
      products: [],
      //@ts-ignore
      types: ['developer', 'customer', 'organisation'],
      address: {
        buildingName: '',
        buildingNumber: '',
        line1: '',
        line2: '',
        line3: '',
        line4: '',
        postcode: '',
        countryId: '',
      },
      claims: [],
    },
  ],
  pageNumber: 1,
  pageSize: 12,
  pageCount: 12,
  totalPageCount: 24,
  totalCount: 284,
}
