import * as React from 'react'

const NO_PROVIDER = 'NO_PROVIDER' as any

export default function createContext<P, V>(useValue: (props: P) => V) {
  const Context = React.createContext(NO_PROVIDER as V)

  const Provider: React.FunctionComponent<P> = props => {
    const value = useValue(props)

    return <Context.Provider value={value}>{props.children}</Context.Provider>
  }

  const useContext = () => {
    const value = React.useContext(Context)
    if (value === NO_PROVIDER) {
      throw new Error('useContext must be inside a Provider with a value')
    }
    return value
  }

  return [Provider, useContext] as const
}
