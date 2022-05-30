import * as React from 'react'
import { render } from '../../../tests/react-testing'

import CategoryItem, { CategoryItemProps } from '../category-item'
import { categoriesStub } from '@/sagas/__stubs__/categories'

const props: CategoryItemProps = {
  category: (categoriesStub.data || [])[0],
  selected: false,
  onSelectCategory: jest.fn(),
}

describe('CategoryItem', () => {
  it('should match a snapshot', () => {
    expect(render(<CategoryItem {...props} />)).toMatchSnapshot()
  })

  it('should contain All when no category', () => {
    const wrapper = render(<CategoryItem selected={false} onSelectCategory={jest.fn} />)
    expect(wrapper.find('a').first().text()).toEqual('All')
  })
})
