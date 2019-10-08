import React from 'react'
import { storiesOf } from '@storybook/react'
import { Tile } from './index'
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
  </>
]

const iconItems = [
  {
    icon: <FaClock className="icon-list-icon" />,
    text: '11:00 AM - 12:00 PM'
  },
  {
    icon: <FaStreetView className="icon-list-icon" />,
    text: 'Viewing'
  },
  {
    icon: <FaStickyNote className="icon-list-icon" />,
    text: 'Info about the viewing'
  }
]

storiesOf('Tile', module)
  .add('AddressTile', () => (
    <Tile
      heading="15 Furzen Cresent"
      subHeading="Hatfield Hertfordshire AL10 9QN"
      footerItems={footerItems}
      icon={<FaMapMarkerAlt className="media-icon" />}
    >
      <IconList items={iconItems} />
    </Tile>
  ))

  .add('AddressTileHightlighted', () => (
    <Tile
      hightlight
      heading="15 Furzen Cresent"
      subHeading="Hatfield Hertfordshire AL10 9QN"
      footerItems={footerItems}
      icon={<FaMapMarkerAlt className="media-icon" />}
    >
      <IconList items={iconItems} />
    </Tile>
  ))

  .add('AppTile', () => (
    <Tile
      heading="Geo Diary"
      icon={<ReapitLogo className="media-icon-large" />}
      menu={<FaEllipsisH className="media-icon" />}
    >
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque, eum esse nisi cumque quisquam incidunt atque
        explicabo dignissimos numquam eligendi perspiciatis adipisci totam reiciendis error? Esse rerum officiis ipsam
        delectus!
      </p>
    </Tile>
  ))
