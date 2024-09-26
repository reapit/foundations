import React, { FC } from 'react'
import { useNavigate } from 'react-router'
import { Marketplace } from '@reapit/foundations-ts-definitions'
import Routes from '../../../constants/routes'
import { Card, PlaceholderImage, elFadeIn } from '@reapit/elements'
import { navigateRoute } from '../../../utils/navigation'
import { cx } from '@linaria/core'
import { cardCursor } from './__styles__'

export interface AppCardProps {
  app: Marketplace.AppSummaryModel
}

export const AppCard: FC<AppCardProps> = ({ app }) => {
  const navigate = useNavigate()

  const { id, name, isDirectApi, developer, iconUri } = app

  return (
    <Card
      className={cx(elFadeIn, cardCursor)}
      onClick={navigateRoute(navigate, `${Routes.APPS}/${id}`)}
      hasMainCard
      mainCardHeading={name}
      mainCardSubHeading={developer}
      mainCardSubHeadingAdditional={isDirectApi ? 'Integration' : ''}
      mainCardAvatarUrl={iconUri ?? <PlaceholderImage placeholder="placeholderSmall" size={50} />}
    />
  )
}
