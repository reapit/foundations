import { mapStateToProps } from '../app-detail-async-container'
import { ReduxState } from '@/types/core'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'

describe('DetailAsyncContainer', () => {
  describe('mapStateToProps', () => {
    it('should return correct data', () => {
      const input = {
        appDetail: {
          loading: true,
          error: false,
          appDetailData: appDetailDataStub
        }
      } as ReduxState
      const expected = {
        loading: true,
        error: false,
        data: appDetailDataStub
      }
      const result = mapStateToProps(input)
      expect(result).toEqual(expected)
    })
    it('should return correct data when appDetail {}', () => {
      const input = {
        appDetail: {}
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
