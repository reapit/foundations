import React from 'react'
import { Control } from 'react-hook-form'
import { render } from '../../../../tests/react-testing'
import { AuthenticationTab } from '../authentication-tab'
import { AppEditFormSchema } from '../form-schema/form-fields'

jest.mock('../../state/use-app-state')

describe('AuthenticationTab', () => {
  it('should match a snapshot', () => {
    expect(
      render(
        <AuthenticationTab
          register={jest.fn()}
          errors={{}}
          control={{} as Control<AppEditFormSchema, object>}
          getValues={jest.fn()}
        />,
      ),
    ).toMatchSnapshot()
  })
})
