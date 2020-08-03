import * as React from 'react'
import { H2, SubTitleH4, SubTitleH6, GridItem } from '@reapit/elements'
import { cx } from 'linaria'
import { hasBackgroundSection, gridItem } from './__styles__'

export type SectionProps = {
  background?: string
  imageLeft?: boolean
  image: string
  heading: string
  subheading: string
  description: string
  button?: JSX.Element
}

export const Section: React.FC<SectionProps> = ({
  background,
  imageLeft = true,
  image,
  heading,
  subheading,
  description,
  button,
}: SectionProps) => {
  return (
    <div
      className="columns pt-4 pb-4"
      style={{
        background: background || 'white',
      }}
    >
      {imageLeft && (
        <GridItem className={gridItem}>
          <img alt={heading} src={image} />
        </GridItem>
      )}
      <GridItem className={cx(gridItem, !!background && hasBackgroundSection)}>
        <H2>{heading}</H2>
        <SubTitleH4>{subheading}</SubTitleH4>
        <SubTitleH6 className="mb-4">{description}</SubTitleH6>
        {!!button && button}
      </GridItem>
      {!imageLeft && (
        <GridItem className={gridItem}>
          <img alt={heading} src={image} />
        </GridItem>
      )}
    </div>
  )
}

export default React.memo(Section)
