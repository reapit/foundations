import * as React from 'react'
import { render } from '../../../tests/react-testing'
import toJson from 'enzyme-to-json'
import { Info, InfoType } from '..'
import { infoText } from '../index'
import Alert from '../../Alert'

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
      expect(toJson(render(<Info infoType={variant} />))).toMatchSnapshot()
    })
  })

  variants.forEach((variant) => {
    it(`should have message "${infoText(variant)}" when info type is "${variant}"`, () => {
      const alert = render(<Info infoType={variant} />)
        .find(Alert)
        .dive()
      expect(alert.text()).toBe(infoText(variant))
    })
  })
})
