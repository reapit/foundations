import { AppsBrowseConfigEnum } from '@reapit/foundations-ts-definitions'
import React from 'react'
import { render } from '../../../tests/react-testing'
import { ModalHelperText, SubsHelperText } from '../subs-helper-text'

describe('SubsHelperText', () => {
  Object.values(AppsBrowseConfigEnum).forEach((type) => {
    it(`should match a snapshot for ${type}`, () => {
      expect(render(<SubsHelperText type={type} />)).toMatchSnapshot()
      expect(render(<ModalHelperText type={type} />)).toMatchSnapshot()
    })
  })
})
