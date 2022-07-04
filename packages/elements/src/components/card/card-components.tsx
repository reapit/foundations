import { cx } from '@linaria/core'
import React, { Dispatch, FC, HTMLAttributes, SetStateAction, useState, MouseEvent } from 'react'
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
import { Icon, IconNames } from '../icon'
import { elMb5 } from '../../styles/spacing'
import { Intent } from '../../helpers/intent'
import { useMediaQuery } from '../../hooks/use-media-query'

export interface CardListItemProps {
  // Card list items have a heading, a sub heading an icon name from our icon list and an onClick action
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

// As per above, each of the context menu options should have an icon name, a click action and
// optionally, an intent for example "danger", will render a red icon
export interface CardContextMenuProps extends HTMLAttributes<HTMLDivElement> {
  contextMenuItems?: ContextMenuItem[]
}

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hasMainCard?: boolean // Should we render an Image card as the main card?
  // Supplied text options for the various fields
  mainCardHeading?: string
  mainCardSubHeading?: string
  mainCardSubHeadingAdditional?: string
  mainCardBody?: string
  mainCardImgUrl?: string
  // A list of context menu options
  mainContextMenuItems?: ContextMenuItem[]
  // Should we render a bottom list section. If supplied without hasMainCard, will just render a list
  hasListCard?: boolean
  // Heading strings for the list
  listCardHeading?: string
  listCardSubHeading?: string
  listCardItems?: CardListItemProps[] // A list of options for the list - see CardList item above
  listContextMenuItems?: ContextMenuItem[]
  isSelected?: boolean // Does the card have the blue selected border
}

export const handleToggleContextMenu = (
  contextMenuOpen: boolean,
  setContextMenuOpen: Dispatch<SetStateAction<boolean>>,
) => (event: MouseEvent) => {
  event.stopPropagation()
  setContextMenuOpen(!contextMenuOpen)
}

export const handleToggleMainMobileOpen = (
  mainMobileOpen: boolean,
  setMainMobileOpen: Dispatch<SetStateAction<boolean>>,
) => (event: MouseEvent) => {
  event.stopPropagation()
  setMainMobileOpen(!mainMobileOpen)
}

export const handleToggleListMobileOpen = (
  listMobileOpen: boolean,
  setListMobileOpen: Dispatch<SetStateAction<boolean>>,
) => (event: MouseEvent) => {
  event.stopPropagation()
  setListMobileOpen(!listMobileOpen)
}

export const handleToggleBothMobileOpen = (
  mainMobileOpen: boolean,
  setMainMobileOpen: Dispatch<SetStateAction<boolean>>,
  listMobileOpen: boolean,
  setListMobileOpen: Dispatch<SetStateAction<boolean>>,
) => (event: MouseEvent) => {
  event.stopPropagation()
  setMainMobileOpen(!mainMobileOpen)
  setListMobileOpen(!listMobileOpen)
}

export const handleMouseHover = (
  hoverIndex: number | null,
  setHoverIndex: Dispatch<SetStateAction<number | null>>,
) => () => {
  setHoverIndex(hoverIndex)
}

export const CardContextMenu: FC<CardContextMenuProps> = ({ className, contextMenuItems, ...rest }) => {
  const [contextMenuOpen, setContextMenuOpen] = useState<boolean>(false)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)
  if (!contextMenuItems) return null
  return (
    <CardContextMenuWrapper className={className} {...rest}>
      <CardContextMenuToggle onClick={handleToggleContextMenu(contextMenuOpen, setContextMenuOpen)}>
        <Icon icon="moreSystem" fontSize="1.25rem" />
      </CardContextMenuToggle>
      <CardContextMenuItems className={cx(contextMenuOpen && elCardContextMenuOpen)}>
        <CardContextMenuItem onClick={handleToggleContextMenu(contextMenuOpen, setContextMenuOpen)}>
          <Icon icon="closeSystem" fontSize="1.25rem" />
        </CardContextMenuItem>
        {contextMenuItems.map(({ icon, intent, onClick }, index) => (
          <CardContextMenuItem key={index} onClick={onClick}>
            <Icon
              icon={icon}
              onMouseEnter={handleMouseHover(index, setHoverIndex)}
              onMouseLeave={handleMouseHover(null, setHoverIndex)}
              intent={hoverIndex === index ? intent : undefined}
              fontSize="1.25rem"
            />
          </CardContextMenuItem>
        ))}
      </CardContextMenuItems>
    </CardContextMenuWrapper>
  )
}

export const Card: FC<CardProps> = ({
  className,
  hasMainCard,
  hasListCard,
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
    <CardWrap className={cx(className, isSelected && elCardFocussed)} {...rest}>
      {hasMainCard && (
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
                hasListCard
                  ? handleToggleBothMobileOpen(mainMobileOpen, setMainMobileOpen, listMobileOpen, setListMobileOpen)
                  : handleToggleMainMobileOpen(mainMobileOpen, setMainMobileOpen)
              }
            >
              <Icon icon={mainMobileOpen ? 'arrowUpSystem' : 'arrowDownSystem'} />
            </CardMobileToggle>
          </CardMainWrap>
          <CardBodyWrap
            className={cx(
              hasListCard && (!isMobile || listMobileOpen) && elMb5,
              mainMobileOpen && elCardBodyWrapExpanded,
            )}
          >
            {mainCardBody}
          </CardBodyWrap>
        </>
      )}
      {hasListCard && (
        <>
          <CardListMainWrap className={cx(listMobileOpen && elCardListMainWrapExpanded)}>
            {listContextMenuItems && (listMobileOpen || !isMobile) && (
              <CardContextMenu contextMenuItems={listContextMenuItems} />
            )}
            <CardListHeading>{listCardHeading}</CardListHeading>
            <CardListSubHeading>{listCardSubHeading}</CardListSubHeading>
            {!hasMainCard && (
              <CardMobileToggle
                className={elMobileListToggle}
                onClick={handleToggleListMobileOpen(listMobileOpen, setListMobileOpen)}
              >
                <Icon icon={listMobileOpen ? 'arrowUpSystem' : 'arrowDownSystem'} />
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
