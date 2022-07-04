import { RevisionDetailItem } from '@/reducers/apps/revisions'
import { appPermissionStub } from './app-permission'
import { integrationTypesStub } from './integration-types'

export const revisionDetailDataStub: RevisionDetailItem = {
  data: {
    id: '1265b090-1113-4f25-ace2-adb19656d3bc',
    appId: '029b80f2-dc1c-4f80-adca-86dd6d4ff89b',
    developerId: 'abbc4353-8ef7-44fc-8181-0e2e68217b62',
    name: 'Amazon Shopping 2',
    summary: `Shop millions of products, never miss amazing deals, compare prices and reviews
      and track your orders easily with the Amazon Shopping App!`,
    description: `Download the app now and start shopping our selection of fashion, books, toys, home
      appliances, sport accessories and much more.\n\n-Easy\nCompare prices and check
      availability instantly by using your voice, scanning a \nOnce you complete your order,
      track it easily and get notifications about your shipment.\n\n- Convenient\nNever
      miss a deal or a discount with easy access to Lighting Deals and Deal of the Day.\nGet
      notifications when a new deal is available.`,
    supportEmail: 'VBNApplication@test.com',
    telephone: '0800 279 7234',
    homePage: 'https://www.amazon.com/',
    links: [
      {
        rel: 'self',
        href: 'https://reapit.cloud.tyk.io/marketplace/apps/029b80f2-dc1c-4f80-adca-86dd6d4ff89b/revisions/1265b090-1113-4f25-ace2-adb19656d3bc',
        action: 'GET',
      },
      {
        rel: 'app',
        href: 'https://reapit.cloud.tyk.io/marketplace/apps/029b80f2-dc1c-4f80-adca-86dd6d4ff89b',
        action: 'GET',
      },
      {
        rel: 'developer',
        href: 'https://reapit.cloud.tyk.io/marketplace/developers/abbc4353-8ef7-44fc-8181-0e2e68217b62',
        action: 'GET',
      },
    ],
    scopes: appPermissionStub,
  },
  scopes: appPermissionStub,
  desktopIntegrationTypes: integrationTypesStub,
}
