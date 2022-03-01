import React from 'react'
import { Control } from 'react-hook-form'
import { render } from '../../../../../tests/react-testing'
import { AcIntegrationTab } from '../ac-integration-tab'
import { AppEditTab } from '../edit-page-tabs'
import { AppEditFormSchema } from '../form-schema/form-fields'

jest.mock('../../state/use-app-state')

describe('AcIntegrationTab', () => {
  it('should match a snapshot', () => {
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
