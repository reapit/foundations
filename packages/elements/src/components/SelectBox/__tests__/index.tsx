import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { SelectBox, SelectBoxOptions, SelectBoxProps } from '../index'
import { Formik, Form, FormikErrors } from 'formik'
import toJson from 'enzyme-to-json'

const mockedOptions: SelectBoxOptions[] = [{ label: 'a', value: 'a' }, { label: 'b', value: 'b' }]
const selectBoxProps: SelectBoxProps = {
  options: mockedOptions,
  name: 'demo',
  labelText: 'demo',
  id: 'demo'
}

const createFormikWrapper = () => {
  const wrapper = mount(
    <Formik onSubmit={jest.fn()} initialValues={{ demo: 'b' }}>
      {() => (
        <Form>
          <div className="column is-half-desktop">
            <SelectBox name="demo" options={mockedOptions} labelText="Demo" id="test" />
          </div>
        </Form>
      )}
    </Formik>
  )

  return wrapper
}

const ErrorFomrikComponent = () => {
  return (
    <section className="section">
      <Formik
        validate={values => {
          const errors: FormikErrors<any> = {
            demo: ''
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
              <SelectBox dataTest="select-box" name="demo" options={mockedOptions} labelText="Demo" id="test" />
            </div>
          </Form>
        )}
      </Formik>
    </section>
  )
}

describe('SelectBox', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<SelectBox {...selectBoxProps} />))).toMatchSnapshot()
  })

  describe('should work when integrating with Formik', () => {
    it('Render error correctly', done => {
      const wrapper = mount(<ErrorFomrikComponent />)
      const select = wrapper.find('select')
      select.simulate('focus')
      select.simulate('change', { target: { name: 'demo', value: 'b' } })
      select.simulate('blur', { target: { name: 'demo', value: 'b' } })
      select.update()
      setTimeout(() => {
        expect(wrapper.find('select').props().value).toBe('b')
        done()
      }, 100)
    })
  })

  it('Render label correctly', () => {
    const wrapper = createFormikWrapper()
    const label = wrapper.find('label').first()
    expect(label.text()).toBe('Demo')
  })

  it('Map value correctly from formik', done => {
    const wrapper = createFormikWrapper()

    wrapper.find('select').simulate('change', {
      target: {
        value: 'a'
      }
    })
    setTimeout(() => {
      expect(wrapper.find('select').prop('value')).toEqual('a')
    }, 1)
    done()
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
