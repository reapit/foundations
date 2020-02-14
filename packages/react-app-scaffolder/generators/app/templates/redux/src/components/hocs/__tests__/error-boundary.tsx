import * as React from 'react'
import { shallow, mount } from 'enzyme'
import toJson from 'enzyme-to-json'
import { ErrorBoundary, ErrorState } from '../error-boundary'
import errorMessages from '../../../constants/error-messages'
import { ErrorData } from '../../../reducers/error'

jest.mock('../../../utils/route-dispatcher')

const Component: React.FC = () => <div>I am a component!</div>
Component.displayName = 'Component'

const props = {
  children: Component,
  errorThrownComponent: jest.fn(),
  componentError: {
    type: 'COMPONENT',
    message: errorMessages.DEFAULT_COMPONENT_ERROR,
  } as ErrorData,
}

describe('ErrorBoundary', () => {
  it('should match a snapshot when no error', () => {
    expect(toJson(shallow(<ErrorBoundary {...props} />))).toMatchSnapshot()
  })

  it('should match a snapshot when has an error', () => {
    const component = shallow(<ErrorBoundary {...props} />)
    component.setState({
      hasFailed: true,
    })
    expect(toJson(component)).toMatchSnapshot()
  })

  it('should call the errorThrownComponent and sets the state to hasFailed when it catches', () => {
    ;(console.error as any) = jest.fn()
    const DangerousChild = (props: { someProp?: false }) => {
      if (!props.someProp) {
        throw new Error('Catch me if you can')
      }
      return <div />
    }
    const newPops = { ...props, children: <DangerousChild /> }

    const component = mount(<ErrorBoundary {...newPops} />)
    expect(DangerousChild).toThrow()
    expect(newPops.errorThrownComponent).toHaveBeenCalledTimes(1)
    expect(newPops.errorThrownComponent).toHaveBeenCalledWith({
      type: 'COMPONENT',
      message: errorMessages.DEFAULT_COMPONENT_ERROR,
    })
    expect((component.state() as ErrorState).hasFailed).toBe(true)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })
})
