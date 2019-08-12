import { setAppDetailModalStateView, setAppDetailModalStatePermission } from '../app-detail-modal'

import ActionTypes from '../../constants/action-types'

describe('app permission actions', () => {
  it('should create a setAppDetailModalStateView action', () => {
    expect(setAppDetailModalStatePermission.type).toEqual(ActionTypes.SET_APP_DETAIL_MODAL_STATE_PERMISSION)
  })
  it('should create a setAppDetailModalStateView action', () => {
    expect(setAppDetailModalStateView.type).toEqual(ActionTypes.SET_APP_DETAIL_MODAL_STATE_VIEW)
  })
})
