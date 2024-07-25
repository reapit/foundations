import { mockPagedCustomersModel, mockPagedIpsModel, mockPagedRulesModel } from '../../../tests/__stubs__/network'

export const mockNetworkState = {
  customers: mockPagedCustomersModel,
  rules: mockPagedRulesModel,
  ips: mockPagedIpsModel,
  refreshRules: jest.fn(),
  refreshIps: jest.fn(),
  customersLoading: false,
  rulesLoading: false,
  ipsLoading: false,
  customerId: 'MOCK_CUSTOMER_ID',
  networkSelected: {
    ruleId: 'MOCK_RULE_ID',
    ipRuleId: 'MOCK_IP_RULE_ID',
    ipId: 'MOCK_IP_ID',
  },
  setNetworkSelected: jest.fn(),
  setIpsPageNumber: jest.fn(),
  ipsPageNumber: 1,
}

export const useNetworkState = jest.fn(() => mockNetworkState)

export const handleModalAction = jest.fn()
