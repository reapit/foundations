import { mockMemberModel } from '../../../../../tests/__stubs__/members'

export const mockSettingsState = {
  settingsDataState: {
    currentMember: mockMemberModel,
  },
  settingsRefreshCurrentMember: jest.fn(),
}

export const useSettingsState = jest.fn(() => mockSettingsState)
