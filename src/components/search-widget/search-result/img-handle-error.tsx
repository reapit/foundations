import * as React from 'react'
import styled from 'styled-components'
const { useState } = React

const imgPlaceholder =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mN88xYAAssB20Ea4T8AAAAASUVORK5CYII='

const Img = styled.img`
  width: 100%;
  object-fit: cover;
`

/**
 * This img component handles
 */
export const ImgHandleError = React.memo(
  ({ src }: { src: string }) => {
    const [imgSrc, setImgSrc] = useState(imgPlaceholder)

    React.useEffect(() => {
      const img = document.createElement('img')
      img.src = src
      img.onload = () => {
        setImgSrc(src)
      }
    }, [src])

    return <Img src={imgSrc} />
  },
  () => {
    return false
  }
)
