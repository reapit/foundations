import * as runtime from 'offline-plugin/runtime'

// this part will be translated by building
runtime.install({
  onUpdateReady: () => {
    // Tells to new SW to take control immediately
    runtime.applyUpdate()
  },
  onUpdated: () => {
    // Have to use window to reference since hook can't be referenced in build time
    ;(window as any).setIsNewVersionAvailable(true)
  },
})

import { useState, useEffect } from 'react'

type UseOfflinePLugin = () => {
  isNewVersionAvailable: boolean
}

export const useOfflinePLugin: UseOfflinePLugin = () => {
  const [isNewVersionAvailable, setIsNewVersionAvailable] = useState(false)
  useEffect(() => {
    ;(window as any).setIsNewVersionAvailable = setIsNewVersionAvailable
  })

  useEffect(() => {})

  return {
    isNewVersionAvailable,
  }
}
