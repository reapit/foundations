import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import usePortal from '../usePortal-v3'
import { Snack } from '../../components-v3/Snack'

function useSnack() {
  const SNACK_PORTAL_ID = 'SNACK_PORTAL_ID'

  const [snacks, setSnacks] = useState<string[]>([])
  const portal = usePortal(SNACK_PORTAL_ID)

  const snackbar = createPortal(
    <div style={{ position: 'fixed', top: '0', right: 0, background: 'green', width: '500px', height: '500px' }}>
      {snacks.map((text) => (
        <Snack>{text}</Snack>
      ))}
    </div>,
    portal,
  )

  function addSnack(text: string) {
    setSnacks([...snacks, text])
  }

  return { snackbar, addSnack }
}

export default useSnack
