import {
  isCompletedAddress,
  isCompletedDeclarationRisk,
  isCompletedPrimaryID,
  isCompletedProfile,
  isCompletedSecondaryID
} from '../completed-sections'

describe('completed-sections', () => {
  it('isCompletedProfile', () => {
    ;[
      [
        {
          title: 'Mr',
          surname: 'A',
          forename: 'B',
          dateOfBirth: '04/04/1996',
          communications: [{ label: 'Mobile', value: '0123456789' }]
        },
        true
      ],
      [
        {
          title: 'Mr',
          forename: 'B',
          communications: [{ label: 'Mobile', value: '0123456789' }]
        },
        false
      ]
    ].forEach(([params, expected]) => {
      const result = isCompletedProfile(params)
      expect(result).toBe(expected)
    })
  })

  it('isCompletedPrimaryID', () => {
    ;[
      [
        {
          metadata: {
            primaryId: [
              {
                documents: [
                  {
                    typeId: 'PP',
                    details: '123456789',
                    expiry: '20/12/2021',
                    fileUrl: 'Test'
                  }
                ]
              }
            ]
          }
        },
        true
      ],
      [
        {
          metadata: {}
        },
        false
      ],
      [
        {
          metadata: {
            primaryId: [
              {
                documents: [
                  {
                    typeId: 'PP',
                    expiry: '20/12/2021',
                    fileUrl: 'Test'
                  }
                ]
              }
            ]
          }
        },
        false
      ]
    ].forEach(([params, expected]) => {
      const result = isCompletedPrimaryID(params)
      expect(result).toBe(expected)
    })
  })

  it('isCompletedSecondaryID', () => {
    ;[
      [
        {
          metadata: {
            secondaryId: [
              {
                documents: [
                  {
                    typeId: 'PP',
                    details: '123456789',
                    expiry: '20/12/2021',
                    fileUrl: 'Test'
                  }
                ]
              }
            ]
          }
        },
        true
      ],
      [
        {
          metadata: {}
        },
        false
      ],
      [
        {
          metadata: {
            secondaryId: [
              {
                documents: [
                  {
                    typeId: 'PP',
                    expiry: '20/12/2021',
                    fileUrl: 'Test'
                  }
                ]
              }
            ]
          }
        },
        false
      ]
    ].forEach(([params, expected]) => {
      const result = isCompletedSecondaryID(params)
      expect(result).toBe(expected)
    })
  })

  it('isCompletedAddress', () => {
    ;[
      [
        {
          addresses: [
            {
              line1: 'A',
              line3: 'B',
              postcode: '700000'
            }
          ],
          metadata: {
            addresses: [
              {
                year: '2018',
                month: '12',
                documentImage: 'Test'
              }
            ]
          }
        },
        true
      ],
      [
        {
          addresses: [
            {
              line1: 'A',
              line3: 'B',
              postcode: '700000'
            }
          ],
          metadata: {}
        },
        false
      ]
    ].forEach(([params, expected]) => {
      const result = isCompletedAddress(params)
      expect(result).toBe(expected)
    })
  })

  it('isCompletedDeclarationRisk', () => {
    ;[
      [
        {
          metadata: {
            declarationRisk: {
              reason: 'test',
              type: 'test',
              declarationForm: 'Test'
            }
          }
        },
        true
      ],
      [
        {
          metadata: {
            declarationRisk: {
              type: 'test'
            }
          }
        },
        false
      ]
    ].forEach(([params, expected]) => {
      const result = isCompletedDeclarationRisk(params)
      expect(result).toBe(expected)
    })
  })
})
