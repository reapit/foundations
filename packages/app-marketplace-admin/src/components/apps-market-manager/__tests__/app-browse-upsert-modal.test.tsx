import { AppsBrowseConfigEnum, AppsBrowseConfigItemInterface } from '@reapit/foundations-ts-definitions'
import React from 'react'
import { ReapitConnectSession } from '../../../../../connect-session/src/types'
import { render } from '../../../tests/react-testing'
import { AppBrowseUpsertModal } from '../app-browse-upsert-modal'

jest.mock('react-color', () => ({
  SketchPicker: jest.fn(),
}))

describe('AppBrowseUpsertModal', () => {
  it('should match a snapshot', () => {
    window.reapit.config.appEnv = 'development'
    expect(
      render(
        <AppBrowseUpsertModal
          modalIsOpen={true}
          closeModal={() => {}}
          upsertItem={() => {}}
          connectSession={{} as ReapitConnectSession}
          defaultValues={{ configType: AppsBrowseConfigEnum.FEATURED } as AppsBrowseConfigItemInterface}
        />,
      ),
    ).toMatchSnapshot()
  })
})
