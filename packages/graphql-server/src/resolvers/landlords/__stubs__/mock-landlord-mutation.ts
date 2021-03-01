import {
  CreateLandlordArgs,
  CreateLandlordRelationshipArgs,
  DeleteLandlordRelationshipArgs,
  UpdateLandlordArgs,
} from '../landlords'

export const createLandlordArgsMock: CreateLandlordArgs = {
  active: true,
  solicitorId: 'OXF12300101',
  officeId: 'OXF',
  source: {
    id: 'GGL',
    type: 'source',
  },
  related: [
    {
      associatedId: 'OXF12300101',
      associatedType: 'contact',
    },
  ],
  metadata: {
    CustomField1: 'CustomValue1',
    CustomField2: true,
  },
}

export const createLandlordRelationshipArgsMock: CreateLandlordRelationshipArgs = {
  associatedId: 'OXF18000001',
  associatedType: 'contact',
  isMain: false,
  id: 'MKT200036',
}

export const updateLandlordArgsMock: UpdateLandlordArgs = {
  active: true,
  solicitorId: 'OXF12300101',
  officeId: 'OXF',
  source: {
    id: 'GGL',
    type: 'source',
  },
  id: 'MKT200036',
  _eTag: '"C140F3416B9DF08FA96A6696A931F401"',
}

export const deleteLandlordRelationshipArgsMock: DeleteLandlordRelationshipArgs = {
  id: 'MKT200035',
  relationshipId: 'MKT20000067',
}
