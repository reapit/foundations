import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { AppSidebar, AppSidebarProps } from '../app-sidebar'
import CategoriesList from '@/components/ui/categories-list'
import { appCategorieStub } from '../../../sagas/__stubs__/app-categories'
import { CategoryModel } from '@/types/marketplace-api-schema'

const props: AppSidebarProps = {
  categories: appCategorieStub.data as CategoryModel[],
  searchApps: jest.fn()
}

describe('AppSidebar', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<AppSidebar {...props} />))).toMatchSnapshot()
  })

  it('should contain list categories', () => {
    const wrapper = shallow(<AppSidebar {...props} />)
    expect(wrapper.find(CategoriesList)).toHaveLength(1)
  })
})
