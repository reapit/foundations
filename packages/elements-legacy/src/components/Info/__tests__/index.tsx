import * as React from 'react'
import { render } from '@testing-library/react'
import { Info, InfoType } from '..'

const variants: InfoType[] = [
  '404',
  'CLIENT_APPS_EMPTY',
  'INSTALLED_APPS_EMPTY',
  'DEVELOPER_APPS_EMPTY',
  'ADMIN_APPROVALS_EMPTY',
  '',
]

describe('Info', () => {
  variants.forEach((variant) => {
    it('should match a snapshot for variant ' + variant, () => {
      expect(render(<Info infoType={variant} />)).toMatchSnapshot()
    })
  })
})
