import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import Info, { InfoType } from '../info'

const variants: InfoType[] = [
  '404',
  'CLIENT_APPS_EMPTY',
  'INSTALLED_APPS_EMPTY',
  'DEVELOPER_APPS_EMPTY',
  'ADMIN_APPROVALS_EMPTY',
  ''
]

describe('Info', () => {
  variants.forEach(variant => {
    it('should match a snapshot for variant ' + variant, () => {
      expect(toJson(shallow(<Info infoType={variant} />))).toMatchSnapshot()
    })
  })
})
