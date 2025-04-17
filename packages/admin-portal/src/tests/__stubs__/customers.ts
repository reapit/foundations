import { Marketplace } from '@reapit/foundations-ts-definitions'

export const mockCustomerModelPagedResult: Marketplace.CustomerModelPagedResult = {
  data: [
    {
      id: '201a8d35-f682-41a8-95ed-079133e4b517',
      created: '2020-11-06T14:46:52',
      modified: '2022-03-10T12:46:58',
      agencyCloudId: 'RES',
      name: 'Reapit Sales',
      address: {
        buildingName: 'Radcliffe House',
        buildingNumber: '5',
        line1: 'Blenheim Court',
        line2: 'Solihull',
        line3: '',
        line4: 'solihull',
        postcode: 'B91 2AA',
        countryId: 'GB',
      },
      billingReference: 'HJP000',
      accountApprovedEmail: 'test@example.com',
      accountApproved: '2022-03-08T12:46:35',
    },
  ],
  pageNumber: 1,
  pageSize: 12,
  pageCount: 1,
  totalCount: 1,
}
