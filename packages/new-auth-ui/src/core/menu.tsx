import React, { FC } from 'react'
import { useLocation } from 'react-router'
import { NavResponsive, NavResponsiveOption } from '@reapit/elements'
import { memo } from 'react'
// Commenting out until next Christmas
// import dayjs from 'dayjs'
// import isBetween from 'dayjs/plugin/isBetween'
// import WeekOneXmas from '../assets/images/xmas-logos/Week1.png'
// import WeekTwoXmas from '../assets/images/xmas-logos/Week2.png'
// import WeekThreeXmas from '../assets/images/xmas-logos/Week3.png'
// import WeekFourXmas from '../assets/images/xmas-logos/Week4.png'
// import { styled } from '@linaria/react'

// const XmasImage = styled.img`
//   height: 2.5rem;
//   width: 2.5rem;
// `

// dayjs.extend(isBetween)

// export const XmasLogo: React.FC = () => {
//   const now = dayjs()

//   if (now.isBetween('2021-11-30', '2021-12-07', 'day')) {
//     return <XmasImage src={WeekOneXmas} />
//   }

//   if (now.isBetween('2021-12-06', '2021-12-14', 'day')) {
//     return <XmasImage src={WeekTwoXmas} />
//   }

//   if (now.isBetween('2021-12-13', '2021-12-21', 'day')) {
//     return <XmasImage src={WeekThreeXmas} />
//   }

//   if (now.isBetween('2021-12-20', '2021-12-27', 'day')) {
//     return <XmasImage src={WeekFourXmas} />
//   }

//   return <Icon iconSize="medium" icon="reapitLogoMenu" />
// }

export const getDefaultNavIndex = (pathname: string) => {
  if (pathname.includes('/apps')) return 1
  if (pathname.includes('/analytics/')) return 2
  if (pathname.includes('/webhooks')) return 3
  if (pathname.includes('/settings')) return 8
}

export const Menu: FC = () => {
  const location = useLocation()
  const { pathname } = location

  const navOptions = [].filter(Boolean) as NavResponsiveOption[]

  return <NavResponsive defaultNavIndex={getDefaultNavIndex(pathname)} options={navOptions} />
}

export default memo(Menu)
