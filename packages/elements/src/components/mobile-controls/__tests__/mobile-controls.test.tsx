import React, { MouseEvent } from 'react'
import { render } from '@testing-library/react'
import { MobileControls, clickEventHandler } from '..'

describe('MobileControls component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<MobileControls />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot with full props', () => {
    const wrapper = render(
      <MobileControls
        isVisible
        buttonOnClick={() => console.log('Clicked Item One')}
        buttonIcon="saveSystem"
        mobileControlItems={[
          {
            label: 'Item One',
            onClick: () => console.log('Clicked Item One'),
          },
          {
            label: 'Item Two',
            onClick: () => console.log('Clicked Item Two'),
          },
          {
            label: 'Item Three',
            onClick: () => console.log('Clicked Item Three'),
          },
        ]}
      />,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('clickEventHandler', () => {
  it('should handle a click event', () => {
    const setActive = jest.fn()
    const onClick = jest.fn()
    const event = ({
      preventDefault: jest.fn(),
      stopPropagation: jest.fn(),
    } as unknown) as MouseEvent<HTMLAnchorElement | HTMLDivElement>

    const curried = clickEventHandler(setActive, onClick)

    curried(event)

    expect(setActive).toHaveBeenCalledTimes(1)
    expect(onClick).toHaveBeenCalledTimes(1)
    expect(event.preventDefault).toHaveBeenCalledTimes(1)
    expect(event.stopPropagation).toHaveBeenCalledTimes(1)
  })
})
