import { CreateTenancyArgs, CreateTenancyCheckArgs } from '../tenancies'

export const createTenancyArgsMock: CreateTenancyArgs = {
  startDate: '2020-01-01',
  endDate: '2021-01-01',
  agentRole: 'managed',
  rent: 600,
  rentFrequency: 'monthly',
  isPeriodic: true,
  typeId: 'SL',
  negotiatorId: 'JAS',
  propertyId: 'OXF200497',
  applicantId: 'OXF200012',
  source: {
    id: 'OXF',
    type: 'office',
  },
}

export const createTenancyCheckArgsMock: CreateTenancyCheckArgs = {
  id: 'RPT200113',
  model: {
    description: 'Tenant welcome pack',
    type: 'preTenancy',
    status: 'needed',
  },
}
