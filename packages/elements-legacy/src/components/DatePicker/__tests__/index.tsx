import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { DatePicker, DatePickerProps, CustomInput } from '../index'
import { Formik, Form } from 'formik'
import { act } from 'react-dom/test-utils'

jest.unmock('dayjs')

const props: DatePickerProps = {
  name: 'abc',
  labelText: 'abc',
  id: '123',
}

describe('Date-time picker', () => {
  describe('DatePicker', () => {
    it('should match a snapshot', () => {
      expect(render(<DatePicker {...props} />)).toMatchSnapshot()
    })
  })

  describe('CustomInput', () => {
    it('should match a snapshot', () => {
      const mockProps = {
        onChange: jest.fn(),
        value: '',
        id: 'mockId',
        onClick: jest.fn(),
        className: '',
      }
      expect(render(<CustomInput {...mockProps} />)).toMatchSnapshot()
    })
  })

  it('should map value correctly from textbox to formik', async () => {
    const submitCallback = jest.fn()
    const mockEvent = {
      target: {
        value: '22/11/1997',
      },
    }
    const wrapper = render(
      <Formik initialValues={{ test: '1997-11-20T17:00:00' }} onSubmit={submitCallback}>
        {() => {
          return (
            <Form>
              <DatePicker name="test" id="test" labelText="test" />
            </Form>
          )
        }}
      </Formik>,
    )

    const input = wrapper.find('input')

    await act(async () => {
      input.simulate('change', mockEvent)
    })

    // onChange
    const form = wrapper.find('form')
    await act(async () => {
      form.simulate('submit')
    })
    wrapper.update()
    expect(submitCallback.mock.calls[0][0]).toMatchObject({ test: '1997-11-22T00:00:00' })
  })

  describe('should map value correctly from formik to text box', () => {
    it('handles error case', () => {
      const wrapper = render(
        <Formik initialValues={{ test: 'asdfasd' }} onSubmit={jest.fn()}>
          {() => {
            return (
              <Form>
                <DatePicker name="test" id="test" labelText="test" />
              </Form>
            )
          }}
        </Formik>,
      )

      const input = wrapper.find('input')
      expect(input.props().value).toBe('')
    })
    it('handles empty case', () => {
      const wrapper = render(
        <Formik initialValues={{ test: '' }} onSubmit={jest.fn()}>
          {() => {
            return (
              <Form>
                <DatePicker name="test" id="test" labelText="test" />
              </Form>
            )
          }}
        </Formik>,
      )

      const input = wrapper.find('input')
      expect(input.props().value).toBe('')
    })
    it('handles normal case', (done) => {
      const wrapper = render(
        <Formik initialValues={{ test: '1997-11-20T17:00:00' }} onSubmit={jest.fn()}>
          {() => {
            return (
              <Form>
                <DatePicker name="test" id="test" labelText="test" />
              </Form>
            )
          }}
        </Formik>,
      )

      const input = wrapper.find('input')
      expect(input.props().value).toBe('20/11/1997')
      input.simulate('change', {
        target: {
          value: '1',
        },
      })

      // onChange
      setTimeout(() => {
        // Element found is just a snapshoot. Have to get a new snapshoot again.
        const input = wrapper.find('input')
        expect(input.props().value).toBe('1_/__/____')
        done()
      }, 1)
    })
  })

  it('should work when integrating with Formik', () => {
    const wrapper = render(
      <Formik initialValues={{ test: false }} onSubmit={jest.fn()}>
        {() => (
          <Form>
            <DatePicker {...props} />
          </Form>
        )}
      </Formik>,
    )
    expect(wrapper.find('label')).toHaveLength(1)
  })

  it('simulate on blur', () => {
    const mockProps = {
      onChange: jest.fn(),
      onBlur: jest.fn(),
      value: '',
      id: 'mockId',
      onClick: jest.fn(),
      className: '',
    }
    const wrapper = render(<CustomInput {...mockProps} />)
    const inputWrapper = wrapper.find('input')
    inputWrapper.simulate('blur')
    expect(inputWrapper.props().value).toEqual('')
  })
})
