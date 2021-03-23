import * as React from 'react'
import { Story } from '@storybook/react/types-6-0'
import { Tile, TileProps } from './index'
import { Button } from '../Button/index'
import { FaMapMarkerAlt, FaClock, FaStreetView, FaStickyNote, FaEllipsisH } from 'react-icons/fa'
import { IconList } from '../IconList/index'
import { ReapitLogo } from '../Menu/Logo'

const footerItems = [
  <>
    <Button type="submit" variant="primary" onClick={() => null} disabled={false} loading={false} fullWidth={false}>
      Details
    </Button>
    <Button type="submit" variant="primary" onClick={() => null} disabled={false} loading={false} fullWidth={false}>
      Directions
    </Button>
  </>,
]

const iconItems = [
  {
    icon: <FaClock className="icon-list-icon" />,
    text: '11:00 AM - 12:00 PM',
  },
  {
    icon: <FaStreetView className="icon-list-icon" />,
    text: 'Viewing',
  },
  {
    icon: <FaStickyNote className="icon-list-icon" />,
    text: 'Info about the viewing',
  },
]

export default {
  title: 'Components/Tile',
  component: Tile,
}

export const AddressTile: Story<TileProps> = (args) => (
  <Tile {...args}>
    <IconList items={iconItems} />
  </Tile>
)
AddressTile.args = {
  heading: '15 Furzen Cresent',
  subHeading: 'Hatfield Hertfordshire AL10 9QN',
  subHeadingAdditional: 'Viewing',
  footerItems,
  icon: <FaMapMarkerAlt className="media-icon" />,
}

export const AddressTileHightlighted: Story<TileProps> = (args) => (
  <Tile {...args}>
    <IconList items={iconItems} />
  </Tile>
)
AddressTileHightlighted.args = {
  hightlight: true,
  heading: '15 Furzen Cresent',
  subHeading: 'Hatfield Hertfordshire AL10 9QN',
  subHeadingAdditional: 'Viewing',
  footerItems,
  icon: <FaMapMarkerAlt className="media-icon" />,
}

export const AppTile: Story<TileProps> = (args) => (
  <Tile {...args}>
    <p>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, eum esse nisi cumque quisquam incidunt atque
      explicabo dignissimos numquam eligendi perspiciatis adipisci totam reiciendis error? Esse rerum officiis ipsam
      delectus!
    </p>{' '}
  </Tile>
)
AppTile.args = {
  heading: 'Geo Diary',
  subHeading: 'Reapit Ltd',
  subHeadingAdditional: 'Integration',
  image: <ReapitLogo className="image" />,
  menu: <FaEllipsisH className="media-icon" />,
}
