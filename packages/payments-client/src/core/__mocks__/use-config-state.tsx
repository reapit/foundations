import { mockConfigModel } from '../../tests/__mocks__/config'

export const useConfigState = () => ({
  config: mockConfigModel,
  configLoading: false,
  refreshConfig: jest.fn(),
  clearConfigCache: jest.fn(),
})
