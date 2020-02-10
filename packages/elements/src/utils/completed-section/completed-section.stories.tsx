import React from 'react'

import { storiesOf } from '@storybook/react'

import {
  isCompletedAddress,
  isCompletedAgentCheck,
  isCompletedDeclarationRisk,
  isCompletedPrimaryID,
  isCompletedProfile,
  isCompletedSecondaryID,
} from './completed-sections'

import { ContactModel, IdentityCheckModel } from '@reapit/foundations-ts-definitions'

export const contact: ContactModel = {
  id: 'AYL19000001',
  created: '2019-10-31T14:19:51.0000000Z',
  modified: '2019-12-31T10:52:29.0000000Z',
  title: 'Mrs',
  forename: 'H',
  surname: 'Phillips',
  dateOfBirth: '2019-12-12',
  active: true,
  marketingConsent: 'grant',
  identityCheck: 'pass',
  source: {
    id: 'id',
    type: 'type',
  },
  homePhone: 'asd',
  workPhone: 'asd',
  mobilePhone: 'asd',
  email: 'sad@gmail.com',
  primaryAddress: {
    type: 'primary',
    buildingName: 'aa',
    buildingNumber: '37',
    line1: 'Kingsway Place',
    line2: 'London',
    line3: 'a',
    line4: 'a',
    postcode: 'EC1R 0LU',
    countryId: 'GB',
  },
  secondaryAddress: {
    type: 'secondary',
    buildingName: 'cuong',
    buildingNumber: '1',
    line1: 'Line1',
    line2: 'Line2',
    line3: 'Line3',
    line4: 'Line4',
    postcode: 'EC1R 0LU',
    countryId: 'GB',
  },
  officeIds: ['AYL'],
  negotiatorIds: ['FGM'],
  _eTag: '"B4D9A5B8EB0D128024E91616FB4B701B"',
  _links: {
    self: {
      href: '/contacts/AYL19000001',
    },
    documents: {
      href: '/documents/?ownerType=contact&ownerId=AYL19000001',
    },
    identityChecks: {
      href: '/identityChecks/?contactId=AYL19000001',
    },
    offices: {
      href: '/offices/?id=AYL',
    },
    negotiators: {
      href: '/negotiators/?id=FGM',
    },
  },
  metadata: {},
}

export const idCheck: IdentityCheckModel = {
  id: 'RPT19000104',
  contactId: 'AYL19000001',
  created: '0001-01-01T00:00:00.0000000',
  modified: '2019-12-13T05:41:45.0000000Z',
  checkDate: '0001-01-01T00:00:00.0000000',
  status: 'pass',
  negotiatorId: 'LJW',
  identityDocument1: {
    documentId: 'SOME_ID',
    typeId: 'TX',
    expiry: '2020-02-07',
    details: 'Hshs',
  },
  identityDocument2: {
    documentId: 'SOME_ID',
    typeId: 'CI',
    expiry: '2019-12-21',
    details: 'a',
  },
  _eTag: '"51F8EECB09FB89903C42CAB63E3D5D0C"',
  _links: {
    self: {
      href: '/identityChecks/RPT19000104',
    },
    contact: {
      href: '/contacts/AYL19000001',
    },
    documentType1: {
      href: '/configuration/identityDocumentTypes/TX',
    },
    documentType2: {
      href: '/configuration/identityDocumentTypes/CI',
    },
  },
  metadata: {},
}

storiesOf('CompletedSections', module)
  .add(
    'Address',
    () => {
      return <div>Result: {isCompletedAddress(contact).toString()}</div>
    },
    { notes: 'Function check completed address' },
  )
  .add(
    'PrimaryId',
    () => {
      return <div>Result: {isCompletedPrimaryID(idCheck).toString()}</div>
    },
    { notes: 'Function check completed Primary ID' },
  )
  .add(
    'SecondaryId',
    () => {
      return <div>Result: {isCompletedSecondaryID(idCheck).toString()}</div>
    },
    { notes: 'Function check completed Secondary ID' },
  )
  .add(
    'Profile',
    () => {
      return <div>Result: {isCompletedProfile(contact).toString()}</div>
    },
    { notes: 'Function check completed Profile' },
  )
  .add(
    'DeclarationRisk',
    () => {
      return <div>Result: {isCompletedDeclarationRisk(contact).toString()}</div>
    },
    { notes: 'Function check completed Declaration and Risk' },
  )
  .add(
    'AgentCheck',
    () => {
      return <div>Result: {isCompletedAgentCheck(contact).toString()}</div>
    },
    { notes: 'Function check completed Agent Check' },
  )
