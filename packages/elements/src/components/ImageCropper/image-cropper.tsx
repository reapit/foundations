import * as React from 'react'
import ReactCrop from 'react-image-crop'
import 'react-image-crop/dist/ReactCrop.css'

// We resize the canvas down when saving on retina devices otherwise the image
// will be double or triple the preview size.
export const getResizedCanvas = (canvas, newWidth, newHeight) => {
  const tmpCanvas = document.createElement('canvas')
  tmpCanvas.width = newWidth
  tmpCanvas.height = newHeight

  const ctx = tmpCanvas.getContext('2d')
  ctx.drawImage(canvas, 0, 0, canvas.width, canvas.height, 0, 0, newWidth, newHeight)

  return tmpCanvas
}

export const generateDownload = (previewCanvas, crop) => {
  if (!crop || !previewCanvas) {
    return
  }

  const dpr = window.devicePixelRatio || 1
  const canvas = dpr !== 1 ? getResizedCanvas(previewCanvas, crop.width, crop.height) : previewCanvas

  canvas.toBlob(
    blob => {
      const previewUrl = window.URL.createObjectURL(blob)

      const anchor = document.createElement('a')
      anchor.download = 'cropPreview.png'
      anchor.href = URL.createObjectURL(blob)
      anchor.click()

      window.URL.revokeObjectURL(previewUrl)
    },
    'image/png',
    1,
  )
}

export const ImageCropper = () => {
  const [isVisible, setIsVisible] = React.useState<boolean>(false)
  const [upImg, setUpImg] = React.useState<any>()
  const imgRef = React.useRef<HTMLElement>(null)
  const previewCanvasRef = React.useRef(null)
  const [crop, setCrop] = React.useState({ unit: '%', width: 30, aspect: 16 / 9 })
  const [completedCrop, setCompletedCrop] = React.useState(null)

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

  const onLoad = React.useCallback(img => {
    imgRef.current = img
  }, [])

  React.useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) {
      return
    }

    const image = imgRef.current
    const canvas = previewCanvasRef.current
    const crop = completedCrop
    const dpr = window.devicePixelRatio || 1

    const scaleX = image.naturalWidth / image.width
    const scaleY = image.naturalHeight / image.height
    const ctx = canvas.getContext('2d')

    canvas.width = crop.width * dpr
    canvas.height = crop.height * dpr

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width * dpr,
      crop.height * dpr,
    )
  }, [completedCrop])

  return (
    <div>
      <div>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>
      {isVisible && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            height: '100%',
            width: '100%',
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 999,
            background: 'gray',
          }}
        >
          <div style={{ maxWidth: 640 }}>
            <ReactCrop
              src={upImg}
              onImageLoaded={onLoad}
              crop={crop}
              onChange={c => setCrop(c)}
              onComplete={c => setCompletedCrop(c)}
            />
            <canvas ref={previewCanvasRef} />
            <button
              type="button"
              disabled={!completedCrop?.width || !completedCrop?.height}
              onClick={() => generateDownload(previewCanvasRef.current, completedCrop)}
            >
              Download cropped image
            </button>
            <button type="button" onClick={() => setIsVisible(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default ImageCropper
