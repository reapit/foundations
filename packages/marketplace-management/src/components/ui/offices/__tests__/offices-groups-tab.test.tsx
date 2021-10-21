import * as React from 'react'
import { shallow } from 'enzyme'
import OfficesGroupsTab, {
  getOfficeQueryFromGroups,
  mergeOfficesGroups,
  onPageChangeHandler,
} from '../offices-groups-tab'
import { createBrowserHistory } from 'history'
import Routes from '@/constants/routes'
import { data as officeGroupsStub } from '../__stubs__/office-groups'
import { data as officesStub } from '../__stubs__/offices'
import { OfficeGroupModel } from '../../../../types/organisations-schema'
import { OfficeModel } from '@reapit/foundations-ts-definitions'

jest.mock('../../../../core/connect-session')
jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Object),
  useLocation: jest.fn(() => ({ pathname: '/offices/groups' })),
}))

jest.mock('swr', () =>
  jest.fn(() => ({
    data: require('../__stubs__/office-groups').data,
    mutate: jest.fn,
  })),
)

jest.mock('../../../../utils/use-org-id', () => ({
  useOrgId: () => ({
    orgIdState: {
      orgId: 'SOME_ID',
      orgName: 'SOME_NAME',
      orgClientId: 'SOME_CLIENT_ID',
    },
  }),
}))

describe('OfficesGroupsTab', () => {
  it('should match a snapshot', () => {
    expect(shallow(<OfficesGroupsTab />)).toMatchSnapshot()
  })
})

describe('mergeOfficesGroups', () => {
  it('should merge office groups with offices', () => {
    const officeGroupModels = (officeGroupsStub._embedded ?? []) as OfficeGroupModel[]
    const result = mergeOfficesGroups(officesStub._embedded as OfficeModel[], officeGroupModels)
    const expected = [
      {
        ...officeGroupModels[0],
        offices: officesStub._embedded,
      },
    ]
    expect(result).toEqual(expected)
  })
})

describe('getOfficeQueryFromGroups', () => {
  it('should get an office query from office groups', () => {
    const result = getOfficeQueryFromGroups(officeGroupsStub._embedded)
    const expected = '?id=SOME_ID&id=ANOTHER_ID'
    expect(result).toEqual(expected)
  })
})

describe('onPageChangeHandler', () => {
  it('should return a function when executing', () => {
    const history = createBrowserHistory()
    jest.spyOn(history, 'push')
    const onPageChangeHandlerFn = onPageChangeHandler(history)
    expect(onPageChangeHandlerFn).toBeDefined()

    onPageChangeHandlerFn(2)
    expect(history.push).toHaveBeenCalledWith(`${Routes.OFFICES_GROUPS}?pageNumber=2`)
  })
})
