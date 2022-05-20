import { useEffect, useState } from 'react'

let zoom = 1

type ZoomListener = (newZoom: number) => void

const listeners: ZoomListener[] = []
const setZoom = (newZoom: number) => {
  zoom = newZoom
  listeners.forEach((fn) => fn(zoom))
}

const onZoomChange = (fn: (newZoom: number) => void) => {
  listeners.push(fn)
  fn(zoom)
  return () => {
    listeners.splice(listeners.indexOf(fn), 1)
  }
}

export const useZoom = () => {
  const [_zoom, _setZoom] = useState(zoom)

  useEffect(() => {
    return onZoomChange(_setZoom)
  }, [])

  return {
    zoom: _zoom,
    setZoom,
  }
}
