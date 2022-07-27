import { PagedResultDesktopIntegrationTypeModel } from '@/types/desktop-integration-types'

export const integrationTypesStub: PagedResultDesktopIntegrationTypeModel = {
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
    {
      id: 'VendorMarketing',
      name: 'Vendor Marketing Report',
      description: 'Replaces the vendor marketing report',
      url: 'https://foundations-adocumentation.reapit.cloud/api/desktop-api#vendor-marketing-report',
    },
    {
      id: 'PrintWizard',
      name: 'Property Details Generation',
      description: 'Replaces the functionality to generate property particulars',
      url: 'https://foundations-documentation.reapit.cloud/api/desktop-api#property-detail-generation',
    },
    {
      id: 'AppExport',
      name: 'Applicant Export',
      description: 'Provides ability to export a saved applicant to third party system',
      url: 'https://foundations-documentation.reapit.cloud/api/desktop-api#applicant-export',
    },
    {
      id: 'Property',
      name: 'Property',
      description: 'Launchable from the property screen',
      url: 'https://foundations-documentation.reapit.cloud/api/desktop-api#property-1',
    },
    {
      id: 'Applicant',
      name: 'Applicant',
      description: 'Launchable from the applicant scree',
      url: 'https://foundations-documentation.reapit.cloud/api/desktop-api#applicant',
    },
  ],
  pageNumber: 1,
  pageSize: 200,
  pageCount: 7,
  totalCount: 7,
}
