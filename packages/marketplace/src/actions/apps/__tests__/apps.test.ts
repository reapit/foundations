import {
  fetchAppDetail,
  fetchAppDetailFailed,
  fetchAppDetailSuccess,
  fetchApps,
  fetchAppsFailed,
  fetchAppsInfiniteSuccess,
  fetchAppsSuccess,
  fetchFeatureApps,
  fetchFeatureAppsFailed,
  fetchFeatureAppsSuccess,
} from '../apps'
import ActionTypes from '@/constants/action-types'
import { appsDataStub } from '@/sagas/__stubs__/apps'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'

describe('apps', () => {
  describe('fetchApps', () => {
    it('should create a fetchApps action', () => {
      expect(fetchApps.type).toEqual(ActionTypes.FETCH_APPS)
      expect(fetchApps({ onlyInstalled: true }).data).toEqual({ onlyInstalled: true })
    })
  })
  describe('fetchAppsSuccess', () => {
    it('should create a fetchAppsSuccess action', () => {
      expect(fetchAppsSuccess.type).toEqual(ActionTypes.FETCH_APPS_SUCCESS)
      expect(fetchAppsSuccess(appsDataStub).data).toEqual(appsDataStub)
    })
  })

  describe('fetchAppsFailed', () => {
    it('should create a fetchAppsFailed action', () => {
      expect(fetchAppsFailed.type).toEqual(ActionTypes.FETCH_APPS_FAILED)
      expect(fetchAppsFailed('mockError').data).toEqual('mockError')
    })
  })
  describe('fetchFeatureApps', () => {
    it('should create a fetchFeatureApps action', () => {
      expect(fetchFeatureApps.type).toEqual(ActionTypes.FETCH_FEATURE_APPS)
      expect(fetchFeatureApps({ onlyInstalled: true }).data).toEqual({ onlyInstalled: true })
    })
  })
  describe('fetchFeatureAppsSuccess', () => {
    it('should create a fetchFeatureAppsSuccess action', () => {
      expect(fetchFeatureAppsSuccess.type).toEqual(ActionTypes.FETCH_FEATURE_APPS_SUCCESS)
      expect(fetchFeatureAppsSuccess(appsDataStub).data).toEqual(appsDataStub)
    })
  })
  describe('fetchAppsInfiniteSuccess', () => {
    it('should create a fetchAppsInfiniteSuccess action', () => {
      expect(fetchAppsInfiniteSuccess.type).toEqual(ActionTypes.FETCH_APPS_INFINITE_SUCCESS)
      expect(fetchAppsInfiniteSuccess(appsDataStub).data).toEqual(appsDataStub)
    })
  })

  describe('fetchFeatureAppsFailed', () => {
    it('should create a fetchFeatureAppsFailed action', () => {
      expect(fetchFeatureAppsFailed.type).toEqual(ActionTypes.FETCH_FEATURE_APPS_FAILED)
      expect(fetchFeatureAppsFailed('mockError').data).toEqual('mockError')
    })
  })

  describe('fetchAppDetail', () => {
    it('should create a fetchAppDetail action', () => {
      expect(fetchAppDetail.type).toEqual(ActionTypes.FETCH_APP_DETAIL)
      expect(fetchAppDetail({ id: '123' }).data).toEqual({ id: '123' })
    })
  })
  describe('fetchAppDetailSuccess', () => {
    it('should create a fetchAppDetailSuccess action', () => {
      expect(fetchAppDetailSuccess.type).toEqual(ActionTypes.FETCH_APP_DETAIL_SUCCESS)
      expect(fetchAppDetailSuccess(appDetailDataStub.data).data).toEqual(appDetailDataStub.data)
    })
  })

  describe('fetchAppDetailFailed', () => {
    it('should create a fetchAppDetailFailed action', () => {
      expect(fetchAppDetailFailed.type).toEqual(ActionTypes.FETCH_APP_DETAIL_FAILED)
      expect(fetchAppDetailFailed('mockError').data).toEqual('mockError')
    })
  })
})
