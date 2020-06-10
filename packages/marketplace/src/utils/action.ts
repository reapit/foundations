import { authChangeLoginType } from '@/actions/auth'
import { Dispatch } from 'redux'

export const changeLoginTypeToDeveloper = (displatch: Dispatch) => {
  displatch(authChangeLoginType('DEVELOPER'))
}
