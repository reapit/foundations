import { ReduxState } from '@/types/core'
import { selectUpdatePasswordLoading } from '../cognito-identity'
import appState from '@/reducers/__stubs__/app-state'

describe('settings selectors', () => {
  const mockState = {
    ...appState,
    cognitoIdentity: {
      updatePassword: {
        loading: false,
        errorMessage: '',
      },
    },
  } as ReduxState

  describe('selectUpdatePasswordLoading', () => {
    it('should run correctly', () => {
      const result = selectUpdatePasswordLoading(mockState)
      expect(result).toEqual(false)
    })

    it('return false when redux state is empty', () => {
      const input = {} as ReduxState
      const result = selectUpdatePasswordLoading(input)
      expect(result).toEqual(false)
    })
  })
})
