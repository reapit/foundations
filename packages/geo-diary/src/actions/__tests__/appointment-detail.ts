import {
  appointmentDetailRequestData,
  appointmentDetailRequestDataFailure,
  appointmentDetailLoading,
  appointmentDetailReceiveData,
  appointmentDetailShowModal,
  appointmentDetailHideModal,
  showHideConfirmModal,
  cancelAppointment,
  showConfirmModalSubmitting,
} from '../appointment-detail'
import ActionTypes from '../../constants/action-types'
import { appointmentDataStub } from '../../sagas/__stubs__/appointment'

describe('appointment-detail actions', () => {
  it('should create a appointmentDetailRequestData action', () => {
    expect(appointmentDetailRequestData.type).toEqual(ActionTypes.APPOINTMENT_DETAIL_REQUEST_DATA)
    expect(appointmentDetailRequestData({ id: '1' }).data).toEqual({ id: '1' })
  })
  it('should create a appointmentDetailRequestDataFailure action', () => {
    expect(appointmentDetailRequestDataFailure.type).toEqual(ActionTypes.APPOINTMENT_DETAIL_REQUEST_FAILURE)
    expect(appointmentDetailRequestDataFailure().data).toEqual(undefined)
  })

  it('should create a appointmentDetailLoading action', () => {
    expect(appointmentDetailLoading.type).toEqual(ActionTypes.APPOINTMENT_DETAIL_LOADING)
    expect(appointmentDetailLoading(true).data).toEqual(true)
  })

  it('should create a appointmentDetailReceiveData action', () => {
    expect(appointmentDetailReceiveData.type).toEqual(ActionTypes.APPOINTMENT_DETAIL_RECEIVE_DATA)
    expect(appointmentDetailReceiveData(appointmentDataStub).data).toEqual(appointmentDataStub)
  })

  it('should create a appointmentDetailShowModal action', () => {
    expect(appointmentDetailShowModal.type).toEqual(ActionTypes.APPOINTMENT_DETAIL_SHOW_MODAL)
    expect(appointmentDetailShowModal().data).toEqual(undefined)
  })

  it('should create a appointmentDetailHideModal action', () => {
    expect(appointmentDetailHideModal.type).toEqual(ActionTypes.APPOINTMENT_DETAIL_HIDE_MODAL)
    expect(appointmentDetailHideModal().data).toEqual(undefined)
  })

  it('should create a showHideConfirmModal action', () => {
    expect(showHideConfirmModal.type).toEqual(ActionTypes.SHOW_HIDE_CONFIRM_MODAL)
    expect(showHideConfirmModal(true).data).toEqual(true)
  })

  it('should create a confirmCancel action', () => {
    expect(cancelAppointment.type).toEqual(ActionTypes.CANCEL_APPOINTMENT)
    expect(cancelAppointment().data).toEqual(undefined)
  })

  it('should create a showConfirmModalSubmitting action', () => {
    expect(showConfirmModalSubmitting.type).toEqual(ActionTypes.SHOW_CONFIRM_MODAL_SUBMITTING)
    expect(showConfirmModalSubmitting(true).data).toEqual(true)
  })
})
