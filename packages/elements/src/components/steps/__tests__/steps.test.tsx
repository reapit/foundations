import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Steps, StepsProps, StepsVertical, StepsVerticalProps } from '../index'

describe('Steps', () => {
  const props: StepsProps = {
    steps: ['1', '2', '3', '4', '5'],
    onStepClick: jest.fn(),
  }

  it('should match a snapshot', () => {
    expect(render(<Steps {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot when selectedStep is different', () => {
    expect(render(<Steps {...props} selectedStep="2" />)).toMatchSnapshot()
  })

  it('should fire the onStepClick event correctly', async () => {
    const wrapper = render(<Steps {...props} />)
    fireEvent.click(wrapper.getByTestId('step-1'))
    expect(props.onStepClick).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})

describe('StepsVertical', () => {
  const props: StepsVerticalProps = {
    steps: [
      {
        item: '1',
        content: 'Lorem, ipsum dolor',
      },
      {
        item: '2',
        content: 'Lorem, ipsum dolor',
      },
      {
        item: '3',
        content: 'Lorem, ipsum dolor',
      },
      {
        item: '4',
        content: 'Lorem, ipsum dolor',
      },
      {
        item: '5',
        content: 'Lorem, ipsum dolor',
      },
    ],
    onStepClick: jest.fn(),
    selectedStep: '5',
  }

  it('should match a snapshot', () => {
    expect(render(<StepsVertical {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot when selectedStep is different', () => {
    expect(render(<StepsVertical {...props} selectedStep="2" />)).toMatchSnapshot()
  })

  it('should fire the onStepClick event correctly', async () => {
    const wrapper = render(<StepsVertical {...props} />)

    fireEvent.click(wrapper.getByTestId('step-1'))

    expect(props.onStepClick).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
