import * as React from 'react'
import { render } from '../../../../tests/react-testing'

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
})
