import { SandboxModelPagedResult } from '@reapit/foundations-ts-definitions'

export const mockSandboxModelPagedResult: SandboxModelPagedResult = {
  data: [
    {
      id: 'AUS',
      name: 'Australia Sandbox',
      customerId: 'SBXA',
    },
    {
      id: 'GBR',
      name: 'UK Sandbox',
      customerId: 'SBOX',
    },
  ],
  pageNumber: 1,
  pageSize: 2,
  pageCount: 2,
  totalCount: 2,
}
