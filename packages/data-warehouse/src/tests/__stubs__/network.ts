import {
  IpsModel,
  PagedIpsModel,
  RulesModel,
  PagedRulesModel,
  CustomersModel,
  PagedCustomersModel,
} from '../../types/network'

export const mockIpsModel: IpsModel = {
  id: 'MOCK_ID',
  ipAddress: 'MOCK_ADDRESS',
  cidr: 32,
  created: 'MOCK_CREATED',
}

export const mockPagedIpsModel: PagedIpsModel = {
  _embedded: [mockIpsModel],
  pageNumber: 1,
  pageSize: 1,
  pageCount: 1,
  totalPageCount: 1,
  totalCount: 1,
}

export const mockRulesModel: RulesModel = {
  id: 'MOCK_ID',
  name: 'MOCK_NAME',
  enabled: true,
  created: 'MOCK_CREATED',
  modified: 'MOCK_MODIFIED',
}

export const mockPagedRulesModel: PagedRulesModel = {
  _embedded: [mockRulesModel],
  pageNumber: 1,
  pageSize: 1,
  pageCount: 1,
  totalPageCount: 1,
  totalCount: 1,
}

export const mockCustomersModel: CustomersModel = {
  id: 'MOCK_ID',
}

export const mockPagedCustomersModel: PagedCustomersModel = {
  _embedded: [mockCustomersModel],
  pageNumber: 1,
  pageSize: 1,
  pageCount: 1,
  totalPageCount: 1,
  totalCount: 1,
}
