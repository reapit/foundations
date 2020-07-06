import {
  setAppDetailModalStateBrowse,
  setAppDetailModalStateInstall,
  setAppDetailModalStateSuccess,
} from '../app-detail-modal'

import ActionTypes from '../../constants/action-types'

describe('app permission actions', () => {
  it('should create a setAppDetailModalStateBrowse action', () => {
    expect(setAppDetailModalStateBrowse.type).toEqual(ActionTypes.SET_APP_DETAIL_MODAL_STATE_BROWSE)
  })

  it('should create a setAppDetailModalStateInstall action', () => {
    expect(setAppDetailModalStateInstall.type).toEqual(ActionTypes.SET_APP_DETAIL_MODAL_STATE_INSTALL)
  })

  it('should create a setAppDetailModalStateSuccess action', () => {
    expect(setAppDetailModalStateSuccess.type).toEqual(ActionTypes.SET_APP_DETAIL_MODAL_STATE_SUCCESS)
  })
})
