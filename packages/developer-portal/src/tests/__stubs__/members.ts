import { Marketplace } from '@reapit/foundations-ts-definitions'

export const mockMembersPagedResult: Marketplace.MemberModelPagedResult = {
  data: [
    {
      id: 'MOCK_ID',
      created: '2020-11-03T12:18:38',
      modified: '2022-04-01T10:38:06',
      email: 'example@email.com',
      name: 'Joe Dev',
      jobTitle: '',
      status: 'active',
      role: 'admin',
      agreedTerms: '2021-06-18T09:13:21',
      developerId: 'MOCK_DEVELOPER_ID',
      sandboxId: 'GBR',
      agencyCloudAccess: true,
      useCustomerData: false,
    },
  ],
  pageNumber: 1,
  pageSize: 1,
  pageCount: 1,
  totalCount: 1,
}

export const mockMemberModel: Marketplace.MemberModel = {
  id: 'MOCK_ID',
  created: '2020-11-03T12:18:38',
  modified: '2022-04-01T10:38:06',
  email: 'example@email.com',
  name: 'Joe Dev',
  jobTitle: '',
  status: 'active',
  role: 'admin',
  gitHubUsername: '',
  agreedTerms: '2021-06-18T09:13:21',
  developerId: 'MOCK_DEVELOPER_ID',
  sandboxId: 'GBR',
  agencyCloudAccess: true,
  useCustomerData: false,
}
