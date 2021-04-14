import * as React from 'react'
import { shallow } from 'enzyme'
import { Snack } from '../'

describe('Snack component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<Snack />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot if an icon is supplied', () => {
    const wrapper = shallow(<Snack icon="email" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should trigger the onRemove prop if supplied', () => {
    const onRemove = jest.fn()
    const wrapper = shallow(<Snack icon="email" onRemove={onRemove} />)
    const btn = wrapper.findWhere((n) => n.name() === 'Icon' && n.prop('icon') === 'close')
    btn.simulate('click')
    expect(onRemove).toHaveBeenCalledTimes(1)
  })
})
