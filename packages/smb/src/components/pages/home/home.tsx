import * as React from 'react'
import { H3, Button, GridFourCol, GridFourColItem, H4, FlexContainerResponsive, H6 } from '@reapit/elements'
import getStartedImg from '@/assets/images/get-started.png'
import installImg from '@/assets/images/install.png'
import supportImg from '@/assets/images/support.png'
import { WrapperAction, WrapperContent } from './__styles__/styles'

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
    buttonOnClick: () => {},
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
            <WrapperContent flexColumn centerContent hasPadding>
              <div>
                <img src={imgSrc} alt={header} />
              </div>
              <H4 isCentered>{header}</H4>
              <p>{text}</p>

              <WrapperAction>
                <Button type="button" variant="primary" onClick={buttonOnClick}>
                  {buttonText}
                </Button>
              </WrapperAction>
            </WrapperContent>
          </GridFourColItem>
        ))}
      </GridFourCol>
    </FlexContainerResponsive>
  )
}

export default Home
