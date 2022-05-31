import React from 'react'
import { Tag, AppDetailSection, ImageSection } from '../ui-helpers'
import { render } from '../../../../../tests/react-testing'

describe('Ui Sections', () => {
  test('<AppDetailSection /> should match snapshot', () => {
    const wrapper = render(
      <AppDetailSection headerText="test" isSidebar dataTest="some-test-id">
        some text
      </AppDetailSection>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  test('<Tag /> should match snapshot', () => {
    const wrapper = render(<Tag>Test</Tag>)
    expect(wrapper).toMatchSnapshot()
  })

  test('<ImageSection /> should match snapshot for no images', () => {
    const wrapper = render(<ImageSection>Test</ImageSection>)
    expect(wrapper).toMatchSnapshot()
  })

  test('<ImageSection /> should match snapshot for has image', () => {
    const wrapper = render(
      <ImageSection uri="https://image.com" alt="some image">
        Test
      </ImageSection>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
