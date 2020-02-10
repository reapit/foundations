import {
  isCompletedAddress,
  isCompletedDeclarationRisk,
  isCompletedPrimaryID,
  isCompletedProfile,
  isCompletedSecondaryID,
  isCompletedAgentCheck,
} from '../completed-sections'
import { ContactModel } from '@reapit/foundations-ts-definitions'

describe('completed-sections', () => {
  it('isCompletedProfile', () => {
    ;[
      [null, false],
      [
        {
          title: 'Mr',
          surname: 'A',
          forename: 'B',
          dateOfBirth: '04/04/1996',
          mobilePhone: '0123456789',
        },
        true,
      ],
      [
        {
          title: 'Mr',
          forename: 'B',
          mobilePhone: '0123456789',
        },
        false,
      ],
    ].forEach(([params, expected]) => {
      const result = isCompletedProfile(params as ContactModel)
      expect(result).toBe(expected)
    })
  })

  describe('isCompletedPrimaryID', () => {
    it('should return true', () => {
      const mockIdentityCheck = {
        id: 'RPT19000010',
        contactId: 'MKC11001623',
        created: '0001-01-01T00:00:00',
        modified: '2019-10-19T02:52:10',
        checkDate: '2019-10-19T02:52:10',
        status: 'pending',
        negotiatorId: 'DAC',
        identityDocument1: {
          typeId: 'RF',
          expiry: '2019-10-24T09:51:48',
          details: '2131231',
        },
        identityDocument2: {
          typeId: 'RF',
          expiry: '2019-10-24T09:51:48',
          details: '2131231',
        },
        metadata: {
          primaryIdUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/MKC11001623-2131231.jpg',
          secondaryIdUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/MKC11001623-2131231.jpg',
        },
      }
      const result = isCompletedPrimaryID(mockIdentityCheck)
      expect(result).toEqual(true)
    })
    it('should return true', () => {
      const mockIdentityCheck = {
        id: 'RPT19000010',
        contactId: 'MKC11001623',
        created: '0001-01-01T00:00:00',
        modified: '2019-10-19T02:52:10',
        checkDate: '2019-10-19T02:52:10',
        status: 'pending',
        negotiatorId: 'DAC',
        identityDocument1: {
          typeId: 'RF',
          expiry: '2019-10-24T09:51:48',
          details: '2131231',
        },
        metadata: {
          primaryIdUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/MKC11001623-2131231.jpg',
        },
      }
      const result = isCompletedPrimaryID(mockIdentityCheck)
      expect(result).toEqual(true)
    })
    it('should return false', () => {
      const mockIdentityCheck = {
        id: 'RPT19000010',
        contactId: 'MKC11001623',
        created: '0001-01-01T00:00:00',
        modified: '2019-10-19T02:52:10',
        checkDate: '2019-10-19T02:52:10',
        status: 'pending',
        negotiatorId: 'DAC',
        identityDocument1: {
          typeId: 'RF',
          expiry: '2019-10-24T09:51:48',
          details: '2131231',
        },
        metadata: {
          secondaryIdUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/MKC11001623-2131231.jpg',
        },
      }
      const result = isCompletedPrimaryID(mockIdentityCheck)
      expect(result).toEqual(false)
    })
    it('should return false', () => {
      const mockIdentityCheck = {
        id: 'RPT19000010',
        contactId: 'MKC11001623',
        created: '0001-01-01T00:00:00',
        modified: '2019-10-19T02:52:10',
        checkDate: '2019-10-19T02:52:10',
        status: 'pending',
        negotiatorId: 'DAC',
        metadata: {},
      }
      const result = isCompletedPrimaryID(mockIdentityCheck)
      expect(result).toEqual(false)
    })
    it('should return false', () => {
      const mockIdentityCheck = {
        id: 'RPT19000010',
        contactId: 'MKC11001623',
        created: '0001-01-01T00:00:00',
        modified: '2019-10-19T02:52:10',
        checkDate: '2019-10-19T02:52:10',
        status: 'pending',
        negotiatorId: 'DAC',
      }
      const result = isCompletedPrimaryID(mockIdentityCheck)
      expect(result).toEqual(false)
    })

    it('should return false', () => {
      const mockIdentityCheck = {
        id: 'RPT19000010',
        contactId: 'MKC11001623',
        created: '0001-01-01T00:00:00',
        modified: '2019-10-19T02:52:10',
        checkDate: '2019-10-19T02:52:10',
        status: 'pending',
        negotiatorId: 'DAC',
        identityDocument1: {
          typeId: 'RF',
          expiry: '2019-10-24T09:51:48',
          details: undefined,
        },
        metadata: {
          secondaryIdUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/MKC11001623-2131231.jpg',
        },
      }
      const result = isCompletedPrimaryID(mockIdentityCheck)
      expect(result).toEqual(false)
    })

    it('should return false', () => {
      const mockIdentityCheck = {
        id: 'RPT19000010',
        contactId: 'MKC11001623',
        created: '0001-01-01T00:00:00',
        modified: '2019-10-19T02:52:10',
        checkDate: '2019-10-19T02:52:10',
        status: 'pending',
        negotiatorId: 'DAC',
        metadata: {
          secondaryIdUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/MKC11001623-2131231.jpg',
        },
      }
      const result = isCompletedPrimaryID(mockIdentityCheck)
      expect(result).toEqual(false)
    })
    it('should return false', () => {
      const mockIdentityCheck = {}
      const result = isCompletedPrimaryID(mockIdentityCheck)
      expect(result).toEqual(false)
    })
    it('should return false', () => {
      const mockIdentityCheck = null
      const result = isCompletedPrimaryID(mockIdentityCheck)
      expect(result).toEqual(false)
    })
  })

  describe('isCompletedSecondaryId', () => {
    it('should return false', () => {
      const mockIdentityCheck = {}
      const result = isCompletedSecondaryID(mockIdentityCheck)
      expect(result).toEqual(false)
    })
    it('should return false', () => {
      const mockIdentityCheck = null
      const result = isCompletedSecondaryID(mockIdentityCheck)
      expect(result).toEqual(false)
    })
    it('should return true', () => {
      const mockIdentityCheck = {
        id: 'RPT19000010',
        contactId: 'MKC11001623',
        created: '0001-01-01T00:00:00',
        modified: '2019-10-19T02:52:10',
        checkDate: '2019-10-19T02:52:10',
        status: 'pending',
        negotiatorId: 'DAC',
        identityDocument1: {
          typeId: 'RF',
          expiry: '2019-10-24T09:51:48',
          details: '2131231',
        },
        identityDocument2: {
          typeId: 'RF',
          expiry: '2019-10-24T09:51:48',
          details: '2131231',
        },

        metadata: {
          primaryIdUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/MKC11001623-2131231.jpg',
          secondaryIdUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/MKC11001623-2131231.jpg',
        },
      }
      const result = isCompletedSecondaryID(mockIdentityCheck)
      expect(result).toEqual(true)
    })

    it('should return true', () => {
      const mockIdentityCheck = {
        id: 'RPT19000010',
        contactId: 'MKC11001623',
        created: '0001-01-01T00:00:00',
        modified: '2019-10-19T02:52:10',
        checkDate: '2019-10-19T02:52:10',
        status: 'pending',
        negotiatorId: 'DAC',
        identityDocument2: {
          typeId: 'RF',
          expiry: '2019-10-24T09:51:48',
          details: '2131231',
        },
        metadata: {
          secondaryIdUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/MKC11001623-2131231.jpg',
        },
      }
      const result = isCompletedSecondaryID(mockIdentityCheck)
      expect(result).toEqual(true)
    })

    it('should return false', () => {
      const mockIdentityCheck = {
        id: 'RPT19000010',
        contactId: 'MKC11001623',
        created: '0001-01-01T00:00:00',
        modified: '2019-10-19T02:52:10',
        checkDate: '2019-10-19T02:52:10',
        status: 'pending',
        negotiatorId: 'DAC',
        documents: [
          {
            typeId: 'RF',
            expiry: '2019-10-24T09:51:48',
            details: '2131231',
          },
        ],
        metadata: {
          primaryIdUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/MKC11001623-2131231.jpg',
        },
      }
      const result = isCompletedSecondaryID(mockIdentityCheck)
      expect(result).toEqual(false)
    })
  })

  it('isCompletedAddress', () => {
    ;[
      [undefined, false],
      [
        {
          primaryAddress: {
            line1: 'A',
            line3: 'B',
            postcode: '700000',
          },

          metadata: {
            addresses: [
              {
                year: '2018',
                month: '12',
                documentImage: 'Test',
              },
            ],
          },
        },
        true,
      ],
      [
        {
          primaryAddress: {
            line1: 'A',
            line3: 'B',
            postcode: '700000',
          },

          metadata: {},
        },
        false,
      ],
    ].forEach(([params, expected]) => {
      const result = isCompletedAddress(params as ContactModel)
      expect(result).toBe(expected)
    })
  })

  it('isCompletedDeclarationRisk', () => {
    ;[
      [undefined, false],
      [
        {
          metadata: {
            declarationRisk: {
              reason: 'test',
              type: 'test',
              declarationForm: 'Test',
            },
          },
        },
        true,
      ],
      [
        {
          metadata: {
            declarationRisk: {
              type: 'test',
            },
          },
        },
        false,
      ],
      [
        {
          metadata: {
            declarationRisk: {
              reason: 'test',
              type: 'test',
              declarationForm: '',
            },
          },
        },
        false,
      ],
    ].forEach(([params, expected]) => {
      const result = isCompletedDeclarationRisk(params as ContactModel)
      expect(result).toBe(expected)
    })
  })

  describe('isCompleteAgentCheck', () => {
    it('should return true', () => {
      const mockIdentityCheck = {
        id: 'RPT19000010',
        contactId: 'MKC11001623',
        created: '0001-01-01T00:00:00',
        modified: '2019-10-19T02:52:10',
        checkDate: '2019-10-19T02:52:10',
        status: 'pending',
        negotiatorId: 'DAC',
        documents: [
          {
            typeId: 'RF',
            expiry: '2019-10-24T09:51:48',
            details: '2131231',
          },
        ],
        metadata: {
          secondaryIdUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/MKC11001623-2131231.jpg',
          referralType: 'Vendor Compliance',
          timeSelection: '10:00',
          clientType: 'Individual',
          placeMeet: 'Home Address',
          isUKResident: 'Yes',
        },
      }
      const result = isCompletedAgentCheck(mockIdentityCheck)
      expect(result).toEqual(true)
    })
  })

  it('should return false', () => {
    const mockIdentityCheck = {
      id: 'RPT19000010',
      contactId: 'MKC11001623',
      created: '0001-01-01T00:00:00',
      modified: '2019-10-19T02:52:10',
      checkDate: '2019-10-19T02:52:10',
      status: 'pending',
      negotiatorId: 'DAC',
      documents: [
        {
          typeId: 'RF',
          expiry: '2019-10-24T09:51:48',
          details: '2131231',
        },
      ],
      metadata: {
        secondaryIdUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/MKC11001623-2131231.jpg',
        referralType: '',
        timeSelection: '10:00',
        clientType: 'Individual',
        placeMeet: 'Home Address',
        isUKResident: 'Yes',
      },
    }
    const result = isCompletedAgentCheck(mockIdentityCheck)
    expect(result).toEqual(false)
  })

  it('should return false', () => {
    const mockIdentityCheck = {
      id: 'RPT19000010',
      contactId: 'MKC11001623',
      created: '0001-01-01T00:00:00',
      modified: '2019-10-19T02:52:10',
      checkDate: '2019-10-19T02:52:10',
      status: 'pending',
      negotiatorId: 'DAC',
      documents: [
        {
          typeId: 'RF',
          expiry: '2019-10-24T09:51:48',
          details: '2131231',
        },
      ],
      metadata: {
        secondaryIdUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/MKC11001623-2131231.jpg',
        clientType: 'Individual',
        placeMeet: 'Home Address',
        isUKResident: 'Yes',
      },
    }
    const result = isCompletedAgentCheck(mockIdentityCheck)
    expect(result).toEqual(false)
  })

  it('should return false', () => {
    const mockIdentityCheck = {
      id: 'RPT19000010',
      contactId: 'MKC11001623',
      created: '0001-01-01T00:00:00',
      modified: '2019-10-19T02:52:10',
      checkDate: '2019-10-19T02:52:10',
      status: 'pending',
      negotiatorId: 'DAC',
      identityDocument1: {
        typeId: 'RF',
        expiry: '2019-10-24T09:51:48',
        details: '2131231',
      },

      metadata: {
        secondaryIdUrl: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/MKC11001623-2131231.jpg',
      },
    }
    const result = isCompletedAgentCheck(mockIdentityCheck)
    expect(result).toEqual(false)
  })
})
