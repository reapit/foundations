import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { SelectBox, SelectBoxOptions, SelectBoxProps } from '../index'
import { Formik, Form } from 'formik'
import toJson from 'enzyme-to-json'
const { useRef, useEffect } = React

const mockedOptions: SelectBoxOptions[] = [{ label: 'a', value: 'a' }, { label: 'b', value: 'b' }]
const selectBoxProps: SelectBoxProps = {
  options: mockedOptions,
  name: 'demo',
  labelText: 'demo',
  id: 'demo'
}

const createFormikWrapper = () => {
  const wrapper = mount(
    <Formik
      onSubmit={jest.fn()}
      initialValues={{ demo: 'b' }}
      render={() => (
        <Form>
          <div className="column is-half-desktop">
            <SelectBox name="demo" options={mockedOptions} labelText="Demo" id="test" />
          </div>
        </Form>
      )}
    />
  )

  return wrapper
}

const ErrorFomrikComponent = () => {
  const ref = React.useRef<Formik>(null)

  const mockedOptions: SelectBoxOptions[] = [{ label: 'option1', value: 'a' }, { label: 'option2', value: 'b' }]
  useEffect(() => {
    if (ref.current) {
      ref.current.setTouched({ demo: true })
    }
  }, [])

  return (
    <section className="section">
      <Formik
        ref={ref}
        validate={() => {
          return {
            demo: 'error'
          }
        }}
        initialValues={{ demo: 'b' }}
        onSubmit={jest.fn()}
        render={() => (
          <Form>
            <div className="column is-half-desktop">
              <SelectBox name="demo" options={mockedOptions} labelText="Demo" id="test" />
            </div>
          </Form>
        )}
      />
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
      // Since formik is asynchronous. Use setTimeout to move it to bottom of the event-lo
      setTimeout(() => {
        wrapper.update()
        const label = wrapper.find('.has-text-danger').first()
        expect(label.text()).toBe('error')
        done()
      }, 1)
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
