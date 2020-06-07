import React from 'react'
import { Tag, AppDetailSection } from '../ui-helpers'
import { shallow } from 'enzyme'

describe('Ui Sections', () => {
  test('<AppDetailSection /> should match snapshot', () => {
    const wrapper = shallow(
      <AppDetailSection headerText="test" isSidebar dataTest="some-test-id">
        some text
      </AppDetailSection>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  test('<Tag /> should match snapshot', () => {
    const wrapper = shallow(<Tag>Test</Tag>)
    expect(wrapper).toMatchSnapshot()
  })
})
