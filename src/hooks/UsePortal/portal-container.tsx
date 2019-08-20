import * as React from 'react'
import * as ReactDOM from 'react-dom'

interface PortalContainerProps {
  portals: { [key: string]: React.ComponentType<any> }
}

const PortalContainer = React.memo(({ portals }: PortalContainerProps) => {
  const [mountNode, setMountNode] = React.useState<Element | undefined>(undefined)
  React.useEffect(() => {
    setMountNode(document.body)
  }, [])

  if (!mountNode) {
    return null
  }

  return ReactDOM.createPortal(
    <>
      {Object.keys(portals).map(key => {
        const Component = portals[key]
        return <Component key={key} />
      })}
    </>,
    document.body
  )
})

export default PortalContainer
