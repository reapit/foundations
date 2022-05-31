import * as React from 'react'
import { render } from '@testing-library/react'
import * as TypographyComponents from '../index'

describe('TypographyComponents', () => {
  Object.keys(TypographyComponents).forEach((componentName) => {
    it('should match a snapshot for ' + componentName, () => {
      const Component = TypographyComponents[componentName] as React.FC<TypographyComponents.HeadingProps>
      expect(render(<Component className="some-class">Test text</Component>)).toMatchSnapshot()
    })
  })
})
