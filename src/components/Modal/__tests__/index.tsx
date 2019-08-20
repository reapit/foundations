import * as React from 'react'
import { mount } from 'enzyme'
import { Modal } from '../'
import { renderWithPortalProvider } from '../../../hooks/UsePortal/__tests__/portal-provider'

const App: React.FunctionComponent<any> = ({ defaultVisible = false }: { defaultVisible: boolean }) => {
  const [visible, setVisible] = React.useState<boolean>(defaultVisible)

  return (
    <div>
      <Modal visible={visible} afterClose={() => setVisible(false)}>
        <div>
          <button data-test="custom-hide-modal-button" onClick={() => setVisible(false)}>
            Hide modal
          </button>
        </div>
      </Modal>
      <button data-test="show-modal-button" onClick={() => setVisible(true)}>
        Show Modal
      </button>
    </div>
  )
}

const InnerComponentWithAnotherModal = () => {
  const [visible, setVisible] = React.useState<boolean>(false)
  return (
    <div>
      <button data-test="show-second-modal" onClick={() => setVisible(true)} />
      <Modal visible={visible}>
        <div>modal child 2</div>
      </Modal>
    </div>
  )
}

const AppModalInsideModal: React.FunctionComponent<any> = () => {
  return (
    <Modal visible={true}>
      <InnerComponentWithAnotherModal />
    </Modal>
  )
}

const AppCloseModalFromChildModal: React.FunctionComponent<any> = () => {
  const [modalOneVisible, setModalOneVisible] = React.useState<boolean>(true)
  const [modalTwoVisible, setModalTwoVisible] = React.useState<boolean>(false)
  return (
    <Modal visible={modalOneVisible}>
      <div>
        <button data-test="modal-two-open-button" onClick={() => setModalTwoVisible(true)}>
          Open modal two
        </button>
        <Modal visible={modalTwoVisible}>
          <div>
            <button data-test="modal-one-close-button" onClick={() => setModalOneVisible(false)}>
              Close modal one
            </button>
          </div>
        </Modal>
      </div>
    </Modal>
  )
}

describe('Modal', () => {
  it('should show Modal when visible prop is true', () => {
    const wrapper = mount(renderWithPortalProvider(<App />))
    const showModalButton = wrapper.find('[data-test="show-modal-button"]')
    expect(wrapper.find('[data-test="modal"]')).toHaveLength(0)
    showModalButton.simulate('click')
    expect(wrapper.find('[data-test="modal"]')).toHaveLength(1)
  })

  it('should hide modal when click on close button', () => {
    const wrapper = mount(renderWithPortalProvider(<App defaultVisible={true} />))
    const closeModalButton = wrapper.find('[data-test="modal-close-button"]')
    expect(wrapper.find('[data-test="modal"]')).toHaveLength(1)
    closeModalButton.simulate('click')
    expect(wrapper.find('[data-test="modal"]')).toHaveLength(0)
  })

  it('Should render multiple Modals correctly', () => {
    const wrapper = mount(
      renderWithPortalProvider(
        <>
          <Modal visible={true}>Modal 1</Modal>
          <Modal visible={true}>Modal 2</Modal>
        </>
      )
    )
    expect(wrapper.find('[data-test="modal"]')).toHaveLength(2)
  })

  it('Should render a component containing a Modal inside a Modal', () => {
    const wrapper = mount(renderWithPortalProvider(<AppModalInsideModal />))
    const showSecondModalButton = wrapper.find('[data-test="show-second-modal"]')
    expect(wrapper.find('[data-test="modal"]')).toHaveLength(1)
    expect(showSecondModalButton).toHaveLength(1)
    showSecondModalButton.simulate('click')
    expect(wrapper.find('[data-test="modal"]')).toHaveLength(2)
  })

  it('Can terminate a parent Modal from its child Modal', () => {
    const wrapper = mount(renderWithPortalProvider(<AppCloseModalFromChildModal />))
    wrapper.find('[data-test="modal-two-open-button"]').simulate('click')
    expect(wrapper.find('[data-test="modal"]')).toHaveLength(2)
    wrapper.find('[data-test="modal-one-close-button"]').simulate('click')
    expect(wrapper.find('[data-test="modal"]')).toHaveLength(0)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
