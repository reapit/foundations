import { CreateTenancyArgs, CreateTenancyCheckArgs, UpdateTenancyCheckArgs, DeleteTenancyCheckArgs } from '../tenancies'

export const mockCreateTenancyArgs: CreateTenancyArgs = {
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

export const mockCreateTenancyCheckArgs: CreateTenancyCheckArgs = {
  id: 'RPT200113',
  description: 'Tenant welcome pack',
  type: 'preTenancy',
  status: 'needed',
}

export const mockUpdateTenancyCheckArgs: UpdateTenancyCheckArgs = {
  id: 'RPT200113',
  _eTag: '"667E6E19203EB52228AEA503598DDD43"',
  checkId: 'RPT20000467',
  status: 'needed',
}

export const mockDeleteTenancyCheckArgs: DeleteTenancyCheckArgs = {
  id: 'RPT200113',
  checkId: 'RPT20000493',
}
