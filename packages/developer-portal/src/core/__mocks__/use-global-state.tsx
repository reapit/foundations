import { mockDeveloperModel } from '../../tests/__stubs__/developers'
import { mockMemberModel } from '../../tests/__stubs__/members'

export const mockGlobalState = {
  globalDataState: {
    currentMember: mockMemberModel,
    currentDeveloper: mockDeveloperModel,
  },
  globalRefreshState: {
    members: [false, jest.fn()],
  },
  globalRefreshCurrentMember: jest.fn(),
  globalRefreshCurrentDeveloper: jest.fn(),
}

export const useGlobalState = jest.fn(() => mockGlobalState)
