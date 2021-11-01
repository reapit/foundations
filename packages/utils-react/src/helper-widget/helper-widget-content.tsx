import React, { FC } from 'react'
import { Subtitle, SmallText, BodyText, elFadeIn, elMb5 } from '@reapit/elements'
import { HelperWidgetConfig } from './config'
import { HelperContentType } from './helper-widget'
import { HelperWidgetContentContainer, HelperWidgetHeadingContainer } from './__styles__'

export interface HelperWidgetProps {
  config: HelperWidgetConfig
  contentType: HelperContentType
}

export const HelperWidgetContent: FC<HelperWidgetProps> = ({ contentType, config: { title, videos, docs } }) => {
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
            <SmallText className={elMb5} hasGreyText hasNoMargin>
              {body}
            </SmallText>
            <a href={url}>View on Youtube</a>
          </HelperWidgetContentContainer>
        ))}
      {contentType === HelperContentType.docs &&
        docs.map(({ url, heading, image, body }, index: number) => (
          <HelperWidgetContentContainer className={elFadeIn} key={index}>
            {image}
            <BodyText>{heading}</BodyText>
            <SmallText className={elMb5} hasGreyText hasNoMargin>
              {body}
            </SmallText>
            <a href={url}>View on Youtube</a>
          </HelperWidgetContentContainer>
        ))}
    </>
  )
}
