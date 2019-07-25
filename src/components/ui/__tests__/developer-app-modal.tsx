import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { DeveloperAppModalInner, DeveloperAppInnerProps } from '../developer-app-modal'
import { appDetailDataStub } from '@/sagas/__stubs__/app-detail'
import { CreateAppRevisionModel } from '@/types/marketplace-api-schema'
import { FormState } from '@/types/core'
import Button from '@/components/form/button'
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

  it('should toggle form when click Edit Detail button', () => {
    const wrapper = shallow(<DeveloperAppModalInner {...props(false, false)} />)
    expect(wrapper.find('form')).toHaveLength(0)
    const editEdtailButton = wrapper.find(Button)
    editEdtailButton.simulate('click')
    expect(wrapper.find(Formik)).toHaveLength(1)
  })
})
