import { reducer, initialState, Action } from '../reducers'

describe('reducer', () => {
  test('should handle START_UPLOAD', () => {
    const startAction: Action = {
      type: 'START_UPLOAD',
      payload: { totalItem: 10 },
    }
    expect(reducer(initialState, startAction).status).toEqual('UPLOADING')
    expect(reducer(initialState, startAction).totalItem).toEqual(10)
  })

  test('should handle UPLOAD_PROGRESS', () => {
    const startAction: Action = {
      type: 'UPLOAD_PROGRESS',
      payload: { completedItem: 10 },
    }
    expect(reducer(initialState, startAction).completedItem).toEqual(10)
  })

  test('should handle FINISH_UPLOAD', () => {
    const startAction: Action = {
      type: 'FINISH_UPLOAD',
    }
    expect(reducer(initialState, startAction).status).toEqual('UPLOADED')
  })

  test('should handle RESET_STATE', () => {
    const startAction: Action = {
      type: 'RESET_STATE',
    }
    expect(reducer(initialState, startAction)).toEqual(initialState)
  })
})
