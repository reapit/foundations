import membersSagas from '../members'
import { all, fork } from 'redux-saga/effects'
import developersSagas from '../index'
import developerDetailsListSagas from '../developer-details'
import memberDetailsListSagas from '../member-details'

describe('developersSagas', () => {
  it('should listen saga', () => {
    const gen = developersSagas()
    expect(gen.next().value).toEqual(
      all([fork(membersSagas), fork(developerDetailsListSagas), fork(memberDetailsListSagas)]),
    )
    expect(gen.next().done).toBe(true)
  })
})
