import * as React from 'react'
import { shallow } from 'enzyme'
import { Helper, Variant } from '../index'

const variants: Variant[] = ['info', 'warning']

describe('Helper', () => {
  it('should default to variant info without close button', () => {
    expect(shallow(<Helper />)).toMatchSnapshot()
  })
  it('should match with/without closeButton', () => {
    expect(shallow(<Helper closeButton={true} />)).toMatchSnapshot()
    expect(shallow(<Helper closeButton={false} />)).toMatchSnapshot()
  })
  variants.forEach(variant => {
    it('should match snapshot with button for variant ' + variant, () => {
      expect(shallow(<Helper variant={variant} />)).toMatchSnapshot()
    })
  })
})
