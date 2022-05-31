import * as React from 'react'
import { render } from '@testing-library/react'
import { Helper, Variant } from '../index'

const variants: Variant[] = ['info', 'warning']

describe('Helper', () => {
  it('should default to variant info without close button', () => {
    expect(render(<Helper />)).toMatchSnapshot()
  })
  it('should match with/without closeButton', () => {
    expect(render(<Helper closeButton={true} />)).toMatchSnapshot()
    expect(render(<Helper closeButton={false} />)).toMatchSnapshot()
  })
  variants.forEach((variant) => {
    it('should match snapshot with button for variant ' + variant, () => {
      expect(render(<Helper variant={variant} />)).toMatchSnapshot()
    })
  })
})
