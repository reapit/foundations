import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { DeveloperAppModalInner, DeveloperAppInnerProps, CheckboxElement } from '../developer-app-modal'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { Button } from '@reapit/elements'
import { Formik } from 'formik'

// @ts-ignore: just need to pick relevant props to test
const props = (loading: boolean, error: boolean): DeveloperAppInnerProps => ({
  appDetailState: { loading, error, appDetailData: { data: appDetailDataStub.data } },
  submitRevisionState: { formState: 'PENDING' }
})

describe('DeveloperAppModalInner', () => {
  it('should match a snapshot when LOADING true', () => {
    expect(toJson(shallow(<DeveloperAppModalInner {...props(true, false)} />))).toMatchSnapshot()
  })

  it('should match a snapshot when LOADING false', () => {
    expect(toJson(shallow(<DeveloperAppModalInner {...props(false, false)} />))).toMatchSnapshot()
  })

  it('should match a snapshot when ERROR true', () => {
    expect(toJson(shallow(<DeveloperAppModalInner {...props(false, true)} />))).toMatchSnapshot()
  })

  describe('CheckboxElement run correctly', () => {
    it('when CheckboxElement have scope', () => {
      const scopes = [
        { name: 'Marketplace/properties.read', description: 'Read data about properties' },
        { name: 'Marketplace/properties.write', description: 'Write data about properties' }
      ]
      const checkboxes = shallow(<CheckboxElement scopes={scopes} />)
      expect(checkboxes.find('Checkbox')).toHaveLength(2)
    })
    it('when CheckboxElement have scope', () => {
      const scopes = [{ name: 'Marketplace/properties.read', description: 'Read data about properties' }]
      const checkboxes = shallow(<CheckboxElement scopes={scopes} />)
      expect(checkboxes.find('Checkbox')).toHaveLength(1)
    })

    it('when CheckboxElement have no scopes', () => {
      const scopes = undefined
      const checkboxes = shallow(<CheckboxElement scopes={scopes} />)
      expect(checkboxes.find('Checkbox')).toHaveLength(0)
    })
    it('when CheckboxElement have [] scopes', () => {
      const scopes = []
      const checkboxes = shallow(<CheckboxElement scopes={scopes} />)
      expect(checkboxes.find('Checkbox')).toHaveLength(0)
    })
    it('when CheckboxElement have null scopes', () => {
      const scopes = []
      const checkboxes = shallow(<CheckboxElement scopes={scopes} />)
      expect(checkboxes.find('Checkbox')).toHaveLength(0)
    })
  })
})
