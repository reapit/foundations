import React from 'react'
import styles from '@/styles/pages/help.scss?mod'
import { Button, GridFourCol, GridFourColItem, H4, FlexContainerBasic } from '@reapit/elements'

export interface HelpItem {
  imgSrc: string
  header: string
  text: string
  buttonText: string
  buttonOnClick: () => void
}

export const HelpItemList = ({ items }: { items: HelpItem[] }) => (
  <GridFourCol className={styles.wrapListItems}>
    {items.map(({ imgSrc, header, text, buttonText, buttonOnClick }) => (
      <GridFourColItem className={styles.item} key={header}>
        <FlexContainerBasic className={styles.wrapBoxContent} flexColumn centerContent hasPadding>
          <div className={styles.wrapImage}>
            <img className={styles.image} src={imgSrc} alt={header} />
          </div>
          <H4 isCentered>{header}</H4>
          <p className={styles.text}>{text}</p>
          <p className={styles.wrapButton}>
            <Button
              className={styles.button}
              type="button"
              variant="primary"
              onClick={buttonOnClick}
              disabled={false}
              loading={false}
              fullWidth={false}
            >
              {buttonText}
            </Button>
          </p>
        </FlexContainerBasic>
      </GridFourColItem>
    ))}
  </GridFourCol>
)
