import React, { FC, memo } from 'react'
import { useNavigate } from 'react-router'
import Routes from '../constants/routes'
import { Icon, NavResponsive, NavResponsiveOption } from '@reapit/elements'
import { navigateRoute } from '../utils/navigation'

export const Menu: FC = () => {
  const navigate = useNavigate()

  const navOptions = [
    {
      itemIndex: 0,
      callback: navigateRoute(navigate, Routes.HOME),
      icon: <Icon iconSize="medium" icon="reapitLogoMenu" />,
    },
  ].filter(Boolean) as NavResponsiveOption[]

  return <NavResponsive defaultNavIndex={1} options={navOptions} />
}

export default memo(Menu)
