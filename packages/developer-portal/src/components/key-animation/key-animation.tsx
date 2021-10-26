import React from 'react'
import { cx } from '@linaria/core'
import { triangle1, triangle2, triangle3, container } from './__styles__/key-animation'

export const LoginAnimiation = ({
  step,
}: {
  step: 1 | 2 | 3,
}) => {
  return (
    <>
      <div className={cx(container)}>
        <div className={cx(triangle1)}/>
        <div className={cx(triangle2)}/>
        <div className={cx(triangle3)}/>
      </div>
    </>
  )
}
