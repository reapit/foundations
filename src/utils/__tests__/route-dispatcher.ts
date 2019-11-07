import routeDispatcher from '../route-dispatcher'
import store from '../../core/store'
import Routes from '../../constants/routes'
import { RouteValue } from '../../types/core'
import { checklistDetailRequestData } from '@/actions/checklist-detail'

jest.mock('../../core/store')

describe('routeDispatcher', () => {
  it('should dispatch to checkListDetail for the home route', async () => {
    await routeDispatcher(Routes.CHECKLIST_DETAIL as RouteValue, { id: '1' })
    expect(store.dispatch).toHaveBeenCalledWith(checklistDetailRequestData('1'))
  })
})
