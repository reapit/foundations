import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { DeveloperAppModalInner, DeveloperAppInnerProps, renderScopesCheckbox } from '../developer-app-modal'
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

  describe('renderScopesCheckbox run correctly', () => {
    it('when renderScopesCheckBox have scope', () => {
      const scopes = [
        { name: 'Marketplace/developers.read', description: 'Read data about developers' },
        { name: 'Marketplace/developers.write', description: 'Write data about developers' }
      ]
      const checkboxes = renderScopesCheckbox(scopes)
      expect(checkboxes).toHaveLength(2)
    })
    it('when renderScopesCheckBox have scope', () => {
      const scopes = [{ name: 'Marketplace/developers.read', description: 'Read data about developers' }]
      const checkboxes = renderScopesCheckbox(scopes)
      expect(checkboxes).toHaveLength(1)
    })

    it('when renderScopesCheckBox have no scopes', () => {
      const scopes = undefined
      const checkboxes = renderScopesCheckbox(scopes)
      expect(checkboxes).toHaveLength(0)
    })
    it('when renderScopesCheckBox have [] scopes', () => {
      const scopes = []
      const checkboxes = renderScopesCheckbox(scopes)
      expect(checkboxes).toHaveLength(0)
    })
    it('when renderScopesCheckBox have null scopes', () => {
      const scopes = []
      const checkboxes = renderScopesCheckbox(scopes)
      expect(checkboxes).toHaveLength(0)
    })
  })
})
