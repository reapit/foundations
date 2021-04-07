import * as React from 'react'
import { shallow } from 'enzyme'
import { ElStep } from '../__styles__'
import { Steps, ISteps } from '../index'
import toJson from 'enzyme-to-json'

const props: ISteps = {
  steps: ['1', '2', '3', '4', '5'],
  onStepClick: jest.fn(),
}

describe('Steps', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<Steps {...props} />))).toMatchSnapshot()
  })

  it('should match a snapshot when selectedStep is different', () => {
    expect(toJson(shallow(<Steps {...props} selectedStep="2" />))).toMatchSnapshot()
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
