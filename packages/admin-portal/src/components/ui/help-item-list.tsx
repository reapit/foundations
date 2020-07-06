import React from 'react'
import styles from '@/styles/pages/help.scss?mod'
import { Button, GridFourCol, GridThreeColItem, H5, Section, LevelRight, Content } from '@reapit/elements'

export interface HelpItem {
  imgSrc: string
  header: string
  text: string
  buttonText: string
  buttonOnClick: () => void
}

export const HelpItemList = ({ items }: { items: HelpItem[] }) => (
  <GridFourCol>
    {items.map(({ imgSrc, header, text, buttonText, buttonOnClick }) => (
      <GridThreeColItem key={header}>
        <Section isFullHeight isFlex>
          <Section className={styles.wrapBoxContent} isFlex isFlexColumn>
            <Section className="flex-shrink-0">
              <img className={styles.image} src={imgSrc} alt={header} />
            </Section>
            <H5 isCentered>{header}</H5>
            <Content className="flex-grow-1">{text}</Content>
            <LevelRight className="text-end">
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
            </LevelRight>
          </Section>
        </Section>
      </GridThreeColItem>
    ))}
  </GridFourCol>
)
