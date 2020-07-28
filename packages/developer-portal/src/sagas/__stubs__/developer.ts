import { DeveloperState } from '@/reducers/developer'
import { developerIdentity } from './developer-identity'
import { billing } from './billing'

export const developerStub = {
  id: '7a96e6b2-3778-4118-9c9b-6450851e5608',
  externalId: '6447271a-0268-4546-b628-878308d091eb',
  name: 'Duong Pham',
  company: 'Dwarves Foundation',
  jobTitle: 'Software Engineer',
  email: 'tanphamhaiduong@gmail.com',
  telephone: '0978100461',
  created: '2019-11-21T08:46:41',
  isInactive: false,
}

export const developerState: DeveloperState = {
  loading: false,
  error: null,
  myIdentity: developerIdentity,
  formState: 'PENDING',
  isVisible: false,
  billing: billing,
  isServiceChartLoading: false,
  isMonthlyBillingLoading: false,
  monthlyBilling: null,
  webhookPingTestStatus: null,
}
