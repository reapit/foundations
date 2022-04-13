import { Dispatch, SetStateAction } from 'react'

export const handleSetAppId = (appId: string | null, setAppId: Dispatch<SetStateAction<string | null>>) => () => {
  if (appId) {
    setAppId(appId)
  }
}
