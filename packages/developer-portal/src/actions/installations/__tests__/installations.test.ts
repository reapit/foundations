import {
  fetchInstallationsList,
  fetchInstallationsListSuccess,
  fetchInstallationsListFailed,
  fetchInstallationsFilterList,
  fetchInstallationsFilterListSuccess,
  fetchInstallationsFilterListFailed,
  setInstallationsFormState,
  createInstallations,
  requestInstallationsTerminate,
} from '../installations'
import ActionTypes from '@/constants/action-types'

describe('installations', () => {
  describe('fetchInstallationsList', () => {
    it('should create a fetchInstallationsList action', () => {
      expect(fetchInstallationsList.type).toEqual(ActionTypes.FETCH_INSTALLATIONS_LIST)
    })
  })
  describe('fetchInstallationsListSuccess', () => {
    it('should create a fetchInstallationsListSuccess action', () => {
      expect(fetchInstallationsListSuccess.type).toEqual(ActionTypes.FETCH_INSTALLATIONS_LIST_SUCCESS)
    })
  })
  describe('fetchInstallationsListFailed', () => {
    it('should create a fetchInstallationsListFailed action', () => {
      expect(fetchInstallationsListFailed.type).toEqual(ActionTypes.FETCH_INSTALLATIONS_LIST_FAILED)
    })
  })
  describe('fetchInstallationsFilterList', () => {
    it('should create a fetchInstallationsFilterList action', () => {
      expect(fetchInstallationsFilterList.type).toEqual(ActionTypes.FETCH_INSTALLATIONS_FILTER_LIST)
    })
  })

  describe('fetchInstallationsFilterListSuccess', () => {
    it('should create a fetchInstallationsFilterListSuccess action', () => {
      expect(fetchInstallationsFilterListSuccess.type).toEqual(ActionTypes.FETCH_INSTALLATIONS_FILTER_LIST_SUCCESS)
    })
  })

  describe('fetchInstallationsFilterListFailed', () => {
    it('should create a fetchInstallationsFilterListFailed action', () => {
      expect(fetchInstallationsFilterListFailed.type).toEqual(ActionTypes.FETCH_INSTALLATIONS_FILTER_LIST_FAILED)
    })
  })

  describe('setInstallationsFormState', () => {
    it('should create a fetchInstallationsFilterListFailed action', () => {
      expect(setInstallationsFormState.type).toEqual(ActionTypes.SET_INSTALLATIONS_FORM_STATE)
    })
  })

  describe('createInstallations', () => {
    it('should create a createInstallations action', () => {
      expect(createInstallations.type).toEqual(ActionTypes.CREATE_INSTALLATIONS)
    })
  })

  describe('requestInstallationsTerminate', () => {
    it('should create a requestInstallationsTerminate action', () => {
      expect(requestInstallationsTerminate.type).toEqual(ActionTypes.REQUEST_INSTALLATIONS_TERMINATE)
    })
  })
})
