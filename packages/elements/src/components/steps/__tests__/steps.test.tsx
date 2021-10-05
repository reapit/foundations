import React from 'react'
import { shallow } from 'enzyme'
import { ElStep } from '../__styles__'
import { Steps, StepsProps, StepsVertical, StepsVerticalProps } from '../index'

describe('Steps', () => {
  const props: StepsProps = {
    steps: ['1', '2', '3', '4', '5'],
    onStepClick: jest.fn(),
  }

  it('should match a snapshot', () => {
    expect(shallow(<Steps {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot when selectedStep is different', () => {
    expect(shallow(<Steps {...props} selectedStep="2" />)).toMatchSnapshot()
  })

  it('should fire the onStepClick event correctly', () => {
    const wrapper = shallow(<Steps {...props} />)
    wrapper.find(ElStep).first().simulate('click')
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
    expect(shallow(<StepsVertical {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot when selectedStep is different', () => {
    expect(shallow(<StepsVertical {...props} selectedStep="2" />)).toMatchSnapshot()
  })

  it('should fire the onStepClick event correctly', () => {
    const wrapper = shallow(<StepsVertical {...props} />)
    wrapper.find(ElStep).first().simulate('click')
    expect(props.onStepClick).toHaveBeenCalledTimes(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
