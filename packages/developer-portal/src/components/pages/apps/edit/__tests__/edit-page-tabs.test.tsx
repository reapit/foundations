import React from 'react'
import { Control } from 'react-hook-form'
import { render } from '../../../../../tests/react-testing'
import { AppEditTab, AppEditTabs } from '../edit-page-tabs'
import { AppEditFormSchema } from '../form-schema/form-fields'

jest.mock('../../state/use-app-state')

describe('AppEditTabs', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <AppEditTabs
          register={jest.fn()}
          errors={{}}
          tab={AppEditTab.permissions}
          control={{} as Control<AppEditFormSchema, object>}
          getValues={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })
})
