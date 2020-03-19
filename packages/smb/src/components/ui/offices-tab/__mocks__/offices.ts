import { OfficeModel } from '@reapit/foundations-ts-definitions'
import { OfficesQueryResponse, CreateOfficeParams, UpdateOfficeParams } from '../offices-tab'
import { ChangedCells } from '@reapit/elements/src/components/Spreadsheet/types'

export const offices: OfficesQueryResponse = {
  GetOffices: {
    _embedded: [
      {
        id: 'REA',
        created: '2020-02-28T10:34:06.0000000Z',
        modified: '2020-02-28T10:34:06.0000000Z',
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
        metadata: {},
        _eTag: '"104F6D31FAFEB3B1DE6BB9CF8E071094"',
        _links: { self: { href: '/offices/REA' }, negotiators: { href: '/negotiators/?officeId=REA' } },
      },
      {
        id: 'STL',
        created: '2016-12-01T15:32:45.0000000Z',
        modified: '2020-02-14T15:52:06.0000000Z',
        name: 'Stevenage Lettings',
        manager: '',
        address: {
          buildingName: '',
          buildingNumber: '',
          line1: "St George's Way",
          line2: 'Stevenage',
          line3: 'Hertfordshire',
          line4: '',
          postcode: 'SG1 1XB',
          countryId: 'GB',
        },
        workPhone: undefined,
        email: 'lettings@hughmason.co.uk',
        metadata: {},
        _eTag: '"17465C0780A21582FFE1B06E35DEE37D"',
        _links: { self: { href: '/offices/STL' }, negotiators: { href: '/negotiators/?officeId=STL' } },
      },
      {
        id: 'STV',
        created: '2016-12-01T15:05:16.0000000Z',
        modified: '2020-02-14T15:52:02.0000000Z',
        name: 'Stevenage',
        manager: 'Evan Hunter',
        address: {
          buildingName: '',
          buildingNumber: '',
          line1: "St George's Way",
          line2: 'Stevenage',
          line3: 'Hertfordshire',
          line4: '',
          postcode: 'SG1 1XB',
          countryId: 'GB',
        },
        workPhone: undefined,
        email: 'stevenage.sales@hughmason.co.uk',
        metadata: {},
        _eTag: '"7B2C4CFDFFA0EE83468BABC0F4A8D63C"',
        _links: { self: { href: '/offices/STV' }, negotiators: { href: '/negotiators/?officeId=STV' } },
      },
    ],
    pageNumber: 1,
    pageSize: 3,
    pageCount: 3,
    totalCount: 25,
    _links: {
      self: { href: '/offices/?PageNumber=1&PageSize=3' },
      first: { href: '/offices/?PageNumber=1&PageSize=3' },
      next: { href: '/offices/?PageNumber=2&PageSize=3' },
      last: { href: '/offices/?PageNumber=9&PageSize=3' },
    },
  },
}

export const office: OfficeModel = {
  id: 'REA',
  created: '2020-02-28T10:34:06.0000000Z',
  modified: '2020-02-28T10:34:06.0000000Z',
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
  metadata: {},
  _eTag: '"104F6D31FAFEB3B1DE6BB9CF8E071094"',
  _links: { self: { href: '/offices/REA' }, negotiators: { href: '/negotiators/?officeId=REA' } },
}

export const mockCreateOfficeParams: CreateOfficeParams = {
  name: 'Reapit',
  address: {
    line1: 'London road',
    postcode: 'HP19 9QL',
  },
  workPhone: '0987654321',
  email: 'tester@reapit.com',
}

export const mockUpdateOfficeParams: UpdateOfficeParams = {
  id: 'REA',
  _eTag: '"104F6D31FAFEB3B1DE6BB9CF8E071094"',
  name: 'New Reapit',
}

export const mockChangeCellsForUpdateCase: ChangedCells = [
  {
    oldCell: {
      key: 'name',
      value: 'Reapit',
      isValidated: true,
    },
    newCell: {
      key: 'name',
      value: 'Reapit new name',
      isValidated: true,
    },
    row: 1,
    col: 0,
  },
]

export const mockChangeCellsForCreateCase: ChangedCells = [
  {
    oldCell: {
      key: 'name',
      value: '',
      isValidated: true,
    },
    newCell: {
      key: 'name',
      value: 'Reapit',
      isValidated: true,
    },
    row: 1,
    col: 0,
  },
]
