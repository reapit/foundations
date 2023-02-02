import React from 'react'
import { render } from '@testing-library/react'
import { Icon } from '..'
import { getIconSize } from '../index'
import {
  elIconSizeLarge,
  elIconSizeLargest,
  elIconSizeMedium,
  elIconSizeSmall,
  elIconSizeSmallest,
} from '../__styles__'

describe('Icon component', () => {
  it('should match a snapshot', () => {
    const wrapper = render(<Icon icon="addSystem" />)
    expect(wrapper).toMatchSnapshot()
  })

  it('should match a snapshot when intent prop is supplied', () => {
    const wrapper = render(<Icon icon="addSystem" intent="primary" />)
    expect(wrapper).toMatchSnapshot()
  })
})

describe('getIconSize', () => {
  it('should correctly return classes for each icon size', () => {
    expect(getIconSize('smallest')).toEqual(elIconSizeSmallest)
    expect(getIconSize('small')).toEqual(elIconSizeSmall)
    expect(getIconSize('medium')).toEqual(elIconSizeMedium)
    expect(getIconSize('large')).toEqual(elIconSizeLarge)
    expect(getIconSize('largest')).toEqual(elIconSizeLargest)
    expect(getIconSize()).toBeNull()
  })
})
