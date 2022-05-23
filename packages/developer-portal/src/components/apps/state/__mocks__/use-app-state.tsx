import { defaultAppTabsState as mockAppTabsSate, defaultAppWizardState as mockAppWizardState } from '../defaults'
import { defaultValues as mockAppEditForm } from '../../edit/form-schema/form-fields'
import { mockAppDetailModel, mockAppSummaryModelPagedResult } from '../../../../tests/__stubs__/apps'
import { mockPipelineModelInterface } from '../../../../tests/__stubs__/pipeline'

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
    appsSetPageNumber: jest.fn(),
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
  appPipelineState: {
    appPipeline: mockPipelineModelInterface,
    appPipelineLoading: false,
    appPipelineDeploying: false,
    appPipelineSaving: false,
    appPipelineRefresh: jest.fn(),
    setAppPipeline: jest.fn(),
    setAppPipelineSaving: jest.fn(),
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
