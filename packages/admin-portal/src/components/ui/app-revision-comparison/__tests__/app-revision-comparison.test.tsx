import * as React from 'react'
import { render } from '../../../../tests/react-testing'

import {
  AppRevisionComparison,
  AppRevisionComparisonProps,
  isAppearInScope,
  renderCheckboxesDiff,
  getChangedMediaList,
  mapIntegrationIdArrayToNameArray,
} from '../app-revision-comparison'
import { appDetailDataStub } from '@/sagas/apps/__stubs__/app-detail'
import { revisionDetailDataStub } from '@/sagas/apps/__stubs__/revision-detail'
import { appPermissionStub } from '@/sagas/apps/__stubs__/app-permission'
import { integrationTypesStub } from '@/sagas/apps/__stubs__/integration-types'

const props = (loading: boolean, error: boolean): AppRevisionComparisonProps => ({
  appDetailState: {
    isLoading: loading,
    errorMessage: error ? 'error' : '',
    data: appDetailDataStub.data,
  },
  revisionDetailState: {
    formState: 'PENDING',
    isLoading: loading,
    errorMessage: error ? 'error' : '',
    data: {
      data: revisionDetailDataStub.data,
      scopes: appPermissionStub,
      desktopIntegrationTypes: integrationTypesStub,
    },
  },
})

describe('AdminRevisionModalInner', () => {
  it('should match a snapshot', () => {
    expect(render(<AppRevisionComparison {...props(true, false)} />)).toMatchSnapshot()
  })
})

describe('isAppearInScope', () => {
  it('should return true', () => {
    const input = 'Marketplace/developers.read'
    const output = true
    const result = isAppearInScope(input, appPermissionStub)
    expect(result).toEqual(output)
  })
  it('should return false when cannot find permission', () => {
    const input = 'Marketplace/developers.test'
    const output = false
    const result = isAppearInScope(input, appPermissionStub)
    expect(result).toEqual(output)
  })
  it('should return false when !nameNeedToFind || scopes.length === 0', () => {
    const input = undefined
    const output = false
    const result = isAppearInScope(input, [])
    expect(result).toEqual(output)
  })
  it('should return false when !nameNeedToFind', () => {
    const input = undefined
    const output = false
    const result = isAppearInScope(input, appPermissionStub)
    expect(result).toEqual(output)
  })
  it('should return false when scopes.length === 0', () => {
    const input = 'Marketplace/developers.test'
    const output = false
    const result = isAppearInScope(input, [])
    expect(result).toEqual(output)
  })
})

// scopes checkboxes
describe('renderCheckboxesDiff', () => {
  it('should render checkboxes', () => {
    const scopes = [
      ...appPermissionStub,
      {
        name: 'Marketplace/developers.test',
        description: 'Test data about developers',
      },
    ]
    const checkboxes = renderCheckboxesDiff({
      scopes,
      appScopes: appDetailDataStub.data.scopes,
      revisionScopes: scopes,
    })
    expect(checkboxes).toHaveLength(3)
  })
})

describe('getChangedMediaList', () => {
  const app = {
    id: '3a4fbd46-fb26-495a-b7df-932a310f5842',
    appId: '3d2c9bb6-fc76-4ba8-a4c0-71bde64824fc',
    developerId: '7a96e6b2-3778-4118-9c9b-6450851e5608',
    name: 'Grab',
    summary: 'Grab Holdings Inc., formerly known as MyTeksi and GrabTaxi, is a Singapore based ridesharing company.',
    description:
      'Grab Holdings Inc., formerly known as MyTeksi and GrabTaxi, is a Singapore based ridesharing company. ' +
      'In addition to transportation, the company offers food delivery and digital payments services via mobile app. ' +
      'The company was originally founded in Malaysia and later moved its headquarters to Singapore',
    supportEmail: 'david90@gmail.com',
    telephone: '0978000000',
    homePage: 'https://grab.com',
    launchUri: 'https://grab.com',
    isListed: true,
    isDirectApi: false,
    category: {
      id: '1',
      name: 'education',
      description: 'apps for education',
    },
    scopes: [
      {
        name: 'agencyCloud/applicants.read',
        description: 'Read applicants',
      },
      {
        name: 'agencyCloud/applicants.write',
        description: 'Write applicants',
      },
      {
        name: 'agencyCloud/appointments.write',
        description: 'Write appointments',
      },
      {
        name: 'agencyCloud/companies.write',
        description: 'Write companies',
      },
      {
        name: 'agencyCloud/offers.read',
        description: 'Read offers',
      },
      {
        name: 'agencyCloud/worksorders.write',
        description: 'Write works orders',
      },
    ],
    media: [
      {
        id: '0453b244-4db6-4fb3-afe1-313c7428e352',
        uri: 'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/Grab-icon.png',
        description: 'Application Icon',
        type: 'icon',
        order: 0,
      },
      {
        id: '9cf52f2d-44da-4b2d-8e36-7d89c7d01e85',
        uri: 'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/Grab-screen1ImageUrl.png',
        description: 'Application Image',
        type: 'image',
        order: 1,
      },
      {
        id: '59308d52-7e36-43c0-93b8-650f52942f17',
        uri: 'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/Grab-screen3ImageUrl.jpg',
        description: 'Application Image',
        type: 'image',
        order: 2,
      },
    ],
    links: [
      {
        rel: 'self',
        href: 'https://dev.platformmarketplace.reapit.net/apps/3d2c9bb6-fc76-4ba8-a4c0-71bde64824fc/revisions/3a4fbd46-fb26-495a-b7df-932a310f5842',
        action: 'GET',
      },
      {
        rel: 'app',
        href: 'https://dev.platformmarketplace.reapit.net/apps/3d2c9bb6-fc76-4ba8-a4c0-71bde64824fc',
        action: 'GET',
      },
      {
        rel: 'developer',
        href: 'https://dev.platformmarketplace.reapit.net/developers/7a96e6b2-3778-4118-9c9b-6450851e5608',
        action: 'GET',
      },
    ],
  }
  const revision = {
    id: '3d2c9bb6-fc76-4ba8-a4c0-71bde64824fc',
    created: '2020-01-16T04:09:56',
    developerId: '7a96e6b2-3778-4118-9c9b-6450851e5608',
    externalId: '6l75fob6sf4maq1cq6nb184khn',
    name: 'Grab',
    summary: 'Grab Holdings Inc., formerly known as MyTeksi and GrabTaxi, is a Singapore based ridesharing company.',
    description:
      'Grab Holdings Inc., formerly known as MyTeksi and GrabTaxi, is a Singapore based ridesharing company. ' +
      'In addition to transportation, the company offers food delivery and digital payments services via mobile app. ' +
      'The company was originally founded in Malaysia and later moved its headquarters to Singapore',
    developer: 'Dwarves Foundation',
    supportEmail: 'david90@gmail.com',
    telephone: '0978000000',
    homePage: 'https://grab.com',
    launchUri: 'https://grab.com',
    authFlow: 'authorisationCode',
    isListed: true,
    isDirectApi: false,
    isSandbox: false,
    isFeatured: false,
    pendingRevisions: true,
    category: {
      id: '1',
      name: 'education',
      description: 'apps for education',
    },
    scopes: [
      {
        name: 'agencyCloud/applicants.read',
        description: 'Read applicants',
      },
      {
        name: 'agencyCloud/applicants.write',
        description: 'Write applicants',
      },
      {
        name: 'agencyCloud/appointments.write',
        description: 'Write appointments',
      },
      {
        name: 'agencyCloud/companies.write',
        description: 'Write companies',
      },
      {
        name: 'agencyCloud/offers.read',
        description: 'Read offers',
      },
      {
        name: 'agencyCloud/worksorders.write',
        description: 'Write works orders',
      },
    ],
    media: [
      {
        id: '0479ff17-bd16-46a9-bf12-1ef517a762d8',
        uri: 'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/Grab-icon.png',
        description: 'Application Icon',
        type: 'icon',
        order: 0,
      },
      {
        id: 'ad1291e4-861e-4fab-9c9a-822d5f095d64',
        uri: 'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/Grab-screen1ImageUrl.png',
        description: 'Application Image',
        type: 'image',
        order: 0,
      },
      {
        id: 'fe1ed265-c596-4b59-b492-49a1a51de1b2',
        uri: 'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/Grab-screen3ImageUrl.jpg',
        description: 'Application Image',
        type: 'image',
        order: 0,
      },
      {
        id: 'd8fc0d52-ee61-4ece-af02-f96ea8650af9',
        uri: 'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/Grab-screen4ImageUrl.png',
        description: 'Application Image',
        type: 'image',
        order: 0,
      },
    ],
    links: [
      {
        rel: 'self',
        href: 'https://dev.platformmarketplace.reapit.net/apps/3d2c9bb6-fc76-4ba8-a4c0-71bde64824fc',
        action: 'GET',
      },
      {
        rel: 'developer',
        href: 'https://dev.platformmarketplace.reapit.net/developers/7a96e6b2-3778-4118-9c9b-6450851e5608',
        action: 'GET',
      },
      {
        rel: 'revisions',
        href: 'https://dev.platformmarketplace.reapit.net/apps/3d2c9bb6-fc76-4ba8-a4c0-71bde64824fc/revisions',
        action: 'GET',
      },
      {
        rel: 'installations',
        href: 'https://dev.platformmarketplace.reapit.net/installations?AppIds=3d2c9bb6-fc76-4ba8-a4c0-71bde64824fc',
        action: 'GET',
      },
    ],
  }
  it('should run correctly', () => {
    const result = getChangedMediaList({ app, revision })
    const output = [
      {
        changedMedia: 'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/Grab-icon.png',
        currentMedia: 'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/Grab-icon.png',
        order: 0,
        type: 'icon',
      },
      {
        changedMedia: 'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/Grab-screen1ImageUrl.png',
        currentMedia: 'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/Grab-screen1ImageUrl.png',
        order: 0,
        type: 'image',
      },
      {
        changedMedia: 'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/Grab-screen3ImageUrl.jpg',
        currentMedia: 'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/Grab-screen3ImageUrl.jpg',
        order: 0,
        type: 'image',
      },
      {
        changedMedia: 'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/Grab-screen4ImageUrl.png',
        currentMedia: undefined,
        order: 0,
        type: 'image',
      },
    ]
    expect(result).toEqual(output)
  })

  it('should run correctly', () => {
    const result = getChangedMediaList({ app: revision, revision: app })
    const output = [
      {
        changedMedia: 'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/Grab-icon.png',
        currentMedia: 'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/Grab-icon.png',
        order: 0,
        type: 'icon',
      },
      {
        changedMedia: 'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/Grab-screen1ImageUrl.png',
        currentMedia: 'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/Grab-screen1ImageUrl.png',
        order: 0,
        type: 'image',
      },
      {
        changedMedia: 'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/Grab-screen3ImageUrl.jpg',
        currentMedia: 'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/Grab-screen3ImageUrl.jpg',
        order: 0,
        type: 'image',
      },
      {
        changedMedia: undefined,
        currentMedia: 'https://reapit-dev-app-store-media.s3.eu-west-2.amazonaws.com/Grab-screen4ImageUrl.png',
        order: 0,
        type: 'image',
      },
    ]
    expect(result).toEqual(output)
  })
})

describe('mapIntegrationIdArrayToNameArray', () => {
  it('should return correctly', () => {
    const ids = ['IdCheck', 'PrpMarketing']
    const result = mapIntegrationIdArrayToNameArray(ids, integrationTypesStub.data)
    expect(result).toEqual(['Identity Check', 'Property Marketing Information'])
  })
  it('should return correctly with undefined', () => {
    const result = mapIntegrationIdArrayToNameArray(undefined, undefined)
    expect(result).toEqual([])
  })
  it('should return correctly with noname', () => {
    const ids = ['IdCheck', 'PrpMarketing']
    const desktopIntegrationTypesArray = [
      {
        id: 'IdCheck',
        description: 'Replaces the standard ID check screen',
        url: 'https://foundations-documentation.reapit.cloud/api/desktop-api#id-check',
      },
      {
        id: 'PrpMarketing',
        name: 'Property Marketing Information',
        description: 'Replaces the standard property marketing screen',
        url: 'https://foundations-documentation.reapit.cloud/api/desktop-api#property-marketing-information',
      },
    ]
    const result = mapIntegrationIdArrayToNameArray(ids, desktopIntegrationTypesArray)
    expect(result).toEqual(['Property Marketing Information'])
  })
})
