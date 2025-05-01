import { Marketplace } from '@reapit/foundations-ts-definitions'

export const mockApprovalModelPagedResult: Marketplace.ApprovalModelPagedResult = {
  data: [
    {
      appId: 'f83e679e-a7cd-4889-a7f9-f4a8a8ed5a09',
      type: 'App Revision',
      description: "App 'Reapit Insights' has been modified",
      appRevisionId: '285304f2-f1ce-45cc-9d68-02c0b111cf99',
      created: '2022-03-25T08:32:43',
    },
  ],
  pageNumber: 1,
  pageSize: 12,
  pageCount: 1,
  totalCount: 1,
}
