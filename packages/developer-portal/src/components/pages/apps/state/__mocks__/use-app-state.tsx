import { defaultAppTabsState as mockAppTabsSate, defaultAppWizardState as mockAppWizardState } from '../defaults'
import { defaultValues as mockAppEditForm } from '../../edit/form-schema/form-fields'
import { mockAppDetailModel, mockAppSummaryModelPagedResult } from '../../../../../tests/__stubs__/apps'

export const mockAppState = {
  appWizardState: {
    ...mockAppWizardState,
  },
  appsDataState: {
    apps: mockAppSummaryModelPagedResult,
    appsLoading: false,
    appsRefreshing: false,
    appDetail: mockAppDetailModel,
    appDetailLoading: false,
    appDetailRefreshing: false,
    appRevisions: mockAppSummaryModelPagedResult,
    appRevisionsLoading: false,
    appRevisionsRefreshing: false,
    appsRefresh: jest.fn(),
    appsDetailRefresh: jest.fn(),
    appRefreshRevisions: jest.fn(),
  },
  appEditState: {
    appEditForm: mockAppEditForm,
    setAppEditForm: jest.fn(),
    appEditSaving: false,
    setAppEditSaving: jest.fn(),
    appUnsavedFields: {},
    setAppUnsavedFields: jest.fn(),
    appIncompleteFields: [],
    setIncompleteFields: jest.fn(),
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
