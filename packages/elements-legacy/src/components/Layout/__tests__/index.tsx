import * as React from 'react'
import { render } from '@testing-library/react'
import * as LayoutComponents from '../index'

const Placeholder = ({ text }) => (
  <div style={{ width: '100%', height: '100px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    {text}
  </div>
)

describe('LayoutComponents', () => {
  Object.keys(LayoutComponents).forEach((componentName) => {
    it('should match a snapshot for ' + componentName, () => {
      const Component = LayoutComponents[componentName] as React.FC
      expect(
        render(
          <Component>
            <Placeholder text={componentName} />
          </Component>,
        ),
      ).toMatchSnapshot()
    })
  })
})
