import React from 'react'
import { cx } from '@linaria/core'
import {
  triangle1,
  triangle2,
  triangle3,
  container,
  background,
  keyhole,
  keyholeMask,
  key,
  star,
  starActive,
  triangleActive,
  keyActive,
} from './__styles__/key-animation'
import backgroundImage from '../../assets/images/key-animation/background.svg'
import keyholeImage from '../../assets/images/key-animation/keyhole.svg'
import keyImage from '../../assets/images/key-animation/key.svg'
import starImage from '../../assets/images/key-animation/star.svg'

export const KeyAnimation = ({ step }: { step: 1 | 2 | 3 }) => {
  return (
    <>
      <div className={cx(container)}>
        <div className={cx(background)}>
          <img src={backgroundImage} />
        </div>
        <div className={cx(keyhole)}>
          <div className={cx(keyholeMask)} />
          <div className={cx(key, step >= 1 && keyActive)}>
            <img src={keyImage} />
          </div>
          <img src={starImage} className={cx(star, step === 3 && starActive)} />
          <img src={starImage} className={cx(star, step === 3 && starActive)} />
          <img src={starImage} className={cx(star, step === 3 && starActive)} />
          <img src={keyholeImage} />
        </div>
        <div className={cx(triangle1, step >= 1 && triangleActive)} />
        <div className={cx(triangle2, step >= 1 && triangleActive)} />
        <div className={cx(triangle3, step >= 1 && triangleActive)} />
      </div>
    </>
  )
}
