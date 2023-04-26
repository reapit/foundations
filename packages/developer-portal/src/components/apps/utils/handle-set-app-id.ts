import { Dispatch, SetStateAction } from 'react'

export const handleSetAppId = (setAppId: Dispatch<SetStateAction<string | null>>, appId?: string) => () => {
  if (appId) {
    setAppId(appId)
  } else {
    setAppId(null)
  }
}
