import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { Section, SectionProps } from '../section'
import developerPortalImage from '@/assets/images/DeveloperPortalGraphic.jpg'

describe('Section', () => {
  it('should match snapshot', () => {
    const mockProps: SectionProps = {
      heading: 'Test heading',
      subheading: 'Test sub heading',
      description: 'Test description',
      image: developerPortalImage,
    }

    expect(render(<Section {...mockProps} />)).toMatchSnapshot()
  })

  it('should match snapshot when image in right', () => {
    const mockProps: SectionProps = {
      heading: 'Test heading',
      subheading: 'Test sub heading',
      description: 'Test description',
      image: developerPortalImage,
    }

    expect(render(<Section {...mockProps} />)).toMatchSnapshot()
  })

  it('should match snapshot when has button', () => {
    const mockProps: SectionProps = {
      heading: 'Test heading',
      subheading: 'Test sub heading',
      description: 'Test description',
      image: developerPortalImage,
      button: <a href="/test">My button</a>,
    }

    expect(render(<Section {...mockProps} />)).toMatchSnapshot()
  })
})
