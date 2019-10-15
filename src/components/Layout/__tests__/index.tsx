import * as React from 'react'
import { shallow } from 'enzyme'
import * as LayoutComponents from '../index'
import toJson from 'enzyme-to-json'
import { Placeholder } from '../layout.stories'

describe('LayoutComponents', () => {
  Object.keys(LayoutComponents).forEach(componentName => {
    it('should match a snapshot for ' + componentName, () => {
      const Component = LayoutComponents[componentName] as React.SFC
      expect(
        toJson(
          shallow(
            <Component>
              <Placeholder text={componentName} />
            </Component>
          )
        )
      ).toMatchSnapshot()
    })
  })
})
