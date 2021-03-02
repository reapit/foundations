import * as React from 'react'
import { shallow } from 'enzyme'
import * as LayoutComponents from '../index'
import toJson from 'enzyme-to-json'

const Placeholder = ({ text }) => (
  <div style={{ width: '100%', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {text}
  </div>
)

describe('LayoutComponents', () => {
  Object.keys(LayoutComponents).forEach((componentName) => {
    it('should match a snapshot for ' + componentName, () => {
      const Component = LayoutComponents[componentName] as React.SFC
      expect(
        toJson(
          shallow(
            <Component>
              <Placeholder text={componentName} />
            </Component>,
          ),
        ),
      ).toMatchSnapshot()
    })
  })
})
