import * as React from 'react'
import { cx } from '@linaria/core'
import { sectionContainer, hasBackgroundSection, gridItem } from './__styles__'
import { BodyText, elPy7, Subtitle, Title } from '@reapit/elements'

export type SectionProps = {
  background?: string
  image: string
  heading: string
  subheading: string
  description: string
  button?: JSX.Element
}

export const Section: React.FC<SectionProps> = ({
  background,
  image,
  heading,
  subheading,
  description,
  button,
}: SectionProps) => {
  return (
    <div
      className={cx(elPy7, sectionContainer)}
      style={{
        background: background || 'white',
      }}
    >
      <div className={cx(!!background && hasBackgroundSection)}>
        <Title>{heading}</Title>
        <Subtitle>{subheading}</Subtitle>
        <BodyText>{description}</BodyText>
        {!!button && button}
      </div>

      <div className={cx('flex items-center justify-center', gridItem)}>
        <img alt={heading} src={image} />
      </div>
    </div>
  )
}

export default React.memo(Section)
