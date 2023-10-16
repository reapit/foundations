import React from 'react'
import { render } from '@testing-library/react'
import { BreadCrumb } from '../breadcrumb'

describe('BreadCrumb', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <BreadCrumb
        defaultActiveIndex={3}
        items={[
          {
            text: 'Home',
            onClick: () => console.log('Home clicked'),
          },
          {
            text: 'Level 1',
            onClick: () => console.log('1 clicked'),
          },
          {
            text: 'Level 2',
            onClick: () => console.log('2 clicked'),
          },
          {
            text: 'Level 3',
            onClick: () => console.log('3 clicked'),
          },
        ]}
      >
        Hover here
      </BreadCrumb>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})
