// import { cx } from 'linaria'
import React, { FC, HTMLAttributes } from 'react'
import {
  ElCard,
  ElCardBodyWrap,
  ElCardContent,
  ElCardContextMenuItem,
  ElCardContextMenuItems,
  ElCardContextMenuToggle,
  ElCardContextMenuWrapper,
  ElCardHeading,
  ElCardImageWrap,
  ElCardList,
  ElCardListIcon,
  ElCardListItem,
  ElCardSubHeading,
  ElCardSubHeadingAdditional,
} from './__styles__'

export interface CardBaseProps extends HTMLAttributes<HTMLDivElement> {}

export const Card: FC<CardBaseProps> = ({ children, ...rest }) => <ElCard {...rest}>{children}</ElCard>

export const CardContent: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardContent {...rest}>{children}</ElCardContent>
)

export const CardHeading: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardHeading {...rest}>{children}</ElCardHeading>
)

export const CardSubHeading: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardSubHeading {...rest}>{children}</ElCardSubHeading>
)

export const CardSubHeadingAdditional: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardSubHeadingAdditional {...rest}>{children}</ElCardSubHeadingAdditional>
)

export const CardBodyWrap: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardBodyWrap {...rest}>{children}</ElCardBodyWrap>
)

export const CardImageWrap: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardImageWrap {...rest}>{children}</ElCardImageWrap>
)

export const CardList: FC<CardBaseProps> = ({ children, ...rest }) => <ElCardList {...rest}>{children}</ElCardList>

export const CardListItem: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardListItem {...rest}>{children}</ElCardListItem>
)

export const CardListIcon: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardListIcon {...rest}>{children}</ElCardListIcon>
)

export const CardContextMenuWrapper: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardContextMenuWrapper {...rest}>{children}</ElCardContextMenuWrapper>
)

export const CardContetMenuItems: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardContextMenuItems {...rest}>{children}</ElCardContextMenuItems>
)

export const CardContetMenuItem: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardContextMenuItem {...rest}>{children}</ElCardContextMenuItem>
)

export const CardContextMenuToggle: FC<CardBaseProps> = ({ children, ...rest }) => (
  <ElCardContextMenuToggle {...rest}>{children}</ElCardContextMenuToggle>
)
