import { PagedResultCustomerModel } from '@/services/customers'

export const customersList: PagedResultCustomerModel = {
  data: [
    {
      id: 'ee25966c-294a-4ffc-b640-bccd7eae889c',
      created: '2020-08-04T14:49:06',
      modified: '2020-08-04T14:59:22',
      agencyCloudId: 'SBOS',
      name: 'RyanWilcoxNew',
      address: {
        buildingName: '',
        buildingNumber: '11',
        line1: 'Birmingham Road',
        line2: 'string',
        line3: 'string',
        line4: 'string',
        postcode: 'string',
        countryId: 'GB',
      },
    },
  ],
  pageSize: 12,
  pageNumber: 1,
  pageCount: 1,
  totalCount: 1,
}
