import { AppsBrowseConfigEnum } from '@reapit/foundations-ts-definitions'
import React from 'react'
import { render } from '../../../tests/react-testing'
import { AppBrowseManageTable } from '../app-browse-manage-table'

jest.mock('react-color', () => ({
  SketchPicker: jest.fn(),
}))

describe('AppBrowseManageTable', () => {
  it('should match a snapshot', () => {
    process.env.appEnv = 'development'
    expect(
      render(
        <AppBrowseManageTable
          type={AppsBrowseConfigEnum.FEATURED}
          items={[]}
          setEditType={() => {}}
          setSelectedItem={() => {}}
          deleteItem={() => {}}
          connectSession={{} as any}
          setItems={() => {}}
        />,
      ),
    ).toMatchSnapshot()
  })
})
