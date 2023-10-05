import { cx } from '@linaria/core'
import {
  BodyText,
  elFadeIn,
  elMb3,
  elMb5,
  elMr2,
  elMr5,
  FlexContainer,
  Icon,
  PlaceholderImage,
  SmallText,
  Subtitle,
  Title,
  useMediaQuery,
} from '@reapit/elements'
import { AppDetailModel } from '@reapit/foundations-ts-definitions'
import React, { FC } from 'react'
import { IsFreeNotice } from '../apps-browse/__styles__'
import { AppDetailCategoryChip, AppDetailIcon, appDetailInfoLineAdjust, AppDetailWrapper } from './__styles__'

export interface AppsDetailHeaderProps {
  app: AppDetailModel
}

export const AppsDetailHeader: FC<AppsDetailHeaderProps> = ({ app }) => {
  const { isMobile } = useMediaQuery()
  const { name, summary, isFree, categories, isDirectApi, installedOn, media } = app
  const isInstalled = Boolean(installedOn)
  const iconUri = media?.find((item) => item.type === 'icon')?.uri

  if (isMobile) {
    return (
      <FlexContainer className={elMb5}>
        <FlexContainer isFlexColumn isFlexJustifyBetween>
          <FlexContainer className={elMb3} isFlexAlignEnd isFlexJustifyBetween>
            <Subtitle className={appDetailInfoLineAdjust} hasNoMargin hasBoldText>
              {name}
            </Subtitle>
            <FlexContainer>
              {isInstalled && (
                <>
                  <Icon icon="checkSolidSystem" className={elMr2} intent="success" />
                  <SmallText className={cx(elMr2, appDetailInfoLineAdjust)} hasNoMargin>
                    {isDirectApi ? 'Integration Enabled' : 'App Installed'}
                  </SmallText>
                </>
              )}
              <Icon icon="checkSolidSystem" className={elMr2} intent="success" />
              <SmallText className={cx(elMr2, appDetailInfoLineAdjust)} hasNoMargin>
                Verified by Reapit
              </SmallText>
            </FlexContainer>
          </FlexContainer>
          <FlexContainer>
            <AppDetailWrapper>
              {iconUri ? (
                <AppDetailIcon className={elFadeIn} src={iconUri} alt={name} />
              ) : (
                <PlaceholderImage placeholder="placeholderSmall" size={72} />
              )}
            </AppDetailWrapper>
            <SmallText hasGreyText>{summary}</SmallText>
          </FlexContainer>
          <FlexContainer>
            {Boolean(categories?.length) &&
              categories?.map((category) => (
                <AppDetailCategoryChip className={elFadeIn} key={category?.id}>
                  {category.name}
                </AppDetailCategoryChip>
              ))}
            {isDirectApi && (
              <SmallText className={elMr5} hasBoldText hasNoMargin>
                Integration
              </SmallText>
            )}
            {isFree && <IsFreeNotice>FREE</IsFreeNotice>}
          </FlexContainer>
        </FlexContainer>
      </FlexContainer>
    )
  }

  return (
    <FlexContainer className={elMb5}>
      <AppDetailWrapper>
        {iconUri ? (
          <AppDetailIcon className={elFadeIn} src={iconUri} alt={name} />
        ) : (
          <PlaceholderImage placeholder="placeholderSmall" size={72} />
        )}
      </AppDetailWrapper>
      <FlexContainer isFlexColumn isFlexJustifyBetween>
        <FlexContainer isFlexColumn>
          <Title hasNoMargin>{name}</Title>
          <BodyText hasGreyText>{summary}</BodyText>
        </FlexContainer>
        <FlexContainer>
          {isInstalled && (
            <>
              <Icon icon="checkSolidSystem" className={elMr5} intent="success" />
              <SmallText className={elMr5} hasNoMargin>
                {isDirectApi ? 'Integration Enabled' : 'App Installed'}
              </SmallText>
            </>
          )}
          <Icon icon="checkSolidSystem" className={elMr5} intent="success" />
          <SmallText className={elMr5} hasNoMargin>
            Verified by Reapit
          </SmallText>
          {Boolean(categories?.length) &&
            categories?.map((category) => (
              <AppDetailCategoryChip className={elFadeIn} key={category?.id}>
                {category.name}
              </AppDetailCategoryChip>
            ))}
          {isDirectApi && (
            <SmallText className={elMr5} hasBoldText hasNoMargin>
              Integration
            </SmallText>
          )}
          {isFree && <IsFreeNotice>FREE</IsFreeNotice>}
        </FlexContainer>
      </FlexContainer>
    </FlexContainer>
  )
}
