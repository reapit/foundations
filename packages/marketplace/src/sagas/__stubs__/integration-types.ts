import { PagedResultDesktopIntegrationTypeModel_ } from '@/actions/app-integration-types'

export const integrationTypesStub: PagedResultDesktopIntegrationTypeModel_ = {
  data: [
    {
      id: 'IdCheck',
      name: 'Identity Check',
      description: 'Replaces the standard ID check screen',
      url: 'https://foundations-documentation.reapit.cloud/api/desktop-api#id-check',
    },
    {
      id: 'PrpMarketing',
      name: 'Property Marketing Information',
      description: 'Replaces the standard property marketing screen',
      url: 'https://foundations-documentation.reapit.cloud/api/desktop-api#property-marketing-information',
    },
  ],
  pageNumber: 1,
  pageSize: 15,
  pageCount: 2,
  totalCount: 2,
}
