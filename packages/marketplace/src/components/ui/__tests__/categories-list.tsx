import * as React from 'react'
import { shallow } from 'enzyme'

import CategoriesList, { CategoriesListProps } from '@/components/ui/categories-list'
import CategoryItem from '@/components/ui/category-item'
import { categoriesStub } from '@/sagas/__stubs__/categories'
import { CategoryModel } from '@reapit/foundations-ts-definitions'

const props: CategoriesListProps = {
  categories: categoriesStub.data as CategoryModel[],
  selectedCategory: '',
  onSelectCategory: jest.fn(),
}

describe('CategoriesList', () => {
  it('should match a snapshot', () => {
    expect(shallow(<CategoriesList {...props} />)).toMatchSnapshot()
  })

  it('should contain list categories', () => {
    const wrapper = shallow(<CategoriesList {...props} />)
    // plus default item for all categories option
    expect(wrapper.find(CategoryItem)).toHaveLength((categoriesStub?.data?.length || 0) + 1)
  })
})
