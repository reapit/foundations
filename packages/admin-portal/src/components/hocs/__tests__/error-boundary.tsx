import React from 'react'
import { ErrorBoundary } from '../error-boundary'
import { render } from '../../../tests/react-testing'

const Children = () => <div>I am a component!</div>
const props = {
  children: Children,
}

describe('ErrorBoundary', () => {
  it('should match a snapshot when no error', () => {
    expect(render(<ErrorBoundary {...props} />)).toMatchSnapshot()
  })

  it('should call the errorThrownComponent and sets the state to hasFailed when it catches', () => {
    (console.error as any) = jest.fn()

    const DangerousChild = (props: { someProp?: false }) => {
      if (!props.someProp) {
        throw new Error('Catch me if you can')
      }
      return <div />
    }
    const newPops = { ...props, children: <DangerousChild /> }

    const component = render(<ErrorBoundary {...newPops} />)

    expect(DangerousChild).toThrow()

    expect(component).toMatchSnapshot()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })
})
