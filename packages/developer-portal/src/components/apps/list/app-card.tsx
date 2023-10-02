import React, { FC } from 'react'
import { useNavigate } from 'react-router'
import { AppSummaryModel } from '@reapit/foundations-ts-definitions'
import Routes from '../../../constants/routes'
import { Card, elFadeIn } from '@reapit/elements'
import { navigateRoute } from '../../../utils/navigation'
import defaultAppIcon from '../../../assets/images/default-app-icon.jpg'
import { cx } from '@linaria/core'
import { cardCursor } from './__styles__'

export interface AppCardProps {
  app: AppSummaryModel
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
      mainCardImgUrl={iconUri ?? defaultAppIcon}
    />
  )
}
