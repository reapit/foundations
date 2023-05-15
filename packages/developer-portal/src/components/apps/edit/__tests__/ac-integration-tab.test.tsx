import React from 'react'
import { Control, DeepMap, FieldError } from 'react-hook-form'
import { useReapitGet } from '@reapit/use-reapit-data'
import { render } from '../../../../tests/react-testing'
import { AcIntegrationTab } from '../ac-integration-tab'
import { AppEditFormSchema } from '../form-schema/form-fields'

jest.mock('../../state/use-app-state')
jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [{ data: [{ name: 'MOCK_NAME', id: 'MOCK_ID' }] }]),
}))
jest.mock('react-hook-form', () => ({
  useWatch: jest.fn(() => []),
}))

const mockUseReapitGet = useReapitGet as jest.Mock

describe('AcIntegrationTab', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <AcIntegrationTab
          register={jest.fn()}
          errors={
            { desktopIntegrationTypeIds: { message: 'An Error' } } as DeepMap<Partial<AppEditFormSchema>, FieldError>
          }
          control={{} as Control<AppEditFormSchema, object>}
          getValues={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot with no errors and empty types', () => {
    mockUseReapitGet.mockReturnValue([{ data: [] }])
    expect(
      render(
        <AcIntegrationTab
          register={jest.fn()}
          errors={{}}
          control={{} as Control<AppEditFormSchema, object>}
          getValues={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot when loading', () => {
    mockUseReapitGet.mockReturnValue([null, true])
    expect(
      render(
        <AcIntegrationTab
          register={jest.fn()}
          errors={{}}
          control={{} as Control<AppEditFormSchema, object>}
          getValues={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })
})
