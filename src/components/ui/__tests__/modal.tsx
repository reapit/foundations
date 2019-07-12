import * as React from 'react'
import { mount } from 'enzyme'
import Modal from '../modal'
import { renderWithPortalProvider } from '@/hooks/use-portal/__tests__/portal-provider'

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

// const AppWithMultipleModal: React.FunctionComponent<any> = () => {
//   const [visible, setVisible] = React.useState<boolean>(false)
//   return (
//     <>
//       <Modal visible={true}>
//         <div>
//           <button data-test="show-second-modal" onClick={() => setVisible(true)} />
//           <Modal visible={visible}>
//             <div>modal child 2</div>
//           </Modal>
//         </div>
//       </Modal>
//     </>
//   )
// }

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

  // TODO: will make the test pass later
  // it('Should render multiple Modals correctly', () => {
  //   const wrapper = mount(renderWithPortalProvider(<AppWithMultipleModal />))
  //   const showSecondModalButton = wrapper.find('[data-test="show-second-modal"]')
  //   expect(wrapper.find('[data-test="modal"]')).toHaveLength(1)
  //   expect(showSecondModalButton).toHaveLength(1)
  //   showSecondModalButton.simulate('click')
  //   expect(wrapper.find('[data-test="modal"]')).toHaveLength(2)
  // })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
