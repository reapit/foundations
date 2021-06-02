import React, { createContext, Dispatch, FC, SetStateAction, useContext, useEffect, useState } from 'react'

export const IFRAME_MESSAGE = 'Returning to Geo Diary'

export interface PwaNavigateContextProps {
  pwaNavState: string | null
  setPwaNavState: Dispatch<SetStateAction<string | null>>
}

export const PwaNavigateContext = createContext<PwaNavigateContextProps>({} as PwaNavigateContextProps)

const { Provider } = PwaNavigateContext

export const PwaNavigateProvider: FC = ({ children }) => {
  const [pwaNavState, setPwaNavState] = useState<string | null>(null)

  return (
    <Provider
      value={{
        pwaNavState,
        setPwaNavState,
      }}
    >
      {children}
    </Provider>
  )
}

export const usePwaNavigate = (): PwaNavigateContextProps => {
  const { pwaNavState, setPwaNavState } = useContext(PwaNavigateContext)
  return {
    pwaNavState,
    setPwaNavState,
  }
}

export const handlePwaNavigate = (setPwaNavState: Dispatch<SetStateAction<string | null>>, url: string) => (): void => {
  if (window.matchMedia('(display-mode: standalone)').matches) {
    return setPwaNavState(url)
  }
  window.location.href = url
}

export const PwaMessageHandler: FC<{
  setPwaNavState: Dispatch<SetStateAction<string | null>>
  pwaNavState: string | null
}> = ({ setPwaNavState, pwaNavState }) => {
  useEffect(() => {
    const handleEvent = (event: MessageEvent) => {
      const { data, origin } = event
      if (data === IFRAME_MESSAGE && origin === window.location.origin && pwaNavState) {
        setPwaNavState(null)
      }
    }

    window.addEventListener('message', handleEvent, true)
    return () => window.removeEventListener('message', handleEvent)
  }, [])

  return null
}

export const PwaMessagePoster: FC = () => {
  useEffect(() => {
    if (window.parent) {
      window.parent.postMessage(IFRAME_MESSAGE, '*')
    }
  }, [])

  return null
}
