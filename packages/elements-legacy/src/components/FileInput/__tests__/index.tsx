import * as React from 'react'
import { render } from '../../../tests/react-testing'
import { FileInput, FileInputProps, handleChangeCroppedImage, clearFile } from '../index'
import { Formik } from 'formik'
import toJson from 'enzyme-to-json'
import { act } from 'react-dom/test-utils'

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
    expect(toJson(render(<FileInput {...props} />))).toMatchSnapshot()
  })

  it('should render label correctly', () => {
    const Wrapper = () => (
      <Formik initialValues={{ test: '' }} onSubmit={jest.fn()}>
        {() => {
          return <FileInput id="test" labelText="test" name="test" />
        }}
      </Formik>
    )

    const wrapper = render(<Wrapper />)
    const label = wrapper.find('[data-test="file-input-label"]')
    expect(label.text()).toBe('test')
  })

  it('should convert to base64 data correctly', (done) => {
    // setup
    let waitUntilDataReaderLoadResolver: any = null
    const waitUntilDataReaderLoad = new Promise((resolve) => {
      waitUntilDataReaderLoadResolver = resolve
    })

    let waitUntilFormSubmittedResolver: any = null
    const waitUntilFormSubmitted = new Promise((resolve) => {
      waitUntilFormSubmittedResolver = resolve
    })

    let submitForm

    // formik submit function was asynchronous
    const onSubmit = (values) => {
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
    const wrapper = render(<Wrapper />)
    const fileUploader = wrapper.find('input')

    fileUploader.simulate('change', {
      target: {
        files: [file],
      },
    })

    // assert filename test
    waitUntilDataReaderLoad.then(async () => {
      await act(async () => {
        submitForm()
      })
      waitUntilFormSubmitted.then((formValues) => {
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

    const wrapper = render(<Wrapper />)
    expect(wrapper.find('input[demo="test"]').length).toBe(1)
  })

  it('should render fileName correctly', (done) => {
    // setup
    let waitUntilDataReaderLoadResolver: any = null
    const waitUntilDataReaderLoad = new Promise((resolve) => {
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
    const wrapper = render(<Wrapper />)
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

describe('handleChangeCroppedImage', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  const field = {
    onChange: jest.fn(),
    name: 'inputFile',
    value: 'value',
    onBlur: jest.fn(),
  }

  const inputFile = {
    current: {
      value: 'value',
    },
  } as any

  const setFileName = jest.fn()

  it('should call correct functions when truthy croppedImage', () => {
    const fn = handleChangeCroppedImage({
      field,
      inputFile,
      setFileName,
      croppedImage: 'cropped',
    })
    fn()
    const spy = jest.spyOn(field, 'onChange')
    expect(spy).toHaveBeenCalledWith({
      target: {
        value: 'cropped',
        name: 'inputFile',
      },
    })
  })
  it('should call correct functions when croppedImage is empty string', () => {
    const fn = handleChangeCroppedImage({
      field,
      inputFile,
      setFileName,
      croppedImage: '',
    })
    fn()
    const spy = jest.spyOn(field, 'onChange')
    expect(spy).toHaveBeenCalledWith({
      target: {
        value: '',
        name: 'inputFile',
      },
    })
    expect(setFileName).toHaveBeenCalledWith('')
  })
  it('should return when croppedImage === undefined', () => {
    const fn = handleChangeCroppedImage({
      field,
      inputFile,
      setFileName,
    })
    const result = fn()
    expect(result).toBeUndefined()
  })
})

describe('clearFile', () => {
  it('should run correctly', () => {
    const onChange = jest.fn()
    const setFieldName = jest.fn()
    const field = {
      onChange,
    }
    const inputFile = 'test'
    const fn = clearFile(field, setFieldName, inputFile)
    fn()
    expect(onChange).toBeCalled()
    expect(setFieldName).toBeCalledWith('')
  })
})
