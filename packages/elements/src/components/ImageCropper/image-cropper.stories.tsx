import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { ImageCropper, generateBase64FromCanvas, ImageCropperWithInput } from './index'
import { action } from '@storybook/addon-actions'
import { Button } from '../Button'
import { Form, Formik } from 'formik'

storiesOf('ImageCropper', module)
  .add('Pre-integrated ImageInput', () => {
    return (
      <section className="section">
        <Formik
          initialValues={{ imageInput: '' }}
          onSubmit={values => {
            action('Form values')(values)
          }}
        >
          {() => (
            <Form>
              <ImageCropperWithInput name="imageInput" labelText="IMAGE CROPPER" aspect={16 / 9} />
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </section>
    )
  })
  .add('Custom input', () => {
    const [upImg, setUpImg] = React.useState<string>('')
    const [visible, setVisible] = React.useState<boolean>(false)
    const [croppedImage, setCroppedImage] = React.useState<string>('')

    return (
      <div>
        <input
          type="file"
          name="file-input-custom"
          onChange={e => {
            if (e.target.files && e.target.files.length > 0) {
              const reader = new FileReader()
              reader.addEventListener('load', () => {
                setUpImg(reader.result as string)
                setVisible(true)
              })
              reader.readAsDataURL(e.target.files[0])
            }
          }}
        />
        <ImageCropper
          upImg={upImg}
          setUpImg={setUpImg}
          setCroppedImage={setCroppedImage}
          croppedImage={croppedImage}
          visible={visible}
          setVisible={setVisible}
          onClose={() => setVisible(false)}
          onCropClick={({ previewCanvasRef, completedCrop }) => {
            const result = generateBase64FromCanvas(previewCanvasRef.current as HTMLCanvasElement, completedCrop)
            action('Data base64')(result)
          }}
        />
      </div>
    )
  })
