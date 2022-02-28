import React from 'react'
import { Control } from 'react-hook-form'
import { render } from '../../../../../tests/react-testing'
import { AppEditForm } from '../app-edit-form'
import { AppEditTab } from '../edit-page-tabs'
import { AppEditFormSchema } from '../form-schema/form-fields'

jest.mock('../../state/use-app-state')

describe('AppEditForm', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <AppEditForm
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
