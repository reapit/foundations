import React from 'react'
import { render } from '../../../../../tests/react-testing'
import { AppEditForm } from '../app-edit-form'
import { AppEditTab } from '../edit-page-tabs'

jest.mock('../../state/use-app-state')

describe('AppEditForm', () => {
  it('should match a snapshot', () => {
    expect(render(<AppEditForm tab={AppEditTab.permissions} />)).toMatchSnapshot()
  })
})
