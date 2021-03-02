import { UpdateIdentityCheckArgs } from '../identity-checks'

export const updateIdentityCheckArgsMock: UpdateIdentityCheckArgs = {
  checkDate: '2020-01-22',
  status: 'pending',
  negotiatorId: 'JAS',
  identityDocument1: {
    typeId: 'DL',
    expiry: '2050-03-22',
    details: 'Driving License',
    fileData: null,
    name: null,
  },
  identityDocument2: {
    typeId: 'PP',
    expiry: '2045-12-01',
    details: 'Passport',
    fileData: null,
    name: null,
  },
  metadata: {
    CustomField1: 'CustomValue1',
    CustomField2: true,
  },
  _eTag: '"F6438EA989CA8385C2A5B0E7D6D6259C"',
  id: 'RPT20000093',
}
