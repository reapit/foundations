import React, { FC } from 'react'
import { elMb11, elFadeIn, Subtitle, Grid, Col, BodyText, Table } from '@reapit/elements'
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
    <Table
      rows={[
        {
          cells: [
            {
              label: 'Authenticator Type',
              value: type === 'sms' ? 'Mobile SMS' : 'Authenticator App',
            },
            {
              label: 'Status',
              value: status === 'inProgress' ? 'Currently Configuring' : status === 'active' ? 'Active' : 'Disabled',
            },
            {
              label: 'Created',
              value: created ? dayjs(created).format('DD/MM/YYYY HH:mm') : '-',
            },
            {
              label: 'Last Updated',
              value: modified ? dayjs(modified).format('DD/MM/YYYY HH:mm') : '-',
            },
            {
              label: 'Actions',
              children: (
                <DeleteAuthenticator
                  authenticatorId={id}
                  userId={userId}
                  refreshAuthenticators={refreshAuthenticators}
                />
              ),
            },
          ],
        },
      ]}
    />
  )
}
