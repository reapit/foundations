import { cx } from 'linaria'
import React, { Dispatch, FC, HTMLAttributes, SetStateAction, useState } from 'react'
import {
  CardWrap,
  CardHeading,
  CardSubHeading,
  CardSubHeadingAdditional,
  CardHeadingWrap,
  CardImageWrap,
  CardBodyWrap,
  CardListHeading,
  CardListSubHeading,
  CardListItem,
  CardListIcon,
  CardListItemTextWrap,
  CardListItemTextPrimary,
  CardListItemTextSecondary,
  CardContextMenuWrapper,
  CardContextMenuToggle,
  CardContextMenuItems,
  CardContextMenuItem,
  CardMainWrap,
  CardMobileToggle,
  CardListMainWrap,
} from './card'
import {
  elCardContextMenuOpen,
  elCardFocussed,
  elCardBodyWrapExpanded,
  elCardListItemExpanded,
  elCardSubHeadingAdditionalExpanded,
  elCardListMainWrapExpanded,
  elMobileListToggle,
} from './__styles__'
import { Icon, IconNames } from '../Icon'
import { elMb5 } from '../../styles-v3/base/spacing'
import { Intent } from '../../helpers/v3/intent'
import { useMediaQuery } from '../../hooks/use-media-query'

export interface CardState {
  mainMobileOpen: boolean
  listMobileOpen: boolean
}

export interface CardListItem {
  listCardItemHeading?: string
  listCardItemSubHeading?: string
  listCardItemIcon?: IconNames
  onClick?: () => void
}

export interface ContextMenuItem {
  icon: IconNames
  onClick: () => void
  intent?: Intent
}

export interface CardContextMenuProps extends HTMLAttributes<HTMLDivElement> {
  contextMenuItems?: ContextMenuItem[]
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  isMainCard?: boolean
  mainCardHeading?: string
  mainCardSubHeading?: string
  mainCardSubHeadingAdditional?: string
  mainCardBody?: string
  mainCardImgUrl?: string
  mainContextMenuItems?: ContextMenuItem[]
  isListCard?: boolean
  listCardHeading?: string
  listCardSubHeading?: string
  listCardItems?: CardListItem[]
  listContextMenuItems?: ContextMenuItem[]
  isSelected?: boolean
}

export const handleToggleContextMenu = (
  contextMenuOpen: boolean,
  setContextMenuOpen: Dispatch<SetStateAction<boolean>>,
) => () => {
  setContextMenuOpen(!contextMenuOpen)
}

export const handleToggleMainMobileOpen = (
  mainMobileOpen: boolean,
  setMainMobileOpen: Dispatch<SetStateAction<boolean>>,
) => () => {
  setMainMobileOpen(!mainMobileOpen)
}

export const handleToggleListMobileOpen = (
  listMobileOpen: boolean,
  setListMobileOpen: Dispatch<SetStateAction<boolean>>,
) => () => {
  setListMobileOpen(!listMobileOpen)
}

export const handleToggleBothMobileOpen = (
  mainMobileOpen: boolean,
  setMainMobileOpen: Dispatch<SetStateAction<boolean>>,
  listMobileOpen: boolean,
  setListMobileOpen: Dispatch<SetStateAction<boolean>>,
) => () => {
  setMainMobileOpen(!mainMobileOpen)
  setListMobileOpen(!listMobileOpen)
}

export const CardContextMenu: FC<CardContextMenuProps> = ({ className, contextMenuItems, ...rest }) => {
  const [contextMenuOpen, setContextMenuOpen] = useState<boolean>(false)
  if (!contextMenuItems) return null
  return (
    <CardContextMenuWrapper className={className} {...rest}>
      <CardContextMenuToggle onClick={handleToggleContextMenu(contextMenuOpen, setContextMenuOpen)}>
        <Icon icon="more" fontSize="1.25rem" />
      </CardContextMenuToggle>
      <CardContextMenuItems className={cx(contextMenuOpen && elCardContextMenuOpen)}>
        <CardContextMenuItem onClick={handleToggleContextMenu(contextMenuOpen, setContextMenuOpen)}>
          <Icon icon="close" />
        </CardContextMenuItem>
        {contextMenuItems.map(({ icon, intent, onClick }, index) => (
          <CardContextMenuItem key={index} onClick={onClick}>
            <Icon icon={icon} intent={intent} />
          </CardContextMenuItem>
        ))}
      </CardContextMenuItems>
    </CardContextMenuWrapper>
  )
}

export const Card: FC<CardProps> = ({
  className,
  isMainCard,
  isListCard,
  mainContextMenuItems,
  mainCardHeading,
  mainCardSubHeading,
  mainCardSubHeadingAdditional,
  mainCardBody,
  mainCardImgUrl,
  listCardItems,
  listContextMenuItems,
  listCardHeading,
  listCardSubHeading,
  isSelected,
  ...rest
}) => {
  const [mainMobileOpen, setMainMobileOpen] = useState<boolean>(false)
  const [listMobileOpen, setListMobileOpen] = useState<boolean>(false)
  const { isMobile } = useMediaQuery()

  return (
    <CardWrap className={cx(className && className, isSelected && elCardFocussed)} {...rest}>
      {isMainCard && (
        <>
          {mainContextMenuItems && <CardContextMenu contextMenuItems={mainContextMenuItems} />}
          <CardMainWrap>
            {mainCardImgUrl && (
              <CardImageWrap>
                <img src={mainCardImgUrl} />
              </CardImageWrap>
            )}
            <CardHeadingWrap>
              <CardHeading>{mainCardHeading}</CardHeading>
              <CardSubHeading>{mainCardSubHeading}</CardSubHeading>
              <CardSubHeadingAdditional className={cx(mainMobileOpen && elCardSubHeadingAdditionalExpanded)}>
                {mainCardSubHeadingAdditional}
              </CardSubHeadingAdditional>
            </CardHeadingWrap>
            <CardMobileToggle
              onClick={
                isListCard
                  ? handleToggleBothMobileOpen(mainMobileOpen, setMainMobileOpen, listMobileOpen, setListMobileOpen)
                  : handleToggleMainMobileOpen(mainMobileOpen, setMainMobileOpen)
              }
            >
              <Icon icon={mainMobileOpen ? 'arrowUp' : 'arrowDown'} />
            </CardMobileToggle>
          </CardMainWrap>
          <CardBodyWrap
            className={cx(
              isListCard && (!isMobile || listMobileOpen) && elMb5,
              mainMobileOpen && elCardBodyWrapExpanded,
            )}
          >
            {mainCardBody}
          </CardBodyWrap>
        </>
      )}
      {isListCard && (
        <>
          <CardListMainWrap className={cx(listMobileOpen && elCardListMainWrapExpanded)}>
            {listContextMenuItems && listMobileOpen && <CardContextMenu contextMenuItems={listContextMenuItems} />}
            <CardListHeading>{listCardHeading}</CardListHeading>
            <CardListSubHeading>{listCardSubHeading}</CardListSubHeading>
            {!isMainCard && (
              <CardMobileToggle
                className={elMobileListToggle}
                onClick={handleToggleListMobileOpen(listMobileOpen, setListMobileOpen)}
              >
                <Icon icon={listMobileOpen ? 'arrowUp' : 'arrowDown'} />
              </CardMobileToggle>
            )}
          </CardListMainWrap>
          {listCardItems &&
            listCardItems.map(({ listCardItemHeading, listCardItemSubHeading, listCardItemIcon, onClick }, index) => (
              <CardListItem key={index} className={cx(listMobileOpen && elCardListItemExpanded)} onClick={onClick}>
                {listCardItemIcon && (
                  <CardListIcon>
                    <Icon icon={listCardItemIcon} />
                  </CardListIcon>
                )}
                <CardListItemTextWrap>
                  <CardListItemTextPrimary>{listCardItemHeading}</CardListItemTextPrimary>
                  <CardListItemTextSecondary>{listCardItemSubHeading}</CardListItemTextSecondary>
                </CardListItemTextWrap>
              </CardListItem>
            ))}
        </>
      )}
    </CardWrap>
  )
}
