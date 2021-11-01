import React, { FC } from 'react'
import { Subtitle, SmallText } from '@reapit/elements'
import { HelperWidgetConfig } from './config'
import { HelperContentType } from './helper-widget'

export interface HelperWidgetProps {
  config: HelperWidgetConfig
  contentType: HelperContentType
}

export const HelperWidgetContent: FC<HelperWidgetProps> = ({ contentType, config: { title, videos, docs } }) => {
  return (
    <>
      <Subtitle hasBoldText>{title}</Subtitle>
      {contentType === HelperContentType.videos &&
        videos.map(({ url, heading, imageUrl, body }) => (
          <>
            <img src={imageUrl} />
            <Subtitle>{heading}</Subtitle>
            <SmallText hasGreyText>{body}</SmallText>
            <a href={url}>View on Youtube</a>
          </>
        ))}
      {contentType === HelperContentType.docs &&
        docs.map(({ url, heading, imageUrl, body }) => (
          <>
            <img src={imageUrl} />
            <Subtitle>{heading}</Subtitle>
            <SmallText hasGreyText>{body}</SmallText>
            <a href={url}>View on Youtube</a>
          </>
        ))}
    </>
  )
}
