import React from 'react'

import { storiesOf } from '@storybook/react'
import {
  isCompletedAddress,
  isCompletedAgentCheck,
  isCompletedDeclarationRisk,
  isCompletedPrimaryID,
  isCompletedProfile,
  isCompletedSecondaryID
} from './completed-sections'

export const contact = {
  id: 'MKC16000098',
  created: '2019-05-12T17:05:19',
  title: 'Ms',
  forename: 'Saoirse',
  surname: 'Chadwick',
  active: true,
  marketingConsent: 'notAsked',
  identityCheck: 'unchecked',
  communications: [
    {
      label: 'Home',
      detail: '01632 961556'
    },
    {
      label: 'Mobile',
      detail: '07700 901556'
    },
    {
      label: 'Work',
      detail: '020 7946 1556'
    },
    {
      label: 'E-Mail',
      detail: 'schadwick512@rpsfiction.net'
    }
  ],
  addresses: [
    {
      type: 'primary',
      buildingName: 'Tilbrook Farm',
      buildingNumber: '',
      line1: 'Station Road',
      line2: 'Bow Brickhill',
      line3: 'Milton Keynes',
      line4: 'Buckinghamshire',
      postcode: 'MK17 9JU',
      countryId: ''
    }
  ],
  relationships: [
    {
      id: 'RMK',
      type: 'negotiator'
    },
    {
      id: 'MKC',
      type: 'office'
    }
  ],
  metadata: {
    addresses: [
      {
        documentImage: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/primary-176cde-123-N19 4JF.jpg',
        year: '1911',
        month: '6',
        documentType: 'Current Benefits Agency letter'
      }
    ],
    primaryId: [
      {
        documents: [
          {
            typeId: 'CR',
            expiry: '2019-10-15T10:00:00Z',
            details: '1123',
            fileUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/MKC16000007-1123.jpg'
          }
        ]
      }
    ],
    secondaryId: [
      {
        documents: [
          {
            typeId: 'PP',
            expiry: '2019-10-10T00:00:00Z',
            details: '123',
            fileUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/MKC16000007-123(2).jpg'
          }
        ]
      }
    ],
    declarationRisk: {
      type: 'Normal',
      reason: 'reason',
      declarationForm: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/testname12345.png',
      riskAssessmentForm: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/testname12345.png'
    }
  }
}

export const idCheck = {
  id: 'AYL19000004',
  contactId: 'AYL19000002',
  created: '2019-10-14T15:23:21',
  modified: '2019-10-22T09:46:24',
  checkDate: '2019-10-14T15:23:17',
  status: 'pass',
  negotiatorId: 'LJW',
  documents: [
    {
      typeId: 'PP',
      expiry: '2019-12-05T16:44:00',
      details: 'This is a test'
    },
    {
      typeId: 'ER',
      expiry: '2019-12-05T16:44:00',
      details: 'This is a test'
    }
  ],
  metadata: {
    primaryIdUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/AYL19000002-This is a test.jpg',
    secondaryIdUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/AYL19000002-secondary test.jpg'
  },
  links: [
    {
      rel: 'self',
      href: 'http://reapit.cloud.tyk.io/AYL19000002/identityChecks/AYL19000004',
      action: 'GET'
    },
    {
      rel: 'contact',
      href: 'http://reapit.cloud.tyk.io/AYL19000002',
      action: 'GET'
    },
    {
      rel: 'idDocumentType',
      href: 'https://reapit.cloud.tyk.io/configuration/identityDocumentTypes/PP',
      action: 'GET'
    },
    {
      rel: 'idDocumentType',
      href: 'https://reapit.cloud.tyk.io/configuration/identityDocumentTypes/ER',
      action: 'GET'
    }
  ]
}

storiesOf('CompletedSections', module)
  .add(
    'Address',
    () => {
      return <div>Result: {isCompletedAddress(contact).toString()}</div>
    },
    { notes: 'Function check completed address' }
  )
  .add(
    'PrimaryId',
    () => {
      return <div>Result: {isCompletedPrimaryID(idCheck).toString()}</div>
    },
    { notes: 'Function check completed Primary ID' }
  )
  .add(
    'SecondaryId',
    () => {
      return <div>Result: {isCompletedSecondaryID(idCheck).toString()}</div>
    },
    { notes: 'Function check completed Secondary ID' }
  )
  .add(
    'Profile',
    () => {
      return <div>Result: {isCompletedProfile(contact).toString()}</div>
    },
    { notes: 'Function check completed Profile' }
  )
  .add(
    'DeclarationRisk',
    () => {
      return <div>Result: {isCompletedDeclarationRisk(contact).toString()}</div>
    },
    { notes: 'Function check completed Declaration and Risk' }
  )
  .add(
    'AgentCheck',
    () => {
      return <div>Result: {isCompletedAgentCheck(contact).toString()}</div>
    },
    { notes: 'Function check completed Agent Check' }
  )
