import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { ErrorBoundary, ErrorState, mapStateToProps, mapDispatchToProps } from '../error-boundary'
import errorMessages from '../../../constants/error-messages'
import { ErrorData } from '../../../reducers/error'
import { ReduxState } from '@/types/core'

jest.mock('../../../utils/route-dispatcher')
const Children = () => <div>I am a component!</div>
const props = {
  children: Children,
  errorThrownComponent: jest.fn(),
  componentError: {
    type: 'COMPONENT',
    message: errorMessages.DEFAULT_COMPONENT_ERROR,
  } as ErrorData,
}

describe('ErrorBoundary', () => {
  it('should match a snapshot when no error', () => {
    expect(shallow(<ErrorBoundary {...props} />)).toMatchSnapshot()
  })

  it('should match a snapshot when has an error', () => {
    const component = shallow(<ErrorBoundary {...props} />)
    component.setState({
      hasFailed: true,
    })
    expect(component).toMatchSnapshot()
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

  describe('mapStateToProps', () => {
    it('should run correctly', () => {
      const mockState = {
        error: {
          componentError: {
            status: 403,
            message: 'mockError',
            type: 'SERVER',
          },
        },
      } as ReduxState
      const output = {
        componentError: mockState.error.componentError,
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(output)
    })

    it('should run correctly', () => {
      const mockState = {
        error: {
          componentError: null,
        },
      } as ReduxState
      const output = {
        componentError: null,
      }
      const result = mapStateToProps(mockState)
      expect(result).toEqual(output)
    })
  })

  describe('mapDispatchToProps', () => {
    it('should call dispatch', () => {
      const mockDispatch = jest.fn()
      const mockErrorData = {
        status: 403,
        message: 'mockError',
        type: 'SERVER',
      } as ErrorData
      const { errorThrownComponent } = mapDispatchToProps(mockDispatch)
      errorThrownComponent(mockErrorData)
      expect(mockDispatch).toBeCalled()
    })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })
})
