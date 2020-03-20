import {
  isCompletedAddress,
  isCompletedDeclarationRisk,
  isCompletedPrimaryID,
  isCompletedProfile,
  isCompletedSecondaryID,
  isCompletedAgentCheck,
} from '../completed-sections'

describe('completed-sections', () => {
  describe('isCompletedProfile', () => {
    it('should run correctly', () => {
      const params = {
        title: 'Mr',
        surname: 'A',
        forename: 'B',
        dateOfBirth: '04/04/1996',
        homePhone: '0123456789',
        workPhone: '0123456789',
        mobilePhone: '0123456789',
        email: 'tanphamhaiduong@gmail.com',
      }
      const result = isCompletedProfile(params)
      expect(result).toBeTruthy()
    })

    it('should run correctly', () => {
      const params = {
        title: 'Mr',
        surname: 'A',
        forename: 'B',
        dateOfBirth: '04/04/1996',
        email: 'tanphamhaiduong@gmail.com',
      }
      const result = isCompletedProfile(params)
      expect(result).toBeFalsy()
    })

    it('should run correctly', () => {
      const params = undefined
      const result = isCompletedProfile(params)
      expect(result).toBeFalsy()
    })
  })

  describe('isCompletedPrimaryID', () => {
    it('should return true', () => {
      const mockIdentityCheck = {
        id: 'RPT19000104',
        contactId: 'AYL19000001',
        created: '0001-01-01T00:00:00',
        modified: '2019-12-13T05:41:45',
        checkDate: '0001-01-01T00:00:00',
        status: 'pass',
        negotiatorId: 'LJW',
        identityDocument1: {
          typeId: 'TX',
          expiry: '2020-02-07T00:00:00',
          details: 'Hshs',
          documentId: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/AYL19000001-testst.png',
        },
        identityDocument2: {
          typeId: 'CI',
          expiry: '2019-12-21T00:00:00',
          details: 'a',
          documentId: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/AYL19000001-testst.png',
        },
        metadata: {},
        _links: {
          self: {
            href: '/identityChecks/RPT19000104',
          },
          contact: {
            href: '/contacts/AYL19000001',
          },
          identityDocument1Type: {
            href: '/configuration/identityDocumentTypes/TX',
          },
          identityDocument2Type: {
            href: '/configuration/identityDocumentTypes/CI',
          },
        },
      }
      const result = isCompletedPrimaryID(mockIdentityCheck)
      expect(result).toBeTruthy()
    })

    it('should return false', () => {
      const mockIdentityCheck = {
        id: 'RPT19000104',
        contactId: 'AYL19000001',
        created: '0001-01-01T00:00:00',
        modified: '2019-12-13T05:41:45',
        checkDate: '0001-01-01T00:00:00',
        status: 'pass',
        negotiatorId: 'LJW',
        identityDocument1: {
          typeId: 'TX',
          expiry: '2020-02-07T00:00:00',
          details: 'Hshs',
        },
        identityDocument2: {
          typeId: 'CI',
          expiry: '2019-12-21T00:00:00',
          details: 'a',
          documentId: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/AYL19000001-testst.png',
        },
        metadata: {},
        _links: {
          self: {
            href: '/identityChecks/RPT19000104',
          },
          contact: {
            href: '/contacts/AYL19000001',
          },
          identityDocument1Type: {
            href: '/configuration/identityDocumentTypes/TX',
          },
          identityDocument2Type: {
            href: '/configuration/identityDocumentTypes/CI',
          },
        },
      }
      const result = isCompletedPrimaryID(mockIdentityCheck)
      expect(result).toBeFalsy()
    })
  })

  describe('isCompletedSecondaryId', () => {
    it('should return true', () => {
      const mockIdentityCheck = {
        id: 'RPT19000104',
        contactId: 'AYL19000001',
        created: '0001-01-01T00:00:00',
        modified: '2019-12-13T05:41:45',
        checkDate: '0001-01-01T00:00:00',
        status: 'pass',
        negotiatorId: 'LJW',
        identityDocument1: {
          typeId: 'TX',
          expiry: '2020-02-07T00:00:00',
          details: 'Hshs',
          documentId: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/AYL19000001-testst.png',
        },
        identityDocument2: {
          typeId: 'CI',
          expiry: '2019-12-21T00:00:00',
          details: 'a',
          documentId: 'https://reapit-app-store-app-media.s3.eu-west-2.amazonaws.com/AYL19000001-testst.png',
        },
        metadata: {},
        _links: {
          self: {
            href: '/identityChecks/RPT19000104',
          },
          contact: {
            href: '/contacts/AYL19000001',
          },
          identityDocument1Type: {
            href: '/configuration/identityDocumentTypes/TX',
          },
          identityDocument2Type: {
            href: '/configuration/identityDocumentTypes/CI',
          },
        },
      }
      const result = isCompletedSecondaryID(mockIdentityCheck)
      expect(result).toEqual(true)
    })
  })

  describe('isCompletedAddress', () => {
    it('should run correctly', () => {
      const params = {
        id: 'BED16000182',
        created: '2019-04-18T06:56:07.0000000Z',
        title: 'Ms',
        forename: 'Cerys',
        surname: 'Haldane',
        active: true,
        marketingConsent: 'notAsked',
        source: {
          id: '',
          type: '',
        },
        homePhone: '01632 963892',
        workPhone: '020 7946 3892',
        mobilePhone: '07700 903892',
        email: 'chaldane836@rpsfiction.net',
        primaryAddress: {
          type: 'primary',
          buildingName: '123',
          buildingNumber: '102',
          line1: 'Holwelbury Road',
          line2: '123',
          line3: '123',
          line4: '123',
          postcode: 'SG5 3FL',
          countryId: 'GB',
        },
        officeIds: ['BED'],
        negotiatorIds: ['JWB'],
        _links: {
          self: {
            href: '/contacts/BED16000182',
          },
          documents: {
            href: '/documents/?OwnerType=contact&OwnerId=BED16000182',
          },
          identityChecks: {
            href: '/identityChecks/?ContactId=BED16000182',
          },
        },
      }
      const result = isCompletedAddress(params)
      expect(result).toBeFalsy()
    })

    it('should run correctly', () => {
      const params = {
        id: 'BED16000182',
        created: '2019-04-18T06:56:07.0000000Z',
        title: 'Ms',
        forename: 'Cerys',
        surname: 'Haldane',
        active: true,
        marketingConsent: 'notAsked',
        source: {
          id: '',
          type: '',
        },
        homePhone: '01632 963892',
        workPhone: '020 7946 3892',
        mobilePhone: '07700 903892',
        email: 'chaldane836@rpsfiction.net',
        primaryAddress: {
          type: 'primary',
          buildingName: '123',
          buildingNumber: '102',
          line1: 'Holwelbury Road',
          line2: '123',
          line3: '123',
          line4: '123',
          postcode: 'SG5 3FL',
          countryId: 'GB',
        },
        secondaryAddress: {
          type: 'secondary',
          buildingName: '123',
          buildingNumber: '102',
          line1: 'Holwelbury Road',
          line2: '123',
          line3: '123',
          line4: '123',
          postcode: 'SG5 3FL',
          countryId: 'GB',
        },
        officeIds: ['BED'],
        negotiatorIds: ['JWB'],
        _links: {
          self: {
            href: '/contacts/BED16000182',
          },
          documents: {
            href: '/documents/?OwnerType=contact&OwnerId=BED16000182',
          },
          identityChecks: {
            href: '/identityChecks/?ContactId=BED16000182',
          },
        },
      }
      const result = isCompletedAddress(params)
      expect(result).toBeFalsy()
    })

    it('should run correctly', () => {
      const params = {
        id: 'BED16000182',
        created: '2019-04-18T06:56:07.0000000Z',
        title: 'Ms',
        forename: 'Cerys',
        surname: 'Haldane',
        active: true,
        marketingConsent: 'notAsked',
        source: {
          id: '',
          type: '',
        },
        homePhone: '01632 963892',
        workPhone: '020 7946 3892',
        mobilePhone: '07700 903892',
        email: 'chaldane836@rpsfiction.net',
        primaryAddress: {
          type: 'primary',
          buildingName: '123',
          buildingNumber: '102',
          line1: 'Holwelbury Road',
          line2: '123',
          line3: '123',
          line4: '123',
          postcode: 'SG5 3FL',
          countryId: 'GB',
        },
        secondaryAddress: {
          type: 'secondary',
          buildingName: '123',
          buildingNumber: '102',
          line1: 'Holwelbury Road',
          line4: '123',
          postcode: 'SG5 3FL',
          countryId: 'GB',
        },
        officeIds: ['BED'],
        negotiatorIds: ['JWB'],
        _links: {
          self: {
            href: '/contacts/BED16000182',
          },
          documents: {
            href: '/documents/?OwnerType=contact&OwnerId=BED16000182',
          },
          identityChecks: {
            href: '/identityChecks/?ContactId=BED16000182',
          },
        },
      }
      const result = isCompletedAddress(params)
      expect(result).toBeFalsy()
    })
  })

  describe('isCompletedDeclarationRisk', () => {
    it('should run correctly return true', () => {
      const params = {
        id: 'BED16000182',
        created: '2019-04-18T06:56:07.0000000Z',
        title: 'Ms',
        forename: 'Cerys',
        surname: 'Haldane',
        active: true,
        marketingConsent: 'notAsked',
        source: {
          id: '',
          type: '',
        },
        homePhone: '01632 963892',
        workPhone: '020 7946 3892',
        mobilePhone: '07700 903892',
        email: 'chaldane836@rpsfiction.net',
        primaryAddress: {
          type: 'primary',
          buildingName: '',
          buildingNumber: '102',
          line1: 'Holwelbury Road',
          line2: '',
          line3: '',
          line4: '',
          postcode: 'SG5 3FL',
          countryId: '',
        },
        officeIds: ['BED'],
        negotiatorIds: ['JWB'],
        _links: {
          self: {
            href: '/contacts/BED16000182',
          },
          documents: {
            href: '/documents/?OwnerType=contact&OwnerId=BED16000182',
          },
          identityChecks: {
            href: '/identityChecks/?ContactId=BED16000182',
          },
        },
        metadata: {
          declarationRisk: {
            reason: '123',
            type: '123',
            declarationForm: '123',
          },
        },
      }
      const result = isCompletedDeclarationRisk(params)
      expect(result).toBeTruthy()
    })
  })

  describe('isCompleteAgentCheck', () => {
    it('should return true', () => {
      const mockIdentityCheck = {
        id: 'BED16000182',
        created: '2019-04-18T06:56:07.0000000Z',
        title: 'Ms',
        forename: 'Cerys',
        surname: 'Haldane',
        active: true,
        marketingConsent: 'notAsked',
        source: {
          id: '',
          type: '',
        },
        homePhone: '01632 963892',
        workPhone: '020 7946 3892',
        mobilePhone: '07700 903892',
        email: 'chaldane836@rpsfiction.net',
        primaryAddress: {
          type: 'primary',
          buildingName: '',
          buildingNumber: '102',
          line1: 'Holwelbury Road',
          line2: '',
          line3: '',
          line4: '',
          postcode: 'SG5 3FL',
          countryId: '',
        },
        officeIds: ['BED'],
        negotiatorIds: ['JWB'],
        _links: {
          self: {
            href: '/contacts/BED16000182',
          },
          documents: {
            href: '/documents/?OwnerType=contact&OwnerId=BED16000182',
          },
          identityChecks: {
            href: '/identityChecks/?ContactId=BED16000182',
          },
        },
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
})
