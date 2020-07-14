import routeDispatcher from '../route-dispatcher'
import store from '../../core/store'
import Routes from '../../constants/routes'
import { RouteValue } from '../../types/core'
import { adminApprovalsRequestData } from '@/actions/admin-approvals'

jest.mock('@reapit/elements')
jest.mock('@/utils/session')
jest.mock('../../core/store')

describe('routeDispatcher', () => {
  it('should dispatch to adminApprovalsRequestData for the admin approvals data route', async () => {
    await routeDispatcher(Routes.ADMIN_APPROVALS as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(adminApprovalsRequestData(1))
  })
})
