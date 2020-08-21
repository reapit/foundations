import { combineReducers } from 'redux'
import { updatePasswordReducer, UpdatePasswordState } from './update-password'

export type CognitoIdentityRootState = {
  updatePassword: UpdatePasswordState
}

export default combineReducers<CognitoIdentityRootState>({
  updatePassword: updatePasswordReducer,
})
