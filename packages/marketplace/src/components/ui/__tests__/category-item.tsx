import * as React from 'react'
import { shallow } from 'enzyme'

import CategoryItem, { CategoryItemProps } from '../category-item'
import { appCategorieStub } from '../../../sagas/__stubs__/app-categories'

const props: CategoryItemProps = {
  category: (appCategorieStub.data || [])[0],
  selected: false,
  onSelectCategory: jest.fn(),
}

describe('CategoryItem', () => {
  it('should match a snapshot', () => {
    expect(shallow(<CategoryItem {...props} />)).toMatchSnapshot()
  })

  it('should contain All when no category', () => {
    const wrapper = shallow(<CategoryItem selected={false} onSelectCategory={jest.fn} />)
    expect(
      wrapper
        .find('a')
        .first()
        .text(),
    ).toEqual('All')
  })
})
