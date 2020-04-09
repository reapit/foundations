import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { DropdownSelect, DropdownSelectProps } from '../index'
import { Formik, Form, FormikErrors } from 'formik'
import toJson from 'enzyme-to-json'
import { act } from 'react-dom/test-utils'

const mockedOptions = [
  { label: 'a', value: 'a' },
  { label: 'b', value: 'b' },
]
const dropdownSelectProps: DropdownSelectProps = {
  name: 'demo',
  labelText: 'demo'
}

const createFormikWrapper = () => {
  const wrapper = mount(
    <Formik onSubmit={jest.fn()} initialValues={{ demo: 'b' }}>
      {() => (
        <Form>
          <div className="column is-half-desktop">
            <DropdownSelect name='demo' mode="tags" labelText='Demo' options={mockedOptions} />
          </div>
        </Form>
      )}
    </Formik>,
  )

  return wrapper
}

const ErrorFomrikComponent = () => {
  return (
    <section className="section">
      <Formik
        validate={values => {
          const errors: FormikErrors<any> = {
            demo: '',
          }
          if (values.demo === 'b') {
            errors.demo = 'Required'
            return errors
          }
          return errors
        }}
        initialValues={{ demo: 'a' }}
        onSubmit={jest.fn()}
      >
        {() => (
          <Form>
            <div className="column is-half-desktop">
              <DropdownSelect name='demo' mode="tags" labelText='Demo' options={mockedOptions} />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  )
}

describe('Dropdown-select', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<DropdownSelect {...dropdownSelectProps} />))).toMatchSnapshot()
  })

  describe('should work when integrating with Formik', () => {
    it('Render error correctly', async () => {
      const wrapper = mount(<ErrorFomrikComponent />)
      const select = wrapper.find('Select')
      await act(async () => {
        select.simulate('change', { target: { name: 'demo', value: 'b' } })
      })

      wrapper.update()

      expect(wrapper.find('Select').props().value).toBe('b')
    })
  })

  it('Render label correctly', () => {
    const wrapper = createFormikWrapper()
    const label = wrapper.find('label').first()
    expect(label.text()).toBe('Demo')
  })

  it('Map value correctly from formik', async () => {
    const wrapper = createFormikWrapper()

    await act(async () => {
      wrapper.find('Select').simulate('change', {
        target: {
          name: 'demo',
          value: 'a',
        },
      })
    })
    wrapper.update()
    expect(wrapper.find('Select').prop('value')).toEqual('a')
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
