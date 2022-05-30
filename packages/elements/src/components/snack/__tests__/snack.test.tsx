import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/dom'
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
    const user = userEvent.setup()
    render(<Snack icon="emailSystem" onRemove={onRemove} />)
    await user.click(screen.getByTestId('close-icon'))
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
