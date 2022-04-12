import React from 'react'
import { Control, DeepMap, FieldError } from 'react-hook-form'
import { useReapitGet } from '@reapit/utils-react'
import { render } from '../../../../tests/react-testing'
import { AcIntegrationTab } from '../ac-integration-tab'
import { AppEditTab } from '../edit-page-tabs'
import { AppEditFormSchema } from '../form-schema/form-fields'

jest.mock('../../state/use-app-state')
jest.mock('@reapit/utils-react', () => ({
  useReapitGet: jest.fn(() => [{ data: [{ name: 'MOCK_NAME', id: 'MOCK_ID' }] }]),
}))
jest.mock('react-hook-form', () => ({
  useWatch: jest.fn(),
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
          tab={AppEditTab.acIntegration}
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
          tab={AppEditTab.acIntegration}
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
          tab={AppEditTab.acIntegration}
          control={{} as Control<AppEditFormSchema, object>}
          getValues={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })
})
