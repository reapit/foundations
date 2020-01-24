import * as React from 'react'
import { shallow } from 'enzyme'
import * as TypographyComponents from '../index'
import toJson from 'enzyme-to-json'

describe('TypographyComponents', () => {
  Object.keys(TypographyComponents).forEach(componentName => {
    it('should match a snapshot for ' + componentName, () => {
      const Component = TypographyComponents[componentName] as React.SFC<TypographyComponents.HeadingProps>
      expect(toJson(shallow(<Component className="some-class">Test text</Component>))).toMatchSnapshot()
    })
  })
})
