import React from 'react'
import { Control, DeepMap, FieldError, UseFormGetValues } from 'react-hook-form'
import { render } from '../../../../tests/react-testing'
import { AppListingTab } from '../app-listing-tab'
import { AppEditFormSchema } from '../form-schema/form-fields'

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'MOCK_UUID'),
}))
jest.mock('../../state/use-app-state')
jest.mock('react-hook-form', () => ({
  Controller: ({ children }) => <div>{children}</div>,
  useWatch: jest.fn(),
}))
jest.mock('@reapit/use-reapit-data', () => ({
  ...jest.requireActual('@reapit/use-reapit-data'),
  useReapitGet: jest.fn(() => [{ data: [{ name: 'MOCK_DESCRIPTION', id: 'MOCK_ID' }] }]),
  useReapitUpdate: jest.fn(() => [undefined, undefined, jest.fn()]),
  UpdateReturnTypeEnum: {
    RESPONSE: 'RESPONSE',
  },
  ImageCropperFileInput: () => <div></div>,
}))

describe('AppListingTab', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <AppListingTab
          register={(name: string) => {
            const fields = {
              supportEmail: { value: 'Mock field value' },
              telephone: { value: 'Mock field value' },
              homePage: { value: 'Mock field value' },
              launchUri: { value: 'Mock field value' },
              termsAndConditionsUrl: { value: 'Mock field value' },
              privacyPolicyUrl: { value: 'Mock field value' },
              pricingUrl: { value: 'Mock field value' },
              isFree: { value: 'Mock field value' },
              categoryIds: { value: 'Mock field value' },
              summary: { value: 'Mock field value' },
              description: { value: 'Mock field value' },
              iconImageUrl: { value: '' },
              screen1ImageUrl: { value: '' },
              screen2ImageUrl: { value: '' },
              screen3ImageUrl: { value: '' },
              screen4ImageUrl: { value: '' },
              screen5ImageUrl: { value: '' },
            }
            return fields[name]
          }}
          errors={{}}
          control={{} as Control<AppEditFormSchema, object>}
          getValues={
            jest.fn(() => ({
              iconImageUrl: '',
              screen1ImageUrl: '',
              screen2ImageUrl: '',
              screen3ImageUrl: '',
              screen4ImageUrl: '',
              screen5ImageUrl: '',
            })) as unknown as UseFormGetValues<AppEditFormSchema>
          }
        />,
      ),
    ).toMatchSnapshot()
  })

  it('should match a snapshot with errors and messages', () => {
    expect(
      render(
        <AppListingTab
          register={jest.fn()}
          errors={
            {
              supportEmail: { message: 'An Error' },
              telephone: { message: 'An Error' },
              homePage: { message: 'An Error' },
              launchUri: { message: 'An Error' },
              termsAndConditionsUrl: { message: 'An Error' },
              privacyPolicyUrl: { message: 'An Error' },
              pricingUrl: { message: 'An Error' },
              isFree: { message: 'An Error' },
              categoryIds: { message: 'An Error' },
              summary: { message: 'An Error' },
              description: { message: 'An Error' },
              iconImageUrl: { message: 'An Error' },
              screen1ImageUrl: { message: 'An Error' },
              screen2ImageUrl: { message: 'An Error' },
              screen3ImageUrl: { message: 'An Error' },
              screen4ImageUrl: { message: 'An Error' },
              screen5ImageUrl: { message: 'An Error' },
            } as DeepMap<Partial<AppEditFormSchema>, FieldError>
          }
          control={{} as Control<AppEditFormSchema, object>}
          getValues={
            jest.fn(() => ({
              iconImageUrl: '',
              screen1ImageUrl: '',
              screen2ImageUrl: '',
              screen3ImageUrl: '',
              screen4ImageUrl: '',
              screen5ImageUrl: '',
            })) as unknown as UseFormGetValues<AppEditFormSchema>
          }
        />,
      ),
    ).toMatchSnapshot()
  })
})
