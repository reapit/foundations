import React from 'react'
import { render, fireEvent } from '@testing-library/react'
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

  it('should trigger the onRemove prop if supplied', async () => {
    const onRemove = jest.fn()
    const wrapper = render(<Snack icon="emailSystem" onRemove={onRemove} />)
    fireEvent.click(wrapper.getByTestId('close-icon'))
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
})
