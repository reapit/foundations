import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { FormHeading, FormSubHeading, FormSection } from '../index'
import { FormExample } from '../form.stories'

describe('LayoutComponents', () => {
  it('should match a snapshot for an example form', () => {
    expect(toJson(shallow(<FormExample />))).toMatchSnapshot()
  })
  describe('FormHeading', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(
        <FormHeading className="mockClassName">
          <div>mockChildren</div>
        </FormHeading>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('FormSubHeading', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(
        <FormSubHeading className="mockClassName">
          <div>mockChildren</div>
        </FormSubHeading>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })

  describe('FormSection', () => {
    it('should match snapshot', () => {
      const wrapper = shallow(
        <FormSection className="mockClassName">
          <div>mockChildren</div>
        </FormSection>,
      )
      expect(wrapper).toMatchSnapshot()
    })
  })
})
