import { ActionType } from '@/types/core'
import ActionTypes from '@/constants/action-types'
import { appointmentDetailReducer, defaultState, AppointmentDetailState } from '../appointment-detail'
import { appointmentDataStub } from '../../sagas/__stubs__/appointment'

describe('appointmentDetail reducer', () => {
  it('should return default state if action not matched', () => {
    const newState = appointmentDetailReducer(undefined, { type: 'UNKNOWN' as ActionType, data: undefined })
    expect(newState).toEqual(defaultState)
  })

  it('should return appointmentDetail if action APPOINTMENT_DETAIL_RECEIVE_DATA called', () => {
    const newState = appointmentDetailReducer(undefined, {
      type: ActionTypes.APPOINTMENT_DETAIL_RECEIVE_DATA as ActionType,
      data: appointmentDataStub
    })
    const expected = {
      appointmentDetail: appointmentDataStub,
      isModalVisible: false,
      loading: false,
      confirmModal: {
        isConfirmContentVisible: false,
        isSubmitting: false
      }
    }
    expect(newState).toEqual(expected)
  })

  it('should return loading false if action APPOINTMENT_DETAIL_REQUEST_FAILURE called', () => {
    const newState = appointmentDetailReducer(undefined, {
      type: ActionTypes.APPOINTMENT_DETAIL_REQUEST_FAILURE as ActionType,
      data: undefined
    })
    const expected = {
      appointmentDetail: null,
      isModalVisible: false,
      loading: false,
      confirmModal: {
        isConfirmContentVisible: false,
        isSubmitting: false
      }
    }
    expect(newState).toEqual(expected)
  })

  it('should return loading true if action APPOINTMENT_DETAIL_LOADING called', () => {
    const newState = appointmentDetailReducer(undefined, {
      type: ActionTypes.APPOINTMENT_DETAIL_LOADING as ActionType,
      data: true
    })
    const expected = {
      appointmentDetail: null,
      isModalVisible: false,
      loading: true,
      confirmModal: {
        isConfirmContentVisible: false,
        isSubmitting: false
      }
    }
    expect(newState).toEqual(expected)
  })
  it('should return isModalVisible true if action APPOINTMENT_DETAIL_SHOW_MODAL called', () => {
    const newState = appointmentDetailReducer(undefined, {
      type: ActionTypes.APPOINTMENT_DETAIL_SHOW_MODAL as ActionType,
      data: undefined
    })
    const expected = {
      appointmentDetail: null,
      loading: false,
      isModalVisible: true,
      confirmModal: {
        isConfirmContentVisible: false,
        isSubmitting: false
      }
    }
    expect(newState).toEqual(expected)
  })
  it('should return isModalVisible false if action APPOINTMENT_DETAIL_HIDE_MODAL called', () => {
    const newState = appointmentDetailReducer(undefined, {
      type: ActionTypes.APPOINTMENT_DETAIL_HIDE_MODAL as ActionType,
      data: undefined
    })
    const expected = {
      appointmentDetail: null,
      loading: false,
      isModalVisible: false,
      confirmModal: {
        isConfirmContentVisible: false,
        isSubmitting: false
      }
    }
    expect(newState).toEqual(expected)
  })
  it('should return isModalVisible false if action APPOINTMENT_DETAIL_HIDE_MODAL called', () => {
    const newState = appointmentDetailReducer(undefined, {
      type: ActionTypes.SHOW_HIDE_CONFIRM_MODAL as ActionType,
      data: true
    })
    const expected = {
      appointmentDetail: null,
      loading: false,
      isModalVisible: false,
      confirmModal: {
        isSubmitting: false,
        isConfirmContentVisible: true
      }
    } as AppointmentDetailState
    expect(newState).toEqual(expected)
  })

  it('should return isModalVisible false if action SHOW_CONFIRM_MODAL_SUBMITTING called', () => {
    const newState = appointmentDetailReducer(undefined, {
      type: ActionTypes.SHOW_CONFIRM_MODAL_SUBMITTING as ActionType,
      data: true
    })
    const expected = {
      appointmentDetail: null,
      loading: false,
      isModalVisible: false,
      confirmModal: {
        isConfirmContentVisible: false,
        isSubmitting: true
      }
    } as AppointmentDetailState
    expect(newState).toEqual(expected)
  })
})
