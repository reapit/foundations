import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import CategoriesList, { CategoriesListProps } from '@/components/ui/categories-list'
import { appCategorieStub } from '../../../sagas/__stubs__/app-categories'
import { CategoryModel } from '@/types/marketplace-api-schema'

const props: CategoriesListProps = {
  categories: appCategorieStub.data as CategoryModel[]
}

describe('CategoriesList', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<CategoriesList {...props} />))).toMatchSnapshot()
  })

  it('should contain list categories', () => {
    const wrapper = shallow(<CategoriesList {...props} />)
    expect(wrapper.find('li')).toHaveLength(appCategorieStub?.data?.length || 0)
  })
})
