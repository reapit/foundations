import * as React from 'react'
import {
  H3,
  Button,
  GridFourCol,
  GridFourColItem,
  H4,
  FlexContainerResponsive,
  H6,
  FlexContainerBasic,
} from '@reapit/elements'
import getStartedImg from '@/assets/images/get-started.png'
import installImg from '@/assets/images/install.png'
import supportImg from '@/assets/images/support.png'
import { buttonContainer, contentContainer } from './__styles__'
import { history } from '@/core/router'
import Routes from '@/constants/routes'

export interface HelpItem {
  imgSrc: string
  header: string
  text: string
  buttonText: string
  buttonOnClick: () => void
}

export const helpItems = (): HelpItem[] => [
  {
    imgSrc: getStartedImg,
    header: 'Get Started',
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus minima inventore quidem sequirerum
     exercitationem quaerat consequuntur porro iure possimus.`,
    buttonText: 'Read More',
    buttonOnClick: () => history.push(Routes.GET_STARTED),
  },
  {
    imgSrc: installImg,
    header: 'Install Agency Cloud',
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus minima inventore quidem sequirerum
     exercitationem quaerat consequuntur porro iure possimus.`,
    buttonText: 'Install',
    buttonOnClick: () => {},
  },
  {
    imgSrc: supportImg,
    header: 'Support',
    text: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Doloribus minima inventore quidem sequirerum
     exercitationem quaerat consequuntur porro iure possimus.`,
    buttonText: 'Contact',
    buttonOnClick: () => {},
  },
]

export const Home: React.FC = () => {
  const items = helpItems()
  return (
    <FlexContainerResponsive flexColumn hasBackground hasPadding>
      <H3>Welcome</H3>
      <H6>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Eos earum velit veniam enim deleniti fugit optio
        obcaecati, totam fuga molestias?
      </H6>
      <GridFourCol>
        {items.map(({ imgSrc, header, text, buttonText, buttonOnClick }) => (
          <GridFourColItem key={header}>
            <FlexContainerBasic className={contentContainer} flexColumn centerContent hasPadding>
              <div>
                <img src={imgSrc} alt={header} />
              </div>
              <H4 isCentered>{header}</H4>
              <p>{text}</p>

              <div className={buttonContainer}>
                <Button type="button" variant="primary" onClick={buttonOnClick}>
                  {buttonText}
                </Button>
              </div>
            </FlexContainerBasic>
          </GridFourColItem>
        ))}
      </GridFourCol>
    </FlexContainerResponsive>
  )
}

export default Home
