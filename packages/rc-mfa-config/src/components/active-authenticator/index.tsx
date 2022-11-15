import React, { FC } from 'react'
import { elMb11, elFadeIn, Subtitle, Grid, Col, BodyText } from '@reapit/elements'
import { cx } from '@linaria/core'
import { AuthenticatorModel } from '@reapit/foundations-ts-definitions'
import dayjs from 'dayjs'
import { DeleteAuthenticator } from './delete-authenticator'

interface ActiveAuthenticatorProps {
  activeAuthenticator: AuthenticatorModel
  refreshAuthenticators: () => void
}

export const ActiveAuthenticator: FC<ActiveAuthenticatorProps> = ({ activeAuthenticator, refreshAuthenticators }) => {
  const { id, type, created, status, modified, userId } = activeAuthenticator
  return (
    <>
      <Grid className={cx(elMb11, elFadeIn)}>
        <Col>
          <Subtitle hasNoMargin>Authenticator Type</Subtitle>
          <BodyText hasGreyText hasNoMargin>
            {type === 'sms' ? 'Mobile SMS' : 'Authenticator App'}
          </BodyText>
        </Col>
        <Col>
          <Subtitle hasNoMargin>Status</Subtitle>
          <BodyText hasGreyText hasNoMargin>
            {status === 'inProgress' ? 'Currently Configuring' : status === 'active' ? 'Active' : 'Disabled'}
          </BodyText>
        </Col>
        <Col>
          <Subtitle hasNoMargin>Created</Subtitle>
          <BodyText hasGreyText hasNoMargin>
            {modified ? dayjs(created).format('DD/MM/YYYY HH:mm') : '-'}
          </BodyText>
        </Col>
        <Col>
          <Subtitle hasNoMargin>Last Updated</Subtitle>
          <BodyText hasGreyText hasNoMargin>
            {modified ? dayjs(modified).format('DD/MM/YYYY HH:mm') : '-'}
          </BodyText>
        </Col>
      </Grid>
      <DeleteAuthenticator authenticatorId={id} userId={userId} refreshAuthenticators={refreshAuthenticators} />
    </>
  )
}
