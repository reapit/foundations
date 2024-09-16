import React, { FC } from 'react'
import { BodyText, Button, ButtonGroup, elMb11 } from '@reapit/elements'
import { openNewPage } from '../../../utils/navigation'
import { URLS } from '../../../constants/urls'

export const ChangePasswordForm: FC = () => {
  const appEnv = process.env.appEnv

  return (
    <>
      <BodyText hasGreyText>Please use the Reapit Connect My Account app to manage your account</BodyText>
      <ButtonGroup className={elMb11}>
        <Button intent="primary" type="submit" onClick={openNewPage(`${URLS[appEnv].reapitConnectMyAccount}`)}>
          Manage Account
        </Button>
      </ButtonGroup>
    </>
  )
}
