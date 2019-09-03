import routeDispatcher from '../route-dispatcher'
import store from '../../core/store'
import Routes from '../../constants/routes'
import { RouteValue } from '../../types/core'
import { appointmentsRequestData } from '../../actions/appointments'
import { verifyAccessToken } from '@/utils/session'

jest.mock('../../core/store')
jest.mock('../../sagas/home')
jest.mock('@/utils/session')

describe('routeDispatcher', () => {
  it('should dispatch to AppointmentRequestParams for the home route', async () => {
    await routeDispatcher(Routes.HOME as RouteValue)
    expect(store.dispatch).toHaveBeenCalledWith(appointmentsRequestData({ time: 'Today' }))
  })
})
