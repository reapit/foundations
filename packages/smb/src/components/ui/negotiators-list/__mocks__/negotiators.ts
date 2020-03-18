import { NegotiatorsQueryResponse, NegotiatorUpdateParams, NegotiatorCreateParams } from '../negotiators-list'
import { NegotiatorModel } from '@reapit/elements/node_modules/@reapit/foundations-ts-definitions/types'
import { ChangedCells, Cell } from '@reapit/elements/src/components/Spreadsheet/types'

export const updateNegotiatorParams: NegotiatorUpdateParams = {
  id: 'MGL',
  name: 'Abel Robertson',
  active: true,
  email: 'abel.robertson@reapitestates.net',
  mobilePhone: '1002291122',
  _eTag: '"10109C0209C684789B72FFC53730E31C"',
}

export const createNegotiatorParams: NegotiatorCreateParams = {
  name: 'Abel Robertson',
  active: true,
  email: 'abel.robertson@reapitestates.net',
  mobilePhone: '1002291122',
  officeId: 'OFF',
  jobTitle: 'Senior Manager',
}

export const negotiatorDetail: NegotiatorModel = {
  id: 'MGL',
  created: '2014-12-26T12:22:01.0000000Z',
  modified: '2016-11-29T09:57:32.0000000Z',
  name: 'Abel Robertson',
  active: true,
  officeId: 'NPG',
  email: 'abel.robertson@reapitestates.net',
  metadata: {},
  _eTag: '"10109C0209C684789B72FFC53730E31C"',
  _links: {
    self: {
      href: '/negotiators/MGL',
    },
    office: {
      href: '/offices/NPG',
    },
  },
}

export const mockChangeCellsForUpdateCase: ChangedCells = [
  {
    oldCell: {
      value: 'Abel Robertson',
      isValidated: true,
    },
    newCell: {
      value: 'Robertson',
      isValidated: true,
    },
    row: 1,
    col: 0,
  },
]

export const mockChangeCellsForCreateCase: ChangedCells = [
  {
    oldCell: {
      value: 'Abel Robertson',
      isValidated: true,
    },
    newCell: {
      value: 'Robertson',
      isValidated: true,
    },
    row: 1,
    col: 0,
  },
]

export const mockOfficeCellRenderProps = {
  row: 1,
  col: 5,
  cell: { value: 'REA|Reapit' },
  selected: false,
  editing: false,
  updated: false,
  attributesRenderer: jest.fn() as any,
  className: 'cell',
  style: { background: 'red' },
  onMouseDown: jest.fn(),
  onMouseOver: jest.fn(),
  onDoubleClick: jest.fn(),
  onContextMenu: jest.fn(),
  children: null,
}

export const mockSpreadSheetDataForUpdateCase: Cell[][] = [
  [
    {
      readOnly: true,
      value: 'Username',
    },
    {
      readOnly: true,
      value: 'Job Title',
    },
    {
      readOnly: true,
      value: 'Email Address',
    },
    {
      readOnly: true,
      value: 'Telephone',
    },
    {
      readOnly: true,
      value: 'Office',
    },
    {
      readOnly: true,
      value: 'Status',
    },
  ],
  [
    {
      value: 'Abel Robertson',
      isValidated: true,
    },
    {
      value: 'undefined',
    },
    {
      value: 'abel.robertson@reapitestates.net',
    },
    {
      value: '9481221233',
    },
    {
      readOnly: true,
      value: 'BDF|River Town',
    },
    {
      readOnly: true,
      value: 'true',
    },
    {
      className: 'hidden',
      value: 'MGL',
    },
    {
      className: 'hidden',
      value: '"10109C0209C684789B72FFC53730E31C"',
    },
  ],
]

export const mockSpreadSheetDataForCreateCase: Cell[][] = [
  [
    {
      readOnly: true,
      value: 'Username',
    },
    {
      readOnly: true,
      value: 'Job Title',
    },
    {
      readOnly: true,
      value: 'Email Address',
    },
    {
      readOnly: true,
      value: 'Telephone',
    },
    {
      readOnly: true,
      value: 'Office',
    },
    {
      readOnly: true,
      value: 'Status',
    },
  ],
  [
    {
      value: 'Abel Robertson',
      isValidated: true,
    },
    {
      value: 'undefined',
      isValidated: true,
    },
    {
      value: 'abel.robertson@reapitestates.net',
      isValidated: true,
    },
    {
      value: '9481221233',
      isValidated: true,
    },
    {
      readOnly: true,
      value: 'BDF|River Town',
      isValidated: true,
    },
    {
      readOnly: true,
      value: 'true',
      isValidated: true,
    },
    {
      className: 'hidden',
      value: null,
      isValidated: true,
    },
    {
      className: 'hidden',
      value: null,
      isValidated: true,
    },
  ],
]

export const negotiators: NegotiatorsQueryResponse = {
  GetNegotiators: {
    _embedded: [
      {
        id: 'MGL',
        created: '2014-12-26T12:22:01.0000000Z',
        modified: '2016-11-29T09:57:32.0000000Z',
        name: 'Abel Robertson',
        active: true,
        officeId: 'NPG',
        email: 'abel.robertson@reapitestates.net',
        mobilePhone: '9481221233',
        metadata: {},
        _embedded: {
          office: {
            id: 'BDF',
            created: '2010-11-16T15:42:00Z',
            modified: '2020-02-14T15:56:48Z',
            name: 'River Town',
            manager: 'Scott Bolton',
            address: {
              buildingName: '',
              buildingNumber: '',
              line1: 'Bedford Heights',
              line2: 'Brickhill Drive',
              line3: 'Bedfordshire',
              line4: '',
              postcode: 'MK41 7PH',
              countryId: '',
            },
            email: 'salesbe@hughmason.co.uk',
          },
        },
        _eTag: '"10109C0209C684789B72FFC53730E31C"',
        _links: {
          self: {
            href: '/negotiators/MGL',
          },
          office: {
            href: '/offices/NPG',
          },
        },
      },
      {
        id: 'RPA',
        created: '2017-02-07T12:08:53.0000000Z',
        modified: '2017-02-07T12:09:41.0000000Z',
        name: 'Accounts User',
        active: true,
        officeId: 'MCL',
        email: 'abel.21f@reapitestates.net',
        mobilePhone: '9481221233',
        _embedded: {
          office: {
            id: 'BDF',
            created: '2010-11-16T15:42:00Z',
            modified: '2020-02-14T15:56:48Z',
            name: 'River Town',
            manager: 'Scott Bolton',
            address: {
              buildingName: '',
              buildingNumber: '',
              line1: 'Bedford Heights',
              line2: 'Brickhill Drive',
              line3: 'Bedfordshire',
              line4: '',
              postcode: 'MK41 7PH',
              countryId: '',
            },
            email: 'salesbe@hughmason.co.uk',
          },
        },
        _eTag: '"85A9DB571DB893A5FB734105AFF6B464"',
        _links: {
          self: {
            href: '/negotiators/RPA',
          },
          office: {
            href: '/offices/MCL',
          },
        },
      },
      {
        id: 'KLB',
        created: '2010-11-15T14:53:08.0000000Z',
        modified: '2017-03-10T00:02:08.0000000Z',
        name: 'Adele Small',
        active: true,
        officeId: 'NGL',
        email: 'adele.small@reapitestates.net',
        mobilePhone: '9481221233',
        metadata: {},
        _embedded: {
          office: {
            id: 'BDF',
            created: '2010-11-16T15:42:00Z',
            modified: '2020-02-14T15:56:48Z',
            name: 'River Town',
            manager: 'Scott Bolton',
            address: {
              buildingName: '',
              buildingNumber: '',
              line1: 'Bedford Heights',
              line2: 'Brickhill Drive',
              line3: 'Bedfordshire',
              line4: '',
              postcode: 'MK41 7PH',
              countryId: '',
            },
            email: 'salesbe@hughmason.co.uk',
          },
        },
        _eTag: '"B28EE5CFF654DB22BF3247CA028C10C3"',
        _links: {
          self: {
            href: '/negotiators/KLB',
          },
          office: {
            href: '/offices/NGL',
          },
        },
      },
    ],
    pageNumber: 1,
    pageSize: 3,
    pageCount: 3,
    totalCount: 3,
    _links: {
      self: {
        href: '/negotiators/?PageNumber=1&PageSize=3',
      },
      first: {
        href: '/negotiators/?PageNumber=1&PageSize=3',
      },
      next: {
        href: '/negotiators/?PageNumber=2&PageSize=3',
      },
      last: {
        href: '/negotiators/?PageNumber=3&PageSize=3',
      },
    },
  },
}
