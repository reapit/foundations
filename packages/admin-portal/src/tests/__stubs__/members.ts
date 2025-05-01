import { Marketplace } from '@reapit/foundations-ts-definitions'

export const mockMemberModelPagedResult: Marketplace.MemberModelPagedResult = {
  data: [
    {
      id: '21cddc7c-956b-4410-a3f5-dc793bc5f71d',
      created: '2022-04-29T10:48:05',
      modified: '2022-04-29T10:48:36',
      email: 'test@example.com',
      name: 'Olly Test',
      jobTitle: 'test',
      status: 'inactive',
      role: 'user',
      gitHubUsername: '',
      agreedTerms: '',
      developerId: '8240d435-9e6f-4271-a863-7774d199461a',
      sandboxId: '',
      agencyCloudAccess: false,
      useCustomerData: false,
    },
  ],
  pageNumber: 1,
  pageSize: 12,
  pageCount: 12,
  totalCount: 15,
}
