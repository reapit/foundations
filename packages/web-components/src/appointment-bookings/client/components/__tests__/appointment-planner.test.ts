import AppointmentBooking from '../appointment-bookings.svelte'
import '@testing-library/jest-dom/dist/'
import { render, waitForDomChange, wait } from '@testing-library/svelte'

describe('appointment bookings', () => {
  it('it matches a snapshot', () => {
    const wrapper = render(AppointmentBooking, { theme: { hoverBackgroundColor: 'red' } })
    const { container } = wrapper
    expect(container).toMatchSnapshot()
  })

  describe('test appointment bookings modal', () => {
    const wrapper = render(AppointmentBooking, { theme: { hoverBackgroundColor: 'red' } })
    const { getByText, getByTestId, queryAllByTestId } = wrapper

    it('should show the appointment bookings modal when click on the button', async () => {
      const buttonSelectAppointment = getByText('Select Appointment')
      buttonSelectAppointment.click()

      await waitForDomChange()

      getByTestId('appointment-booking-modal')
    })

    it('should not hide the appointment bookings modal when click inside the modal content', async () => {
      const modalHeader = getByTestId('appointment-bookings-modal-header-container')
      modalHeader.click()

      await wait()

      getByTestId('appointment-booking-modal')
    })

    it('should hide the appointment bookings modal when click outside the modal content', async () => {
      var modalShadow = getByTestId('appointment-bookings-modal-wrapper')
      modalShadow.click()

      await waitForDomChange()
      expect(queryAllByTestId('appointment-booking-modal')).toHaveLength(0)
    })
  })
})
