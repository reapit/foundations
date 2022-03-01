import { defaultAppTabsState as mockAppTabsSate, defaultAppWizardState as mockAppWizardState } from '../defaults'
import { defaultValues as mockAppEditForm } from '../../edit/form-schema/form-fields'
import { mockAppDetailModel, mockAppSummaryModelPagedResult } from '../../../../../tests/__stubs__/apps'

export const mockAppState = {
  appWizardState: {
    ...mockAppWizardState,
  },
  appsDataState: {
    apps: mockAppSummaryModelPagedResult.data,
    appsLoading: false,
    appDetail: mockAppDetailModel,
    appDetailLoading: false,
    appsRefresh: jest.fn(),
  },
  appEditState: {
    appEditForm: mockAppEditForm,
    setAppEditForm: jest.fn(),
    appEditSaving: false,
    setAppEditSaving: jest.fn(),
  },
  setAppWizardState: jest.fn(),
  appId: 'SOME_APP_ID',
  setAppId: jest.fn(),
  appTabsState: {
    ...mockAppTabsSate,
  },
  setAppTabsState: jest.fn(),
}

export const useAppState = jest.fn(() => mockAppState)
