import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { act } from 'react-dom/test-utils'
import { Modal } from '../'
import { renderWithPortalProvider } from '../../../hooks/UsePortal/__tests__/portal-provider'
import toJson from 'enzyme-to-json'
import { ModalFooter, ModalBody, ModalHeader } from '../index'

const App: React.FunctionComponent<any> = ({
  defaultVisible = false,
  tapOutsideToDissmiss = true,
}: {
  defaultVisible: boolean
  tapOutsideToDissmiss: boolean
}) => {
  const [visible, setVisible] = React.useState<boolean>(defaultVisible)

  return (
    <div>
      <Modal
        tapOutsideToDissmiss={tapOutsideToDissmiss}
        visible={visible}
        afterClose={() => setVisible(false)}
        title="Some Modal Title"
      >
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
  it('should match a snapshot for ModalFooter', () => {
    expect(toJson(render(<ModalFooter footerItems={<div>Some footer content</div>} />))).toMatchSnapshot()
  })

  it('should match a snapshot for ModalBody', () => {
    expect(toJson(render(<ModalBody body={<div>Some body content</div>} />))).toMatchSnapshot()
  })

  it('should match a snapshot for ModalHeader', () => {
    expect(toJson(render(<ModalHeader title="Some body content" afterClose={jest.fn()} />))).toMatchSnapshot()
  })

  it('should match a snapshot for ModalHeader', () => {
    const afterClose = jest.fn()
    const component = render(<ModalHeader title="Some body content" afterClose={afterClose} />)
    component.find('button').simulate('click', { preventDefault: jest.fn() })
    expect(afterClose).toHaveBeenCalledTimes(1)
  })

  it('should show Modal when visible prop is true', () => {
    const wrapper = render(renderWithPortalProvider(<App />))
    const showModalButton = wrapper.find('[data-test="show-modal-button"]')
    expect(wrapper.find('[data-test="modal"]')).toHaveLength(0)
    showModalButton.simulate('click')
    expect(wrapper.find('[data-test="modal"]')).toHaveLength(1)
  })

  // CLD-250: https://reapit.atlassian.net/secure/RapidBoard.jspa?rapidView=200&view=planning&selectedIssue=CLD-250
  it('should close Modal after press escape button', (done) => {
    const wrapper = render(renderWithPortalProvider(<App />))
    const showModalButton = wrapper.find('[data-test="show-modal-button"]')
    showModalButton.simulate('click')
    const evt = new KeyboardEvent('keydown', { key: 'Esc' })

    act(() => {
      document.dispatchEvent(evt)
      /**
       * Put it after react dom render function
       * In event loop queue
       */
      setTimeout(() => {
        wrapper.update()
        expect(wrapper.find('[data-test="modal"]')).toHaveLength(0)
        done()
      }, 1)
    })
  })

  it('should close Modal when click on modal overlay', (done) => {
    const wrapper = render(renderWithPortalProvider(<App />))
    const showModalButton = wrapper.find('[data-test="show-modal-button"]')
    showModalButton.simulate('click')
    const modalOverlay = wrapper.find('[data-test="modal-background"]')

    /**
     * Bind event to the modal overlay happens in asynchronous manner
     * Have to put this to the bottom of the Event loop queue
     */
    setTimeout(() => {
      act(() => {
        modalOverlay.getDOMNode().dispatchEvent(new Event('click'))

        /**
         * Put it after react dom render function
         * In event loop queue
         */
        setTimeout(() => {
          wrapper.update()
          expect(wrapper.find('[data-test="modal"]')).toHaveLength(0)
          done()
        }, 1)
      })
    }, 1)
  })

  it('should hide modal when click on close button', () => {
    const wrapper = render(renderWithPortalProvider(<App defaultVisible={true} />))
    const closeModalButton = wrapper.find('[data-test="modal-close-button"]')
    expect(wrapper.find('[data-test="modal"]')).toHaveLength(1)
    closeModalButton.simulate('click')
    expect(wrapper.find('[data-test="modal"]')).toHaveLength(0)
  })

  it('Should render multiple Modals correctly', () => {
    const wrapper = render(
      renderWithPortalProvider(
        <>
          <Modal visible={true}>Modal 1</Modal>
          <Modal visible={true}>Modal 2</Modal>
        </>,
      ),
    )
    expect(wrapper.find('[data-test="modal"]')).toHaveLength(2)
  })

  it('Should render a component containing a Modal inside a Modal', () => {
    const wrapper = render(renderWithPortalProvider(<AppModalInsideModal />))
    const showSecondModalButton = wrapper.find('[data-test="show-second-modal"]')
    expect(wrapper.find('[data-test="modal"]')).toHaveLength(1)
    expect(showSecondModalButton).toHaveLength(1)
    showSecondModalButton.simulate('click')
    expect(wrapper.find('[data-test="modal"]')).toHaveLength(2)
  })

  it('Can terminate a parent Modal from its child Modal', () => {
    const wrapper = render(renderWithPortalProvider(<AppCloseModalFromChildModal />))
    wrapper.find('[data-test="modal-two-open-button"]').simulate('click')
    expect(wrapper.find('[data-test="modal"]')).toHaveLength(2)
    wrapper.find('[data-test="modal-one-close-button"]').simulate('click')
    expect(wrapper.find('[data-test="modal"]')).toHaveLength(0)
  })

  it('should not hide Modal when tapOutsideToDissmiss prop is false', (done) => {
    const wrapper = render(renderWithPortalProvider(<App tapOutsideToDissmiss={false} />))
    const showModalButton = wrapper.find('[data-test="show-modal-button"]')
    showModalButton.simulate('click')
    const modalOverlay = wrapper.find('[data-test="modal-background"]')

    /**
     * Bind event to the modal overlay happens in asynchronous manner
     * Have to put this to the bottom of the Event loop queue
     */
    setTimeout(() => {
      act(() => {
        modalOverlay.getDOMNode().dispatchEvent(new Event('click'))

        /**
         * Put it after react dom render function
         * In event loop queue
         */
        setTimeout(() => {
          wrapper.update()
          expect(wrapper.find('[data-test="modal"]')).toHaveLength(1)
          done()
        }, 1)
      })
    }, 1)
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
