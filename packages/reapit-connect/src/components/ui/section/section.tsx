import * as React from 'react'
import { H2, SubTitleH4, SubTitleH6, GridItem, FlexContainerResponsive } from '@reapit/elements'
import { cx } from 'linaria'
import { sectionContainer, hasBackgroundSection, gridItem } from './__styles__'

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
      className={cx('columns pt-4 pb-4', sectionContainer)}
      style={{
        background: background || 'white',
      }}
    >
      <FlexContainerResponsive>
        <GridItem className={cx('flex items-start justify-center', gridItem, !!background && hasBackgroundSection)}>
          <H2>{heading}</H2>
          <SubTitleH4>{subheading}</SubTitleH4>
          <SubTitleH6 className="mb-4">{description}</SubTitleH6>
          {!!button && button}
        </GridItem>

        <GridItem className={cx('flex items-center justify-center', gridItem)}>
          <img alt={heading} src={image} />
        </GridItem>
      </FlexContainerResponsive>
    </div>
  )
}

export default React.memo(Section)
