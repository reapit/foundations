import * as React from 'react'
import { shallow } from 'enzyme'
import toJson from 'enzyme-to-json'
import { Item, ItemProps } from '../item'
import { itemDataStub } from '../../../sagas/__stubs__/item'

const props: ItemProps = {
  itemState: {
    loading: false,
    itemData: itemDataStub
  },
  itemClearData: jest.fn(),
  itemRequestData: jest.fn()
}

describe('Item', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Item {...props} />))).toMatchSnapshot()
  })

  it('should dispatch itemClearData onClick', () => {
    shallow(<Item {...props} />)
      .find('a')
      .first()
      .simulate('click')

    expect(props.itemClearData).toHaveBeenCalledTimes(1)
  })

  it('should dispatch itemRequestData onClick', () => {
    shallow(<Item {...props} />)
      .find('a')
      .at(1)
      .simulate('click')

    expect(props.itemRequestData).toHaveBeenCalledTimes(1)
  })
})
