import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import CategoriesList, { CategoriesListProps } from '@/components/ui/categories-list'
import CategoryItem from '@/components/ui/category-item'
import { appCategorieStub } from '../../../sagas/__stubs__/app-categories'
import { CategoryModel } from '@reapit/foundations-ts-definitions'

const props: CategoriesListProps = {
  categories: appCategorieStub.data as CategoryModel[],
  selectedCategory: '',
  onSelectCategory: jest.fn()
}

describe('CategoriesList', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<CategoriesList {...props} />))).toMatchSnapshot()
  })

  it('should contain list categories', () => {
    const wrapper = shallow(<CategoriesList {...props} />)
    expect(wrapper.find(CategoryItem)).toHaveLength((appCategorieStub?.data?.length || 0) + 1) // plus default item for all categories option
  })
})
