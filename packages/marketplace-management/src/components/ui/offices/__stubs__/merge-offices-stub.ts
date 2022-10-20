import { OfficeGroupModel } from '@reapit/foundations-ts-definitions'

export const mockOfficeGroupModels: OfficeGroupModel[] = [
  {
    id: 'SOME_ID',
    created: '2019-08-14T12:30:02.0000000Z',
    modified: '2019-08-14T12:30:02.0000000Z',
    organisationId: 'string',
    name: 'string',
    tag: 'string',
    officeIds: 'SOME_ID,ANOTHER_ID',
    status: 'string',
  },
]

import { OfficeModel } from '@reapit/foundations-ts-definitions'

export const mockOfficeModels: OfficeModel[] = [
  {
    id: 'SOME_ID',
    created: '2018-12-12T12:30:23.0000000Z',
    modified: '2019-01-08T12:30:34.0000000Z',
    name: 'Reapit',
    manager: 'Mr John Smith',
    address: {
      buildingName: '',
      buildingNumber: '15',
      line1: 'Example street',
      line2: 'Solihull',
      line3: 'West Midlands',
      line4: '',
      postcode: 'B91 2XX',
      countryId: 'GB',
    },
    workPhone: '01234 567890',
    email: 'example@email.com',
    metadata: {
      CustomField1: 'CustomValue1',
      CustomField2: true,
    },
  },
  {
    id: 'ANOTHER_ID',
    created: '2018-12-12T12:30:23.0000000Z',
    modified: '2019-01-08T12:30:34.0000000Z',
    name: 'Reapit',
    manager: 'Mr John Smith',
    address: {
      buildingName: '',
      buildingNumber: '15',
      line1: 'Example street',
      line2: 'Solihull',
      line3: 'West Midlands',
      line4: '',
      postcode: 'B91 2XX',
      countryId: 'GB',
    },
    workPhone: '01234 567890',
    email: 'example@email.com',
    metadata: {
      CustomField1: 'CustomValue1',
      CustomField2: true,
    },
  },
]
