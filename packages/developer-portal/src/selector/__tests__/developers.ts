import { selectOrganisationMembers, selectOrganisationMembersLoading } from '../developers'
import appState from '@/reducers/__stubs__/app-state'

describe('member selectors', () => {
  it('should return correct data', () => {
    const data = selectOrganisationMembers(appState)
    expect(data).toEqual([])
  })

  it('should return correct data', () => {
    const data = selectOrganisationMembersLoading(appState)
    expect(data).toEqual(false)
  })
})
