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
  developerData: {
    data: {
      data: [
        {
          id: '1161242a-f650-4d1d-aed7-909853fe7ee1',
          externalId: '1oqavb76nprc6v9um5ai8sf7o8',
          created: '2020-03-20T10:24:28',
          developerId: '47a37635-5044-4f20-b981-4f25970ac9cf',
          name: 'Dont Approve This',
          summary: 'The section below relates to the fields that comprise the listing of your application as it w',
          developer: 'Reapit Ltd',
          homePage: 'https://asd.com',
          isListed: false,
          isSandbox: false,
          isFeatured: false,
          isDirectApi: true,
          iconUri: 'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/Dont-Approve-This-icon.png',
          authFlow: 'client_credentials',
          launchUri: 'https://asd.com',
          pendingRevisions: true,
          links: [
            {
              rel: 'self',
              href: 'https://dev.platformmarketplace.reapit.net/apps/1161242a-f650-4d1d-aed7-909853fe7ee1',
              action: 'GET',
            },
            {
              rel: 'developer',
              href: 'https://dev.platformmarketplace.reapit.net/developers/47a37635-5044-4f20-b981-4f25970ac9cf',
              action: 'GET',
            },
          ],
        },
        {
          id: 'f6f6278b-7e73-46f3-97fd-baf278cec38d',
          externalId: '1u6h1njrb4url2u8oubq20jo1r',
          created: '2020-03-20T03:57:37',
          developerId: '47a37635-5044-4f20-b981-4f25970ac9cf',
          name: 'T Testing React App',
          summary: 'The section below relates to the fields that comprise the listing of your application',
          developer: 'Reapit Ltd',
          homePage: 'https://testingreactapp.com',
          isListed: true,
          isSandbox: false,
          isFeatured: false,
          isDirectApi: true,
          iconUri: 'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/Testing-React-App-icon.png',
          authFlow: 'client_credentials',
          launchUri: 'https://testingreactapp.com',
          pendingRevisions: false,
          links: [
            {
              rel: 'self',
              href: 'https://dev.platformmarketplace.reapit.net/apps/f6f6278b-7e73-46f3-97fd-baf278cec38d',
              action: 'GET',
            },
            {
              rel: 'developer',
              href: 'https://dev.platformmarketplace.reapit.net/developers/47a37635-5044-4f20-b981-4f25970ac9cf',
              action: 'GET',
            },
          ],
        },
      ],
      pageNumber: 1,
      pageSize: 9999,
      pageCount: 2,
      totalCount: 2,
    },
    scopes: [
      {
        name: 'agencyCloud/applicants.read',
        description: 'Read applicants',
      },
    ],
  },
  myIdentity: developerIdentity,
  formState: 'PENDING',
  isVisible: false,
  billing: billing,
  isServiceChartLoading: false,
}
