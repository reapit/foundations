import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { AppSidebar, AppSidebarProps } from '../app-sidebar'
import CategoriesList from '@/components/ui/categories-list'
import { appCategorieStub } from '../../../sagas/__stubs__/app-categories'

const props = {
  categories: appCategorieStub.data || [],
  location: {
    search: 'page=1'
  }
} as AppSidebarProps

describe('AppSidebar', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<AppSidebar {...props} />))).toMatchSnapshot()
  })

  it('should contain list categories', () => {
    const wrapper = shallow(<AppSidebar {...props} />)
    expect(wrapper.find(CategoriesList)).toHaveLength(1)
  })
})
