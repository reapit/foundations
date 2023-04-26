import React from 'react'
import OfficesTab, { onPageChangeHandler, onSearchHandler } from '../offices-tab'
import Routes from '@/constants/routes'
import { useOrgId } from '../../../../utils/use-org-id'
import { mockOfficeList } from '../../../../services/__stubs__/offices'
import { getOfficesService } from '../../../../services/office'
import { render } from '../../../../tests/react-testing'

jest.mock('react-router', () => ({
  ...(jest.requireActual('react-router') as Object),
  useLocation: jest.fn(() => ({ pathname: '/offices' })),
}))

jest.mock('../../../../services/office', () => ({ getOfficesService: jest.fn() }))
jest.mock('../../../../utils/use-org-id')

const mockGetOfficesService = getOfficesService as jest.Mock
const mockUseOrgId = useOrgId as jest.Mock

describe('OfficesTab', () => {
  it('should match a snapshot where there are offices', () => {
    mockGetOfficesService.mockReturnValueOnce(mockOfficeList)
    expect(render(<OfficesTab />)).toMatchSnapshot()
  })

  it('should match a snapshot where there are no offices', () => {
    expect(render(<OfficesTab />)).toMatchSnapshot()
  })

  it('should match a snapshot where there is no orgId', () => {
    mockUseOrgId.mockReturnValueOnce({ orgIdState: { orgId: null } })

    expect(render(<OfficesTab />)).toMatchSnapshot()
  })
})

describe('onPageChangeHandler', () => {
  it('should return a function when executing', () => {
    const navigate = jest.fn()
    const onPageChangeHandlerFn = onPageChangeHandler(navigate, { name: 'reapit' })
    expect(onPageChangeHandlerFn).toBeDefined()

    onPageChangeHandlerFn(2)
    expect(navigate).toHaveBeenLastCalledWith(`${Routes.OFFICES}?pageNumber=2&name=reapit`)
  })
})

describe('onSearchHandler', () => {
  const navigate = jest.fn()
  const fn = onSearchHandler(navigate)
  it('should setStatus when !query', () => {
    fn({ name: '' })
    expect(navigate).toHaveBeenCalledWith(`${Routes.OFFICES}`)
  })
  it('should push history when has query', () => {
    fn({ name: 'test' })
    expect(navigate).toHaveBeenCalledWith(`${Routes.OFFICES}?page=1&name=test`)
  })
})
