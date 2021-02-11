import {
  getInstallationsForWholeOrg,
  getInstallationsForOfficeGroups,
  getClientIdFirstPart,
} from '../app-installation-manager'

const stubInstallations1 = {
  data: [
    {
      client: 'OTHER',
    },
    {
      client: 'SBOX',
    },
  ],
}

const stubInstallations2 = {
  data: [
    {
      client: 'SBOX-GWIT',
    },
    {
      client: 'SBOX-OTHER',
    },
    {
      client: 'SBOX',
    },
  ],
}

const stubInstallations3 = {
  data: [
    {
      client: 'OTHER',
    },
    {
      client: 'SBOX-GWIT',
    },
    {
      client: 'SBOX-OTHER',
    },
    {
      client: 'SBOX-PWIT',
    },
  ],
}

describe('AppInstallationManager', () => {
  it('getInstallationsForWholeOrg fn should return correct result', () => {
    expect(getInstallationsForWholeOrg(stubInstallations1, 'SBOX')).toEqual(['SBOX'])
    expect(getInstallationsForWholeOrg(stubInstallations2, 'SBOX')).toEqual(['SBOX'])
    expect(getInstallationsForWholeOrg(stubInstallations3, 'SBOX')).toEqual([])
  })

  it('getInstallationsForOfficeGroups fn should return correct result', () => {
    expect(getInstallationsForOfficeGroups(stubInstallations1, 'SBOX')).toEqual([])
    expect(getInstallationsForOfficeGroups(stubInstallations2, 'SBOX')).toEqual(['SBOX-GWIT', 'SBOX-OTHER'])
    expect(getInstallationsForOfficeGroups(stubInstallations3, 'SBOX')).toEqual([
      'SBOX-GWIT',
      'SBOX-OTHER',
      'SBOX-PWIT',
    ])
  })

  it('getClientIdFirstPart fn should return correct result', () => {
    expect(getClientIdFirstPart('SBOX')).toEqual('SBOX')
    expect(getClientIdFirstPart('SBOX-GWTI')).toEqual('SBOX')
    expect(getClientIdFirstPart('SBOX-OTHER')).toEqual('SBOX')
    expect(getClientIdFirstPart('OTHER')).toEqual('OTHER')
    expect(getClientIdFirstPart('OTHER-12')).toEqual('OTHER')
  })
})
