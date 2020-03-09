import React from 'react'
import { shallow } from 'enzyme'
import { act } from '@testing-library/react-hooks'

export const mountReactHook = hook => {
  const Component = ({ children }) => children(hook())
  const componentHook = {}
  let componentMount

  act(() => {
    componentMount = shallow(
      <Component>
        {hookValues => {
          Object.assign(componentHook, hookValues)
          return null
        }}
      </Component>,
    )
  })
  return { componentMount, componentHook }
}

export default mountReactHook
