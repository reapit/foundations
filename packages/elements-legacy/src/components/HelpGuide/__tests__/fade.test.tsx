import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { Fade } from '../fade'

describe('HelpGuide', () => {
  it('should match a snapshot', () => {
    const mockProps = {
      in: true,
      timeout: 300,
    }
    const wrapper = render(
      <Fade {...mockProps}>
        <div>MockChildren</div>
      </Fade>,
    )
    expect(wrapper).toMatchSnapshot()
  })
  it('should match a snapshot', () => {
    const mockProps = {
      in: false,
      timeout: 300,
    }
    const wrapper = render(
      <Fade {...mockProps}>
        <div>MockChildren</div>
      </Fade>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
