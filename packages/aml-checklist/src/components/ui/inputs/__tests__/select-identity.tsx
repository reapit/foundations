import { mapStateToProps, generateListIdentity } from '../select-identity'
import { identityTypes } from '@/sagas/__stubs__/identity-types'
import { ReduxState } from '@/types/core'

describe('Select identity', () => {
  describe('generateListIdentity', () => {
    it('should run correctly', () => {
      const identityTypes = []
      const fn = generateListIdentity(identityTypes)()
      expect(fn).toEqual([])
    })
  })

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      // @ts-ignore: only pick necessary props
      const mockState = {
        identityTypes: {
          loading: false,
          identityTypes: identityTypes,
        },
      } as ReduxState
      const result = mapStateToProps(mockState)
      expect(result).toEqual({
        identityState: {
          loading: false,
          identityTypes: identityTypes,
        },
      })
    })
  })
})
