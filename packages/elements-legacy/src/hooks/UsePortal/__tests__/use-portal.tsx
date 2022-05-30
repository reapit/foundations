import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { usePortal } from '../use-portal'
import { renderWithPortalProvider } from './portal-provider'

const App: React.FunctionComponent<any> = () => {
  const [visible, setVisible] = React.useState<boolean>(false)
  const [showPortal, hidePortal] = usePortal(() => <div>Portal children</div>)

  React.useEffect(() => {
    if (visible) {
      showPortal()
    } else {
      hidePortal()
    }
  }, [visible])

  return <button onClick={() => setVisible(!visible)}>Toggle Portal</button>
}

describe('usePortal', () => {
  it('Should append a node inside body', () => {
    const wrapper = render(renderWithPortalProvider(<App />))
    const button = wrapper.find('button')
    expect(wrapper.find('div')).toHaveLength(0)
    button.simulate('click')
    expect(wrapper.find('div')).toHaveLength(1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
