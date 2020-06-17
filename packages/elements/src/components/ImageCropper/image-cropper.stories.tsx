import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { ImageCropper } from './index'

storiesOf('ImageCropper', module).add('Default', () => {
  const [upImg, setUpImg] = React.useState<any>()
  const [isVisible, setIsVisible] = React.useState<boolean>(false)
  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => {
        setUpImg(reader.result)
        setIsVisible(true)
      })
      reader.readAsDataURL(e.target.files[0])
    }
  }
  return (
    <section className="section">
      <input type="file" accept="image/*" onChange={onSelectFile} />
      <ImageCropper upImg={upImg} visible={isVisible} onClose={() => setIsVisible(false)} />
    </section>
  )
})
