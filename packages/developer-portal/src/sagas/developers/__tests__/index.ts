import membersSagas from '../members'
import { all, fork } from 'redux-saga/effects'
import developersSagas from '../index'

describe('developersSagas', () => {
  it('should listen saga', () => {
    const gen = developersSagas()
    expect(gen.next().value).toEqual(all([fork(membersSagas)]))
    expect(gen.next().done).toBe(true)
  })
})
