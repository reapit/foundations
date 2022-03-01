import { defaultAppTabsState as mockAppTabsSate, defaultAppWizardState as mockAppWizardState } from '../defaults'
import { appsDataStub as mockApps } from '../../../../../sagas/__stubs__/apps'
import { appDetailDataStub as mockApp } from '../../../../../sagas/__stubs__/app-detail'
import { defaultValues as mockAppEditForm } from '../../edit/form-schema/form-fields'

export const mockAppState = {
  appWizardState: {
    ...mockAppWizardState,
  },
  appsDataState: {
    apps: mockApps.data,
    appsLoading: false,
    appDetail: mockApp.data,
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
