import { appPermissionStub } from '@/sagas/__stubs__/app-permission'
import { ReduxState } from '@/types/core'
import { mapStateToProps } from '../app-permission-async-container'

describe('DetailAsyncContainer', () => {
  describe('mapStateToProps', () => {
    it('should return correct data', () => {
      const input = {
        appPermission: {
          loading: true,
          error: false,
          appPermissionData: appPermissionStub
        }
      } as any
      const expected = {
        loading: true,
        error: false,
        data: appPermissionStub
      }
      const result = mapStateToProps(input)
      expect(result).toEqual(expected)
    })
    it('should return correct data when appPermission {}', () => {
      const input = {
        appPermission: {}
      } as ReduxState
      const expected = {
        loading: undefined,
        error: undefined,
        appDetailData: undefined
      }
      const result = mapStateToProps(input)
      expect(result).toEqual(expected)
    })
  })
})
