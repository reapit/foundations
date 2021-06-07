import React, { createContext, Dispatch, SetStateAction, useContext, useState, MouseEvent } from 'react'

export interface NavState {
  navItemId: string
}

export interface NavStateContextProps {
  navState: NavState
  setNavState: Dispatch<SetStateAction<NavState>>
}

export interface UseNavState {
  navState: NavState
  setNavState: (navItemId: string, callback: () => void) => (event: MouseEvent<HTMLAnchorElement>) => void
}

export const NavStateContext = createContext<NavStateContextProps>({} as NavStateContextProps)

export const DEFAULT_NAV_ID = 'ICON'

const { Provider } = NavStateContext

export const NavStateProvider: React.FC = ({ children }) => {
  const [navState, setNavState] = useState<NavState>({
    navItemId: DEFAULT_NAV_ID,
  })

  return (
    <Provider
      value={{
        navState,
        setNavState,
      }}
    >
      {children}
    </Provider>
  )
}

export const useNavState = (): UseNavState => {
  const { navState, setNavState } = useContext(NavStateContext)

  const handleSetNavState = (navItemId: string, callback: () => void) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    setNavState((currentState: NavState) => ({
      ...currentState,
      navItemId,
    }))

    callback()
  }

  return {
    navState,
    setNavState: handleSetNavState,
  }
}
