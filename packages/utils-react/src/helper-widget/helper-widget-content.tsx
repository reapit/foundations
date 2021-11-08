import React, { FC } from 'react'
import { Subtitle, SmallText, BodyText, elFadeIn, useModal } from '@reapit/elements'
import { HelperWidgetConfig } from './config'
import { HelperContentType } from './helper-widget'
import { HelperWidgetContentContainer, HelperWidgetHeadingContainer, HelperWidgetLink } from './__styles__'

export interface HelperWidgetProps {
  config: HelperWidgetConfig
  contentType: HelperContentType
}

export const HelperWidgetContent: FC<HelperWidgetProps> = ({ contentType, config: { title, videos, docs } }) => {
  const { Modal, openModal } = useModal()
  return (
    <>
      <HelperWidgetHeadingContainer>
        <Subtitle hasBoldText hasNoMargin>
          {title}
        </Subtitle>
      </HelperWidgetHeadingContainer>
      {contentType === HelperContentType.videos &&
        videos.map(({ url, heading, image, body }, index: number) => (
          <HelperWidgetContentContainer className={elFadeIn} key={index}>
            {image}
            <BodyText>{heading}</BodyText>
            <SmallText hasGreyText>{body}</SmallText>
            <HelperWidgetLink onClick={openModal}>View on Youtube</HelperWidgetLink>
            <Modal title={heading}>
              <iframe src={url} style={{ border: 'none', width: '100%', height: '600px' }} />
            </Modal>
          </HelperWidgetContentContainer>
        ))}
      {contentType === HelperContentType.docs &&
        docs.map(({ url, heading, image, body }, index: number) => (
          <HelperWidgetContentContainer className={elFadeIn} key={index}>
            {image}
            <BodyText>{heading}</BodyText>
            <SmallText hasGreyText>{body}</SmallText>
            <HelperWidgetLink onClick={openModal}>View in docs</HelperWidgetLink>
            <Modal title={heading}>
              <iframe src={url} style={{ border: 'none', width: '100%', height: '100%' }} />
            </Modal>
          </HelperWidgetContentContainer>
        ))}
    </>
  )
}
