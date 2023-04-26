import React from 'react'
import { Control } from 'react-hook-form'
import { useReapitGet } from '@reapit/use-reapit-data'
import { render } from '../../../../tests/react-testing'
import { AppEditFormSchema } from '../form-schema/form-fields'
import { PermissionsTab } from '../permissions-tab'

jest.mock('../../state/use-app-state')
jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(),
}))
jest.mock('react-hook-form', () => ({
  useWatch: jest.fn(),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('PermissionsTab', () => {
  it('should match a snapshot', () => {
    mockUseReapitGet
      .mockReturnValueOnce([[{ description: 'MOCK_DESCRIPTION', id: 'MOCK_ID' }]])
      .mockReturnValueOnce([{ data: [{ name: 'MOCK_NAME', id: 'MOCK_ID' }] }])

    expect(
      render(
        <PermissionsTab
          register={jest.fn()}
          errors={{}}
          control={{} as Control<AppEditFormSchema, object>}
          getValues={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot when loading', () => {
    mockUseReapitGet.mockReturnValueOnce([null, true]).mockReturnValueOnce([null, true])

    expect(
      render(
        <PermissionsTab
          register={jest.fn()}
          errors={{}}
          control={{} as Control<AppEditFormSchema, object>}
          getValues={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })
})
