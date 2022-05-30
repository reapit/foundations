import React, { MouseEvent } from 'react'
import { render } from '@testing-library/react'
import {
  Card,
  CardContextMenu,
  handleMouseHover,
  handleToggleBothMobileOpen,
  handleToggleContextMenu,
  handleToggleListMobileOpen,
  handleToggleMainMobileOpen,
} from '../card-components'

describe('Card', () => {
  it('should match a snapshot and render children with no props', () => {
    const wrapper = render(
      <Card>
        <div>I am a child</div>
      </Card>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot and render children with full props', () => {
    const wrapper = render(
      <Card
        hasMainCard
        hasListCard
        mainContextMenuItems={[
          { icon: 'trashSystem', onClick: () => console.log('Clicking'), intent: 'danger' },
          { icon: 'shareSystem', onClick: () => console.log('Clicking') },
        ]}
        mainCardHeading="Main Heading"
        mainCardSubHeading="Main Subheading"
        mainCardSubHeadingAdditional="Main Subheading Additional"
        mainCardBody="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur."
        mainCardImgUrl="https://via.placeholder.com/72x72.svg"
        listCardHeading="List Card Heading"
        listCardSubHeading="List Card Sub Heading"
        listCardItems={[
          {
            listCardItemHeading: 'Applicant',
            listCardItemSubHeading: 'Bob Smith',
            listCardItemIcon: 'applicantInfographic',
            onClick: () => console.log('Clicking'),
          },
          {
            listCardItemHeading: 'Property',
            listCardItemSubHeading: 'Some Address',
            listCardItemIcon: 'houseInfographic',
            onClick: () => console.log('Clicking'),
          },
        ]}
        listContextMenuItems={[
          { icon: 'trashSystem', onClick: () => console.log('Clicking'), intent: 'danger' },
          { icon: 'shareSystem', onClick: () => console.log('Clicking') },
        ]}
      >
        <div>I am a child</div>
      </Card>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('CardContextMenu', () => {
  it('should match a snapshot and render children with no props', () => {
    const wrapper = render(
      <CardContextMenu>
        <div>I am a child</div>
      </CardContextMenu>,
    )
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot and render children with full props', () => {
    const wrapper = render(
      <CardContextMenu
        contextMenuItems={[
          { icon: 'trashSystem', onClick: () => console.log('Clicking'), intent: 'danger' },
          { icon: 'shareSystem', onClick: () => console.log('Clicking') },
        ]}
      >
        <div>I am a child</div>
      </CardContextMenu>,
    )
    expect(wrapper).toMatchSnapshot()
  })
})

describe('handleToggleContextMenu', () => {
  it('should correctly toggle the context menu', () => {
    const mockValue = false
    const mockSetValue = jest.fn()
    const curried = handleToggleContextMenu(mockValue, mockSetValue)
    const event = {
      stopPropagation: jest.fn(),
    }

    curried((event as unknown) as MouseEvent)

    expect(mockSetValue).toHaveBeenCalledTimes(1)
    expect(mockSetValue).toHaveBeenCalledWith(true)
    expect(event.stopPropagation).toHaveBeenCalledTimes(1)
  })
})

describe('handleToggleMainMobileOpen', () => {
  it('should correctly toggle the context menu', () => {
    const mockValue = false
    const mockSetValue = jest.fn()
    const curried = handleToggleMainMobileOpen(mockValue, mockSetValue)
    const event = {
      stopPropagation: jest.fn(),
    }

    curried((event as unknown) as MouseEvent)

    expect(mockSetValue).toHaveBeenCalledTimes(1)
    expect(mockSetValue).toHaveBeenCalledWith(true)
    expect(event.stopPropagation).toHaveBeenCalledTimes(1)
  })
})

describe('handleToggleListMobileOpen', () => {
  it('should correctly toggle the context menu', () => {
    const mockValue = false
    const mockSetValue = jest.fn()
    const curried = handleToggleListMobileOpen(mockValue, mockSetValue)
    const event = {
      stopPropagation: jest.fn(),
    }

    curried((event as unknown) as MouseEvent)

    expect(mockSetValue).toHaveBeenCalledTimes(1)
    expect(mockSetValue).toHaveBeenCalledWith(true)
    expect(event.stopPropagation).toHaveBeenCalledTimes(1)
  })
})

describe('handleToggleBothMobileOpen', () => {
  it('should correctly toggle the context menu', () => {
    const mockValue = false
    const mockSecondValue = false
    const mockSetValue = jest.fn()
    const mockSetSecondValue = jest.fn()
    const curried = handleToggleBothMobileOpen(mockValue, mockSetValue, mockSecondValue, mockSetSecondValue)
    const event = {
      stopPropagation: jest.fn(),
    }

    curried((event as unknown) as MouseEvent)

    expect(mockSetValue).toHaveBeenCalledTimes(1)
    expect(mockSetValue).toHaveBeenCalledWith(true)
    expect(mockSetSecondValue).toHaveBeenCalledTimes(1)
    expect(mockSetSecondValue).toHaveBeenCalledWith(true)
    expect(event.stopPropagation).toHaveBeenCalledTimes(1)
  })
})

describe('handleMouseHover', () => {
  it('should set the hover index', () => {
    const hoverIndex = 1
    const setHoverIndex = jest.fn()

    const curried = handleMouseHover(hoverIndex, setHoverIndex)

    curried()

    expect(setHoverIndex).toHaveBeenCalledWith(hoverIndex)
  })
})
