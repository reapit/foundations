import React from 'react'
import { Button, GridFourCol, GridThreeColItem, H5, Section, LevelRight, Content } from '@reapit/elements'
import { wrapBoxContent, button } from './__styles__/help-item-list'
import FadeIn from '../../../styles/fade-in'

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
        <Section isFullHeight isFlex hasBoxShadow>
          <FadeIn>
            <Section className={wrapBoxContent} isFlex isFlexColumn>
              <Section className="flex-shrink-0">
                <img src={imgSrc} alt={header} />
              </Section>
              <H5 isCentered>{header}</H5>
              <Content className="flex-grow-1">{text}</Content>
              <LevelRight className="text-end">
                <Button
                  className={button}
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
          </FadeIn>
        </Section>
      </GridThreeColItem>
    ))}
  </GridFourCol>
)
