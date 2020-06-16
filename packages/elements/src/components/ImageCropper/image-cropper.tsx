import React, { useState, useCallback, useRef, useEffect } from 'react'
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
  const [upImg, setUpImg] = useState()
  const imgRef = useRef(null)
  const previewCanvasRef = useRef(null)
  const [crop, setCrop] = useState({ unit: '%', width: 30, aspect: 16 / 9 })
  const [completedCrop, setCompletedCrop] = useState(null)

  const onSelectFile = e => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader()
      reader.addEventListener('load', () => setUpImg(reader.result))
      reader.readAsDataURL(e.target.files[0])
    }
  }

  const onLoad = useCallback(img => {
    imgRef.current = img
  }, [])

  useEffect(() => {
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
    <div className="App">
      <div>
        <input type="file" accept="image/*" onChange={onSelectFile} />
      </div>
      <ReactCrop
        src={upImg}
        onImageLoaded={onLoad}
        crop={crop}
        onChange={c => setCrop(c)}
        onComplete={c => setCompletedCrop(c)}
      />
      <div>
        <canvas
          ref={previewCanvasRef}
          style={{
            width: completedCrop?.width ?? 0,
            height: completedCrop?.height ?? 0,
          }}
        />
      </div>
      <p>
        For some browsers e.g. Chrome access from{' '}
        <a href="https://y831o.csb.app/" target="_blank" rel="noopener noreferrer">
          outside the preview iframe
        </a>{' '}
        to download due to programmatically triggering a click (security).
      </p>
      <p>
        The alternative would be to generate a blob each time the crop is complete and render out an anchor tag if you
        want to download from inside an iframe.
      </p>
      <button
        type="button"
        disabled={!completedCrop?.width || !completedCrop?.height}
        onClick={() => generateDownload(previewCanvasRef.current, completedCrop)}
      >
        Download cropped image
      </button>
    </div>
  )
}

export default ImageCropper
