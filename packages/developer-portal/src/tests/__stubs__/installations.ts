import { Marketplace } from '@reapit/foundations-ts-definitions'

export const mockInstallationModelPagedResult: Marketplace.InstallationModelPagedResult = {
  data: [
    {
      id: 'MOCK_ID_ONE',
      appId: 'MOCK_APP_ID',
      created: '2022-03-23T16:38:50',
      client: 'RES',
      status: 'Active',
      authFlow: 'authorisationCode',
      customerId: 'RES',
      customerName: 'Reapit Sales',
      installedBy: 'example@mail.com',
      appName: 'MOCK_APP_NAME',
      customerAddress: {
        buildingName: 'Big House',
        buildingNumber: '1',
        line1: 'Something',
        line2: 'Something',
        line3: '',
        line4: 'UK',
        postcode: 'BB1 1BB',
        countryId: 'GB',
      },
      officeGroup: {
        offices: [
          {
            name: 'Office One',
            id: 'MOCK_OFFICE_ID_ONE',
          },
        ],
      },
    },
    {
      id: 'MOCK_ID_TWO',
      appId: 'MOCK_APP_ID',
      created: '2022-01-11T16:47:09',
      client: 'MXX',
      status: 'Active',
      authFlow: 'authorisationCode',
      customerId: 'MXX',
      customerName: 'Foo Bar',
      appName: 'MOCK_APP_NAME_TWO',
      installedBy: 'example@mail.com',
      customerAddress: {
        buildingName: 'Big House',
        buildingNumber: '1',
        line1: 'Something',
        line2: 'Something',
        line3: '',
        line4: 'UK',
        postcode: 'BB1 1BB',
        countryId: 'GB',
      },
    },
  ],
  pageNumber: 1,
  pageSize: 12,
  pageCount: 2,
  totalCount: 2,
}
