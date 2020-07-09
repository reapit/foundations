import React from 'react'
import { Tag, AppDetailSection, ImageSection } from '../helpers'
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

  test('<ImageSection /> should match snapshot for no images', () => {
    const wrapper = shallow(<ImageSection>Test</ImageSection>)
    expect(wrapper).toMatchSnapshot()
  })

  test('<ImageSection /> should match snapshot for has image', () => {
    const wrapper = shallow(
      <ImageSection uri="https://image.com" alt="some image">
        Test
      </ImageSection>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
