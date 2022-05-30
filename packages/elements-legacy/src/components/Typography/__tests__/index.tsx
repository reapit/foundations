import * as React from 'react'
import { render } from '../../../tests/react-testing'
import * as TypographyComponents from '../index'
import toJson from 'enzyme-to-json'

describe('TypographyComponents', () => {
  Object.keys(TypographyComponents).forEach((componentName) => {
    it('should match a snapshot for ' + componentName, () => {
      const Component = TypographyComponents[componentName] as React.FC<TypographyComponents.HeadingProps>
      expect(toJson(render(<Component className="some-class">Test text</Component>))).toMatchSnapshot()
    })
  })
})
