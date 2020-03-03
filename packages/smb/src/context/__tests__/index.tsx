import * as React from 'react'
import createContext from '../index'
import { mount, shallow } from 'enzyme'

function useCounter({ initialCount = 0 } = {}) {
  const [count, setCount] = React.useState(initialCount)
  const increment = React.useCallback(() => setCount(c => c + 1), [])
  const decrement = () => setCount(count - 1)
  return { count, increment, decrement }
}

describe('createContext', () => {
  it('should run correctly', () => {
    const [Provider, useContext] = createContext(useCounter)

    const Increment = () => {
      const { increment } = useContext()
      return <button onClick={increment}>Increment</button>
    }

    const Count = () => {
      const { count } = useContext()
      return <div>{count}</div>
    }

    const App = () => (
      <Provider initialCount={10}>
        <Increment />
        <Count />
      </Provider>
    )

    const wrapper = mount(<App />)
    expect(wrapper.find('div').text()).toEqual('10')
    wrapper.find('button').simulate('click')
    expect(wrapper.find('div').text()).toEqual('11')
  })

  it('without provider', async () => {
    const [, useContext] = createContext(useCounter)
    const App = () => {
      const { count } = useContext()
      return <div>{count}</div>
    }
    const spy = jest.spyOn(console, 'error').mockImplementation()
    shallow(<App />)
    expect(spy).toBeCalledWith('useContext must be inside a Provider with a value')
  })
})
