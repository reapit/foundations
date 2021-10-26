import React from 'react'
import { cx } from '@linaria/core'
import { triangle1, triangle2, triangle3, container, background } from './__styles__/key-animation'
import backgroundImage from '../../assets/images/key-animation/background.svg'

console.log('img', backgroundImage)

export const KeyAnimation = ({ step }: { step: 1 | 2 | 3 }) => {
  return (
    <>
      <div className={cx(container)}>
        <div className={cx(background)}>
          <img src={backgroundImage} />
        </div>
        <div className={cx(triangle1)} />
        <div className={cx(triangle2)} />
        <div className={cx(triangle3)} />
      </div>
    </>
  )
}
