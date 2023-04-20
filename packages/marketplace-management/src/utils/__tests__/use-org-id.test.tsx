import React, { ChangeEvent, PropsWithChildren } from 'react'
import { OrgIdStateProvider, UseOrgIdState, useOrgId, handleFetchInitialState } from '../use-org-id'
import { renderHook, act } from '@testing-library/react-hooks'
import { render } from '@testing-library/react'
import { getUserInfo } from '../../services/user'
import { mockUserInfo } from '../../services/__stubs__/users'

jest.mock('../../services/user', () => ({
  getUserInfo: jest.fn(),
}))

const mockGetUserInfo = getUserInfo as jest.Mock

describe('useOrgId', () => {
  it('should return UseOrgIdState', async () => {
    const { result } = renderHook<{}, UseOrgIdState>(() => useOrgId(), {
      wrapper: (props: PropsWithChildren) => <OrgIdStateProvider>{props.children}</OrgIdStateProvider>,
    })

    expect(result.current.orgIdState).toEqual({
      orgId: null,
      orgName: null,
      orgClientId: null,
      orgIdOptions: [],
      orgMembers: [],
    })

    act(() => {
      result.current.setOrgIdState({
        preventDefault: jest.fn(),
        stopPropagation: jest.fn(),
        target: {
          value: 'ORG_ID',
        },
      } as unknown as ChangeEvent<HTMLSelectElement>)
    })

    expect(result.current.orgIdState).toEqual({
      orgId: 'ORG_ID',
      orgName: null,
      orgClientId: null,
      orgIdOptions: [],
      orgMembers: [],
    })
  })
})

describe('OrgIdStateProvider', () => {
  it('should match snapshot', () => {
    expect(render(<OrgIdStateProvider />)).toMatchSnapshot()
  })
})

describe('handleFetchInitialState', () => {
  it('should fetch and filter initial state', async () => {
    const setOrgIdState = jest.fn()
    const orgIdState = {
      orgId: null,
      orgName: null,
      orgClientId: null,
      orgIdOptions: [],
      orgMembers: [],
    }
    const email = 'wmcvay@reapit.com'

    mockGetUserInfo.mockReturnValue(mockUserInfo)

    const curried = handleFetchInitialState(setOrgIdState, orgIdState, email)

    await curried()

    expect(mockGetUserInfo).toHaveBeenCalledWith(email)
    expect(setOrgIdState).toHaveBeenCalledWith({
      orgClientId: null,
      orgId: null,
      orgIdOptions: [
        {
          name: 'Reapit Ltd',
          value: '1185e436-3b7e-4f67-a4b7-68f83054ad3c',
        },
        {
          name: 'Reapit Sales',
          value: '201a8d35-f682-41a8-95ed-079133e4b517',
        },
      ],
      orgMembers: mockUserInfo.organisationGroupMembers,
      orgName: null,
    })
  })
})
