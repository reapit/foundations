import { selectCurrentMemberData, selectCurrentMemberIsLoading, selectCurrentMemberIsUpdating } from '../current-member'
import appState from '@/reducers/__stubs__/app-state'

describe('selectCurrentMemberIsLoading', () => {
  it('should run correctly', () => {
    expect(selectCurrentMemberIsLoading(appState)).toEqual(appState.currentMember.isLoading)
  })
})

describe('selectCurrentMemberData', () => {
  it('should run correctly', () => {
    expect(selectCurrentMemberData(appState)).toEqual(appState.currentMember.data)
  })
})
describe('selectCurrentMemberData', () => {
  it('should run correctly', () => {
    expect(selectCurrentMemberIsUpdating(appState)).toEqual(appState.currentMember.update.isLoading)
  })
})
