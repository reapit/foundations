import {
  WorksOrderModelPagedResult,
  WorksOrderModel,
  WorksOrderItemModelPagedResult,
  WorksOrderItemModel,
} from '@reapit/foundations-ts-definitions'
import { GetWorksOrdersByIdArgs, GetWorksOrderItemsArgs, GetWorksOrderItembyIdArgs } from '../works-orders'

export const getWorksOrderItemsArgsStub: GetWorksOrderItemsArgs = {
  id: '1',
}

export const getWorksOrderItemByIdArgsStub: GetWorksOrderItembyIdArgs = {
  id: '1',
  itemId: '1',
}

export const worksOrderItemStub: WorksOrderItemModel = {
  id: 'RPT20000038',
  worksOrderId: 'RPT20000022',
  created: '2020-08-18T03:44:38Z',
  modified: '2020-08-18T03:44:38Z',
  notes: 'Please book the electrical certificate for either Thursday or Friday.',
  chargeTo: 'landlord',
  estimate: 120.0,
  estimateType: 'written',
  netAmount: 100.0,
  vatAmount: 20.0,
  grossAmount: 120.0,
  _eTag: '"B5EF59E141ED088D090B6C61495C4741"',
  _links: {
    self: {
      href: '/worksOrders/RPT20000022/items/RPT20000038',
    },
    worksOrder: {
      href: '/worksOrders/RPT20000022',
    },
  },
  _embedded: null,
}

export const worksOrderItemListStub: WorksOrderItemModelPagedResult = {
  _embedded: [
    {
      id: 'RPT20000038',
      worksOrderId: 'RPT20000022',
      created: '2020-08-18T03:44:38Z',
      modified: '2020-08-18T03:44:38Z',
      notes: 'Please book the electrical certificate for either Thursday or Friday.',
      chargeTo: 'landlord',
      estimate: 120.0,
      estimateType: 'written',
      netAmount: 100.0,
      vatAmount: 20.0,
      grossAmount: 120.0,
      _eTag: '"B5EF59E141ED088D090B6C61495C4741"',
      _links: {
        self: {
          href: '/worksOrders/RPT20000022/items/RPT20000038',
        },
        worksOrder: {
          href: '/worksOrders/RPT20000022',
        },
      },
      _embedded: null,
    },
  ],
  pageNumber: 1,
  pageSize: 50,
  pageCount: 1,
  totalPageCount: 1,
  totalCount: 1,
  _links: {
    self: {
      href: '/worksOrders/?PageNumber=1&PageSize=50',
    },
    first: {
      href: '/worksOrders/?PageNumber=1&PageSize=50',
    },
  },
}

export const getWorksOrderByIdArgsStub: GetWorksOrdersByIdArgs = {
  id: 'RPT20000017',
  embed: 'company',
}

export const worksOrderStub: WorksOrderModel = {
  id: 'RPT20000017',
  created: '2020-08-07T13:37:10Z',
  modified: '2020-08-07T13:37:10Z',
  companyId: 'OXF18000001',
  propertyId: 'OXF190001',
  tenancyId: 'OXF190022',
  negotiatorId: 'JAS',
  typeId: 'ES',
  status: 'complete',
  description: 'Light fitting in living room not working.',
  reporter: 'landlord',
  booked: '2019-05-10',
  required: '2019-08-12',
  completed: '2019-10-01',
  totalNetAmount: 100.0,
  totalVatAmount: 20.0,
  totalGrossAmount: 120.0,
  items: [
    {
      id: 'RPT20000033',
      worksOrderId: 'RPT20000017',
      created: '2020-08-07T13:37:10Z',
      modified: '2020-08-07T13:37:10Z',
      notes: 'Please book the electrical certificate for either Thursday or Friday.',
      chargeTo: 'landlord',
      estimate: 120.0,
      estimateType: 'written',
      netAmount: 100.0,
      vatAmount: 20.0,
      grossAmount: 120.0,
      _eTag: null,
      _links: {
        self: {
          href: '/worksOrders/RPT20000017/items/RPT20000033',
        },
        worksOrder: {
          href: '/worksOrders/RPT20000017',
        },
      },
      _embedded: null,
    },
  ],
  _eTag: '"F1575398A580F5552224472D606EE144"',
  _links: {
    self: {
      href: '/worksOrders/RPT20000017',
    },
    documents: {
      href: '/documents/?associatedType=worksOrder&associatedId=RPT20000017',
    },
    items: {
      href: '/worksOrders/RPT20000017/items',
    },
    company: {
      href: '/companies/OXF18000001',
    },
    negotiator: {
      href: '/negotiators/JAS',
    },
    property: {
      href: '/properties/OXF190001',
    },
    tenancy: {
      href: '/tenancies/OXF190022',
    },
    type: {
      href: '/configurations/worksOrderTypes/ES',
    },
  },
  metadata: {
    CustomField1: 'CustomValue1',
    CustomField2: true,
  },
  _embedded: {
    documents: null,
  },
}

export const worksOrderListStub: WorksOrderModelPagedResult = {
  _embedded: [
    {
      id: 'RPT20000017',
      created: '2020-08-07T13:37:10Z',
      modified: '2020-08-07T13:37:10Z',
      companyId: 'OXF18000001',
      propertyId: 'OXF190001',
      tenancyId: 'OXF190022',
      negotiatorId: 'JAS',
      typeId: 'ES',
      status: 'complete',
      description: 'Light fitting in living room not working.',
      reporter: 'landlord',
      booked: '2019-05-10',
      required: '2019-08-12',
      completed: '2019-10-01',
      totalNetAmount: 100.0,
      totalVatAmount: 20.0,
      totalGrossAmount: 120.0,
      items: [
        {
          id: 'RPT20000033',
          worksOrderId: 'RPT20000017',
          created: '2020-08-07T13:37:10Z',
          modified: '2020-08-07T13:37:10Z',
          notes: 'Please book the electrical certificate for either Thursday or Friday.',
          chargeTo: 'landlord',
          estimate: 120.0,
          estimateType: 'written',
          netAmount: 100.0,
          vatAmount: 20.0,
          grossAmount: 120.0,
          _eTag: null,
          _links: {
            self: {
              href: '/worksOrders/RPT20000017/items/RPT20000033',
            },
            worksOrder: {
              href: '/worksOrders/RPT20000017',
            },
          },
          _embedded: null,
        },
      ],
      _eTag: '"F1575398A580F5552224472D606EE144"',
      _links: {
        self: {
          href: '/worksOrders/RPT20000017',
        },
        documents: {
          href: '/documents/?associatedType=worksOrder&associatedId=RPT20000017',
        },
        items: {
          href: '/worksOrders/RPT20000017/items',
        },
        company: {
          href: '/companies/OXF18000001',
        },
        negotiator: {
          href: '/negotiators/JAS',
        },
        property: {
          href: '/properties/OXF190001',
        },
        tenancy: {
          href: '/tenancies/OXF190022',
        },
        type: {
          href: '/configurations/worksOrderTypes/ES',
        },
      },
      _embedded: null,
      metadata: {
        CustomField1: 'CustomValue1',
        CustomField2: true,
      },
    },
    {
      id: 'RPT20000016',
      created: '2020-05-18T13:43:08Z',
      modified: '2020-05-18T13:46:35Z',
      companyId: '',
      propertyId: 'MLK150257',
      tenancyId: '',
      negotiatorId: 'RPT',
      typeId: '',
      status: 'pendingApproval',
      description: 'Wallpaper the bathroom',
      reporter: 'tenant',
      booked: '2020-05-18',
      required: null,
      completed: null,
      totalNetAmount: 0.0,
      totalVatAmount: 0.0,
      totalGrossAmount: 0.0,
      items: [
        {
          id: 'RPT20000032',
          worksOrderId: 'RPT20000016',
          created: '2020-05-18T13:44:08Z',
          modified: '2020-05-18T13:45:58Z',
          notes: 'Try harder please.',
          chargeTo: '',
          estimate: 25.0,
          estimateType: 'agent',
          netAmount: 0.0,
          vatAmount: 0.0,
          grossAmount: 0.0,
          _eTag: null,
          _links: {
            self: {
              href: '/worksOrders/RPT20000016/items/RPT20000032',
            },
            worksOrder: {
              href: '/worksOrders/RPT20000016',
            },
          },
          _embedded: null,
        },
      ],
      _eTag: '"CF115265BA9EAD7ED00A1B9442689193"',
      _links: {
        self: {
          href: '/worksOrders/RPT20000016',
        },
        documents: {
          href: '/documents/?associatedType=worksOrder&associatedId=RPT20000016',
        },
        items: {
          href: '/worksOrders/RPT20000016/items',
        },
        negotiator: {
          href: '/negotiators/RPT',
        },
        property: {
          href: '/properties/MLK150257',
        },
      },
      _embedded: null,
      metadata: {
        CustomWorksOrderField1: 101.5,
        CustomWorksOrderField2: true,
      },
    },
  ],
  pageNumber: 1,
  pageSize: 2,
  pageCount: 2,
  totalPageCount: 11,
  totalCount: 22,
  _links: {
    self: {
      href: '/worksOrders/?PageNumber=1&PageSize=2',
    },
    first: {
      href: '/worksOrders/?PageNumber=1&PageSize=2',
    },
    next: {
      href: '/worksOrders/?PageNumber=2&PageSize=2',
    },
    last: {
      href: '/worksOrders/?PageNumber=11&PageSize=2',
    },
  },
}
