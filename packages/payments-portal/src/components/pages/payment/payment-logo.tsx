import React, { FC } from 'react'
import { styled } from '@linaria/react'

const Logo = styled.div`
  display: inline-block;
  height: 34px;
  min-width: 115px;
  img {
    height: 100%;
  }
`

export const PaymentLogo: FC = () => {
  return (
    <Logo>
      <img src="https://web-components.prod.paas.reapit.cloud/reapit-payments.png" />
    </Logo>
  )
}
