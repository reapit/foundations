import * as React from 'react'
import { shallow } from 'enzyme'
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

    expect(shallow(<Section {...mockProps} />)).toMatchSnapshot()
  })
})
