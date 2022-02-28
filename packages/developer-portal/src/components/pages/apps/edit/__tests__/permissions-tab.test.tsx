import React from 'react'
import { Control } from 'react-hook-form'
import { render } from '../../../../../tests/react-testing'
import { AppEditTab } from '../edit-page-tabs'
import { AppEditFormSchema } from '../form-schema/form-fields'
import { PermissionsTab } from '../permissions-tab'

jest.mock('../../state/use-app-state')

describe('PermissionsTab', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <PermissionsTab
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
