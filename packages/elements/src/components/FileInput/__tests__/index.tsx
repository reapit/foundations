import * as React from 'react'
import { shallow, mount } from 'enzyme'
import { FileInput, FileInputProps } from '../index'
import { Formik } from 'formik'
import toJson from 'enzyme-to-json'

const props: FileInputProps = {
  name: 'test',
  id: 'test',
  labelText: 'test',
  inputProps: {
    className: 'test',
  },
}

describe('FileInput', () => {
  it('should match a snapshot', () => {
    expect(toJson(shallow(<FileInput {...props} />))).toMatchSnapshot()
  })

  it('should render label correctly', () => {
    const Wrapper = () => (
      <Formik initialValues={{ test: '' }} onSubmit={jest.fn()}>
        {() => {
          return <FileInput id="test" labelText="test" name="test" />
        }}
      </Formik>
    )

    const wrapper = mount(<Wrapper />)
    const label = wrapper.find('[data-test="file-input-label"]')
    expect(label.text()).toBe('test')
  })

  it('should render error correctly', done => {
    // setup
    let waitUntilFormSubmittedResolver: any = null

    let submitForm

    // formik submit function was asynchronous
    let onSubmit = values => {
      waitUntilFormSubmittedResolver(values)
    }

    const Wrapper = () => (
      <Formik validate={() => ({ test: 'test' })} initialValues={{ test: '' }} onSubmit={onSubmit}>
        {({ handleSubmit }) => {
          submitForm = handleSubmit

          // force form vaidate to test
          return <FileInput id="test" labelText="test" name="test" />
        }}
      </Formik>
    )

    // trigger upload even
    const wrapper = mount(<Wrapper />)

    submitForm()

    // validate function of is asynchornous and non blocking. use setimeout to push assertion
    // function into event loop queue
    setTimeout(() => {
      wrapper.update()
      const error = wrapper.find('.has-text-danger')
      console.log(error.at(0).html())

      done()
    }, 1)
  })

  it('should convert to base64 data correctly', done => {
    // setup
    let waitUntilDataReaderLoadResolver: any = null
    const waitUntilDataReaderLoad = new Promise(resolve => {
      waitUntilDataReaderLoadResolver = resolve
    })

    let waitUntilFormSubmittedResolver: any = null
    const waitUntilFormSubmitted = new Promise(resolve => {
      waitUntilFormSubmittedResolver = resolve
    })

    let submitForm

    // formik submit function was asynchronous
    let onSubmit = values => {
      waitUntilFormSubmittedResolver(values)
    }

    const Wrapper = () => (
      <Formik initialValues={{ test: '' }} onSubmit={onSubmit}>
        {({ handleSubmit }) => {
          submitForm = handleSubmit
          return (
            <FileInput
              testProps={{
                waitUntilDataReaderLoadResolver,
              }}
              id="test"
              labelText="test"
              name="test"
            />
          )
        }}
      </Formik>
    )

    // trigger upload even
    const file = new File(['a'], 'test.png', { type: 'image/png' })
    const wrapper = mount(<Wrapper />)
    const fileUploader = wrapper.find('input')

    fileUploader.simulate('change', {
      target: {
        files: [file],
      },
    })

    // assert filename test
    waitUntilDataReaderLoad.then(() => {
      submitForm()
      waitUntilFormSubmitted.then(formValues => {
        expect(formValues).toEqual({
          test: 'data:image/png;base64,YQ==',
        })
        done()
      })
    })
  })

  it('Spread the input props to input element', () => {
    const Wrapper = () => (
      <Formik onSubmit={jest.fn()} initialValues={{ test: '' }}>
        {() => {
          return (
            <FileInput
              inputProps={{
                demo: 'test',
              }}
              id="test"
              labelText="test"
              name="test"
            />
          )
        }}
      </Formik>
    )

    const wrapper = mount(<Wrapper />)
    expect(wrapper.find('input[demo="test"]').length).toBe(1)
  })

  it('should render fileName correctly', done => {
    // setup
    let waitUntilDataReaderLoadResolver: any = null
    const waitUntilDataReaderLoad = new Promise(resolve => {
      waitUntilDataReaderLoadResolver = resolve
    })

    const Wrapper = () => (
      <Formik initialValues={{ test: '' }} onSubmit={jest.fn()}>
        {() => {
          return (
            <FileInput
              testProps={{
                waitUntilDataReaderLoadResolver,
              }}
              id="test"
              labelText="test"
              name="test"
            />
          )
        }}
      </Formik>
    )

    // trigger upload even
    const file = new File(['a'], 'test.png', { type: 'image/png' })
    const wrapper = mount(<Wrapper />)
    const fileUploader = wrapper.find('input')

    fileUploader.simulate('change', {
      target: {
        files: [file],
      },
    })

    // assert filename test
    waitUntilDataReaderLoad.then(() => {
      const fileName = wrapper.find('[data-test="fileUploadFileName"]')
      expect(fileName.text()).toBe('test.png')
      done()
    })
    // dGVzdA== is base64 version of string 'text'
  })

  afterEach(() => {
    jest.resetAllMocks()
  })
})
