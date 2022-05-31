import * as React from 'react'
import { render } from '../../../../tests/react-testing'
import CategoriesList, { CategoriesListProps } from '../categories-list'
import { categoriesStub } from '@/sagas/__stubs__/categories'
import { CategoryModel } from '@reapit/foundations-ts-definitions'

const props: CategoriesListProps = {
  categories: categoriesStub.data as CategoryModel[],
  selectedCategory: '',
  onSelectCategory: jest.fn(),
}

describe('CategoriesList', () => {
  it('should match a snapshot', () => {
    expect(render(<CategoriesList {...props} />)).toMatchSnapshot()
  })
})
