import { startUpload, setUploadProgress, completeUpload, resetState } from '../actions'

describe('Actions', () => {
  test('startUpload', () => {
    expect(startUpload(20).type).toEqual('START_UPLOAD')
  })
  test('setUploadProgress', () => {
    expect(setUploadProgress(20).type).toEqual('UPLOAD_PROGRESS')
  })
  test('completeUpload', () => {
    expect(completeUpload({ total: 0, success: 0, failed: 0, details: [] }).type).toEqual('FINISH_UPLOAD')
  })
  test('resetState', () => {
    expect(resetState().type).toEqual('RESET_STATE')
  })
})
