import { Marketplace } from '@reapit/foundations-ts-definitions'

export const mockInstallationModelPagedResult: Marketplace.InstallationModelPagedResult = {
  data: [
    {
      id: '343ab876-54fb-40d3-bc17-c5de1ca29a2b',
      appId: 'f83e679e-a7cd-4889-a7f9-f4a8a8ed5a09',
      created: '2022-03-23T16:37:22',
      client: 'SBOX',
      status: 'Active',
      authFlow: 'authorisationCode',
      terminatedReason: '',
      terminatesOn: '',
      customerId: 'SBOX',
      customerName: 'Sandbox Estates',
      officeGroupName: '',
      installedBy: 'test@example.com',
      uninstalledBy: '',
      appName: 'App Test Name',
      customerAddress: {
        buildingName: 'Third Floor',
        buildingNumber: '67-74',
        line1: 'Saffron Hill',
        line2: 'London',
        line3: '',
        line4: '',
        postcode: 'EC1N 8QX',
        countryId: 'GB',
      },
    },
  ],
  pageNumber: 1,
  pageSize: 999,
  pageCount: 1,
  totalCount: 1,
}
