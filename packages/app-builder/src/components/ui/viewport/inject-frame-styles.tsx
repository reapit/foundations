import React, { useContext, useEffect } from 'react'
import { FrameContext } from 'react-frame-component'

const isLocal = window.reapit.config.appEnv === 'local'

export const InjectFrameStyles = ({ children }: { children: React.ReactChildren }) => {
  const { document: frame } = useContext(FrameContext)
  useEffect(() => {
    const links = Array.from(document.querySelectorAll('link')).filter(({ rel }) => rel === 'stylesheet')
    const styles = Array.from(document.querySelectorAll('style'))
    const stylesheets = [...links, ...styles]

    stylesheets.forEach((style) => {
      frame.head.appendChild(style.cloneNode(true))
    })

    const observer = new MutationObserver((mutationsList) => {
      mutationsList.forEach((mutation) => {
        if (mutation.type === 'childList') {
          mutation.addedNodes.forEach((node) => {
            frame.head.appendChild(node.cloneNode(true))
          })
        }
      })
    })
    if (isLocal) {
      observer.observe(document.head, { childList: true, subtree: true })
    }

    frame.body.style.background = '#e0e0e0'
    frame.body.style.overflow = 'auto'

    return () => {
      if (!isLocal) {
        observer.disconnect()
      }
    }
  }, [frame])

  return <>{children}</>
}
