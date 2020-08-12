import { selectCurrentMemberData, selectCurrentMemberIsLoading } from '../current-member'
import appState from '@/reducers/__stubs__/app-state'

describe('selectCurrentMemberIsLoading', () => {
  it('should run correctly', () => {
    expect(selectCurrentMemberIsLoading(appState)).toEqual(appState.currentMember.isLoading)
  })
})

describe('selectCurrentMemberData', () => {
  it('should', () => {
    expect(selectCurrentMemberData(appState)).toEqual(appState.currentMember.data)
  })
})
