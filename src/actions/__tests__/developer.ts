import {
  developerLoading,
  developerReceiveData,
  developerRequestData,
  developerClearData,
  developerCreate,
  developerSetFormState
} from '../developer'
import ActionTypes from '../../constants/action-types'
import { appsDataStub } from '../../sagas/__stubs__/apps'
import { CreateDeveloperModel } from '@reapit/foundations-ts-definitions'
import { appPermissionStub } from '@/sagas/__stubs__/app-permission'

describe('developer actions', () => {
  it('should create a developerLoading action', () => {
    expect(developerLoading.type).toEqual(ActionTypes.DEVELOPER_LOADING)
    expect(developerLoading(true).data).toEqual(true)
  })

  it('should create a developerReceiveData action', () => {
    expect(developerReceiveData.type).toEqual(ActionTypes.DEVELOPER_RECEIVE_DATA)
    expect(developerReceiveData({ ...appsDataStub, scopes: appPermissionStub }).data).toEqual({
      ...appsDataStub,
      scopes: appPermissionStub
    })
  })

  it('should create a developerRequestData action', () => {
    expect(developerRequestData.type).toEqual(ActionTypes.DEVELOPER_REQUEST_DATA)
    expect(developerRequestData(1).data).toEqual(1)
  })

  it('should create a developerClearData action', () => {
    expect(developerClearData.type).toEqual(ActionTypes.DEVELOPER_CLEAR_DATA)
    expect(developerClearData(null).data).toEqual(null)
  })

  it('should create a developerCreate action', () => {
    const newDeveloper: CreateDeveloperModel = {
      name: 'Bob',
      companyName: 'Acme',
      email: 'bob@acme.com',
      telephone: '0123456789'
    }
    expect(developerCreate.type).toEqual(ActionTypes.DEVELOPER_CREATE)
    expect(developerCreate(newDeveloper).data).toEqual(newDeveloper)
  })

  it('should create a developerSetFormState action', () => {
    expect(developerSetFormState.type).toEqual(ActionTypes.DEVELOPER_SET_FORM_STATE)
    expect(developerSetFormState('DONE').data).toEqual('DONE')
  })
})
