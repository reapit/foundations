import routeDispatcher from '../route-dispatcher'
import store from '../../core/store'
import Routes from '../../constants/routes'
import { RouteValue } from '../../types/core'
import { approvalsRequestData } from '@/actions/approvals'

jest.mock('@reapit/elements')
jest.mock('@/utils/session')
jest.mock('../../core/store')

describe('routeDispatcher', () => {
  it('should dispatch to approvalsRequestData for the admin approvals data route', async () => {
    await routeDispatcher(Routes.APPROVALS as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(approvalsRequestData(1))
  })
})
