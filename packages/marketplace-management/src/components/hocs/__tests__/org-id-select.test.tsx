import React from 'react'
import { useOrgId } from '../../../utils/use-org-id'
import { render } from '@testing-library/react'
import { OrgIdSelect } from '../org-id-select'

const mockUseOrgId = useOrgId as jest.Mock

jest.mock('../../../utils/use-org-id')

describe('OrgIdSelect', () => {
  it('should match a snapshot', () => {
    expect(render(<OrgIdSelect />)).toMatchSnapshot()
  })

  it('should match a snapshot where orgIdOptions are less than 2', () => {
    mockUseOrgId.mockReturnValueOnce({ orgIdState: { orgIdOptions: [] } })
    expect(render(<OrgIdSelect />)).toMatchSnapshot()
  })
})
