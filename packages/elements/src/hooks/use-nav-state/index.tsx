import React, { createContext, Dispatch, SetStateAction, useContext, useState, MouseEvent, useEffect } from 'react'

export interface NavState {
  navItemIndex: number | null
  navMenuOpen: boolean
  navSubMenuOpen: boolean
  navSubItemIndex: number | null
  callback?: () => void
}

export interface NavStateContextProps {
  navState: NavState
  setNavState: Dispatch<SetStateAction<NavState>>
}

export interface UseNavState {
  navState: NavState
  setNavState: (newState: Partial<NavState>) => (event: MouseEvent<HTMLAnchorElement>) => void
}

export const NavStateContext = createContext<NavStateContextProps>({} as NavStateContextProps)

const { Provider } = NavStateContext

export const NavStateProvider: React.FC = ({ children }) => {
  const [navState, setNavState] = useState<NavState>({
    navItemIndex: null,
    navMenuOpen: false,
    navSubMenuOpen: false,
    navSubItemIndex: null,
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

export const useNavState = (
  defaultNavIndex: number | null = null,
  defaultNavSubIndex: number | null = null,
): UseNavState => {
  const { navState, setNavState } = useContext(NavStateContext)

  useEffect(() => {
    setNavState((currentState) => ({
      ...currentState,
      navMenuIndex: defaultNavIndex,
      navMenuSubIndex: defaultNavSubIndex,
    }))
  }, [])

  const handleSetNavState = (newState: Partial<NavState>) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()

    setNavState((currentState: NavState) => ({
      ...currentState,
      ...newState,
    }))

    if (newState.callback) {
      newState.callback()
    }
  }

  return {
    navState,
    setNavState: handleSetNavState,
  }
}
