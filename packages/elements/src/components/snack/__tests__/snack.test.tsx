import React from 'react'
import { render } from '../../../tests/react-testing'
import { Snack, SnackHolder } from '..'

describe('Snack component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<Snack />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot if an icon is supplied', () => {
    const wrapper = render(<Snack icon="emailSystem" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should trigger the onRemove prop if supplied', () => {
    const onRemove = jest.fn()
    const wrapper = render(<Snack icon="emailSystem" onRemove={onRemove} />)
    const btn = wrapper.findWhere((n) => n.name() === 'Icon' && n.prop('icon') === 'closeSystem')
    btn.simulate('click')
    expect(onRemove).toHaveBeenCalledTimes(1)
  })
})

describe('SnackHolder component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(
      <SnackHolder snacks={[{ text: 'i am a snack', intent: 'primary', icon: 'infoSolidSystem' }]} />,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should pass through an onRemove prop', () => {
    const spy = jest.fn()
    const wrapper = render(
      <SnackHolder
        snacks={[{ text: 'i am a snack', intent: 'primary', icon: 'infoSolidSystem', _id: '1' }]}
        removeSnackById={spy}
      />,
    )
    expect(wrapper.find(Snack).first().prop('onRemove')).toBeTruthy()
  })
})
