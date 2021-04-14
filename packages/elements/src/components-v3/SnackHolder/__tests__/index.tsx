import * as React from 'react'
import { shallow } from 'enzyme'
import { Snack } from '../../Snack'
import { SnackHolder } from '../'

describe('SnackHolder component', () => {
  it('should match a snapshot', () => {
    const wrapper = shallow(<SnackHolder snacks={[{ text: 'i am a snack', intent: 'primary', icon: 'info' }]} />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should pass through an onRemove prop', () => {
    const spy = jest.fn()
    const wrapper = shallow(
      <SnackHolder
        snacks={[{ text: 'i am a snack', intent: 'primary', icon: 'info', _id: '1' }]}
        removeSnackById={spy}
      />,
    )
    expect(wrapper.find(Snack).first().prop('onRemove')).toBeTruthy()
  })
})
