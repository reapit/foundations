/* istanbul ignore file */
/* Had to add because of skipped test, react hooks testing not yet supporting React 18 
https://github.com/testing-library/react-hooks-testing-library/issues/654 can remove when tests un-skipped
Looks like we will have to migrate to the main testing lib when this PR is merged
https://github.com/testing-library/react-testing-library/pull/991*/
import React, { createContext, Dispatch, SetStateAction, useContext, useState, MouseEvent, useEffect } from 'react'

export interface NavState {
  navItemIndex: number | null
  navMenuOpen: boolean
  navSubMenuIndex: number | null
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
    navSubMenuIndex: null,
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
      navItemIndex: defaultNavIndex,
      navSubMenuIndex: defaultNavSubIndex,
    }))
  }, [])

  const handleSetNavState = (newState: Partial<NavState>) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    event.stopPropagation()

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
