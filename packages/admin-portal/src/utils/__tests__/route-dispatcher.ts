import routeDispatcher from '../route-dispatcher'
import store from '../../core/store'
import Routes from '../../constants/routes'
import { RouteValue } from '../../types/core'
import { fetchApprovalList } from '@/actions/approvals'

jest.mock('uuid', () => ({
  v4: jest.fn(),
}))

jest.mock('@reapit/elements')
jest.mock('../../core/store')

describe('routeDispatcher', () => {
  it('should dispatch to fetchApprovalList for the admin approvals data route', async () => {
    await routeDispatcher(Routes.APPROVALS as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(fetchApprovalList(1))
  })
})
