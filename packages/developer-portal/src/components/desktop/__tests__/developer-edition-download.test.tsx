import React from 'react'
import { DeveloperEditionDownload } from '../developer-edition-download'
import { render } from '../../../tests/react-testing'

describe('DeveloperEditionDownload', () => {
  it('should match snapshot', () => {
    const wrapper = render(<DeveloperEditionDownload />)
    expect(wrapper).toMatchSnapshot()
  })
})
