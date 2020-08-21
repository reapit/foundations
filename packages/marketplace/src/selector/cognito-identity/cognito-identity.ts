import { ReduxState } from '@/types/core'

export const selectUpdatePasswordLoading = (state: ReduxState): boolean => {
  return state?.cognitoIdentity?.updatePassword?.loading || false
}
