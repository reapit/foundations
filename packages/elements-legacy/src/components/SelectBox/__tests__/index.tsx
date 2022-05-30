import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { SelectBox, SelectBoxOptions, SelectBoxProps } from '../index'
import { Formik, Form, FormikErrors } from 'formik'
import toJson from 'enzyme-to-json'
import { act } from 'react-dom/test-utils'
import { Section } from '../../Layout'

const mockedOptions: SelectBoxOptions[] = [
  { label: 'a', value: 'a' },
  { label: 'b', value: 'b' },
]
const selectBoxProps: SelectBoxProps = {
  options: mockedOptions,
  name: 'demo',
  labelText: 'demo',
  id: 'demo',
  helpText: 'This is helper text',
}

const createFormikWrapper = () => {
  const wrapper = render(
    <Formik onSubmit={jest.fn()} initialValues={{ demo: 'b' }}>
      {() => (
        <Form>
          <div className="column is-half-desktop">
            <SelectBox name="demo" options={mockedOptions} labelText="Demo" id="test" />
          </div>
        </Form>
      )}
    </Formik>,
  )

  return wrapper
}

const ErrorFomrikComponent = () => {
  return (
    <Section hasPadding={true} style={{ background: '#f5f7f9' }}>
      <Formik
        validate={(values) => {
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
              <SelectBox dataTest="select-box" name="demo" options={mockedOptions} labelText="Demo" id="test" />
            </div>
          </Form>
        )}
      </Formik>
    </Section>
  )
}

describe('SelectBox', () => {
  it('should match a snapshot', () => {
    expect(toJson(render(<SelectBox {...selectBoxProps} />))).toMatchSnapshot()
  })

  describe('should work when integrating with Formik', () => {
    it('Render error correctly', async () => {
      const wrapper = render(<ErrorFomrikComponent />)
      const select = wrapper.find('select')
      await act(async () => {
        select.simulate('change', { target: { name: 'demo', value: 'b' } })
      })

      wrapper.update()

      expect(wrapper.find('select').props().value).toBe('b')
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
      wrapper.find('select').simulate('change', {
        target: {
          name: 'demo',
          value: 'a',
        },
      })
    })
    wrapper.update()
    expect(wrapper.find('select').prop('value')).toEqual('a')
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
