import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { MemoryRouter } from 'react-router'
import { PrivateRoute } from '../private-route'

describe('PrivateRouter', () => {
  it('should match a snapshot', () => {
    expect(render(<PrivateRoute component={() => null} />)).toMatchSnapshot()
  })

  it('should return render component', () => {
    const wrapper = render(
      <MemoryRouter initialEntries={['/client']}>
        <PrivateRoute component={() => <div className="render-class" />} path="/client" />
      </MemoryRouter>,
    )
    expect(wrapper.find('.render-class')).toHaveLength(1)
  })
})
