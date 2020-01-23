import {
  setDeveloperAppModalStateViewDetail,
  setDeveloperAppModalStateEditDetail,
  setDeveloperAppModalStateDelete,
  developerAppShowModal
} from '../developer-app-modal'
import ActionTypes from '@/constants/action-types'

describe('developer app modal actions', () => {
  it('should create a setDeveloperAppModalStateViewDetail action', () => {
    expect(setDeveloperAppModalStateViewDetail.type).toEqual(ActionTypes.SET_DEVELOPER_APP_MODAL_STATE_VIEW_DETAIL)
  })

  it('should create a setDeveloperAppModalStateEditDetail action', () => {
    expect(setDeveloperAppModalStateEditDetail.type).toEqual(ActionTypes.SET_DEVELOPER_APP_MODAL_STATE_EDIT_DETAIL)
  })

  it('should create a setDeveloperAppModalStateDelete action', () => {
    expect(setDeveloperAppModalStateDelete.type).toEqual(ActionTypes.SET_DEVELOPER_APP_MODAL_STATE_DELETE)
  })

  it('should create a developerAppShowModal action', () => {
    expect(developerAppShowModal.type).toEqual(ActionTypes.DEVELOPER_SHOW_MODAL)
  })
})
