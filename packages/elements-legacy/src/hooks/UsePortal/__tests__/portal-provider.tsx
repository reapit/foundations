import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { usePortal } from '../use-portal'
import { PortalProvider } from '../portal-provider'

export const renderWithPortalProvider = (ui) => {
  return <PortalProvider>{ui}</PortalProvider>
}

const App: React.FunctionComponent<any> = () => {
  const [showPortal] = usePortal(() => <span className="component-inside-portal" />)
  React.useEffect(() => {
    showPortal()
  }, [])
  return null
}

describe('PortalProvider', () => {
  it('Should render a component via Portal', () => {
    const wrapper = render(renderWithPortalProvider(<App />))
    expect(wrapper.find('.component-inside-portal')).toHaveLength(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
