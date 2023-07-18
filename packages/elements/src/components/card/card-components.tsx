import { cx } from '@linaria/core'
import React, { Dispatch, FC, HTMLAttributes, SetStateAction, useState, MouseEvent, ReactNode } from 'react'
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
  CardListMainWrap,
} from './card'
import { elCardContextMenuOpen, elCardFocussed } from './__styles__'
import { Icon, IconNames } from '../icon'
import { elMb5, elMt5 } from '../../styles/spacing'
import { Intent } from '../../helpers/intent'

export interface CardListItemProps {
  // Card list items have a heading, a sub heading an icon name from our icon list and an onClick action
  listCardItemHeading?: ReactNode
  listCardItemSubHeading?: ReactNode
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
  mainCardHeading?: ReactNode
  mainCardSubHeading?: ReactNode
  mainCardSubHeadingAdditional?: ReactNode
  mainCardBody?: ReactNode
  mainCardImgUrl?: ReactNode
  // A list of context menu options
  mainContextMenuItems?: ContextMenuItem[]
  // Should we render a bottom list section. If supplied without hasMainCard, will just render a list
  hasListCard?: boolean
  // Heading strings for the list
  listCardHeading?: ReactNode
  listCardSubHeading?: ReactNode
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
  console.warn(
    `The icon "${handleToggleMainMobileOpen}" function is deprecated and will be removed in the next major release as all card components are now expanded in mobile by default.`,
  )
  setMainMobileOpen(!mainMobileOpen)
}

export const handleToggleListMobileOpen = (
  listMobileOpen: boolean,
  setListMobileOpen: Dispatch<SetStateAction<boolean>>,
) => (event: MouseEvent) => {
  event.stopPropagation()
  console.warn(
    `The "${handleToggleListMobileOpen}" function is deprecated and will be removed in the next major release as all card components are now expanded in mobile by default.`,
  )
  setListMobileOpen(!listMobileOpen)
}

export const handleToggleBothMobileOpen = (
  mainMobileOpen: boolean,
  setMainMobileOpen: Dispatch<SetStateAction<boolean>>,
  listMobileOpen: boolean,
  setListMobileOpen: Dispatch<SetStateAction<boolean>>,
) => (event: MouseEvent) => {
  event.stopPropagation()
  console.warn(
    `The "${handleToggleBothMobileOpen}" function is deprecated and will be removed in the next major release as all card components are now expanded in mobile by default.`,
  )
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
        <Icon icon="moreSystem" />
      </CardContextMenuToggle>
      <CardContextMenuItems className={cx(contextMenuOpen && elCardContextMenuOpen)}>
        <CardContextMenuItem onClick={handleToggleContextMenu(contextMenuOpen, setContextMenuOpen)}>
          <Icon icon="closeSystem" />
        </CardContextMenuItem>
        {contextMenuItems.map(({ icon, intent, onClick }, index) => (
          <CardContextMenuItem key={index} onClick={onClick}>
            <Icon
              icon={icon}
              onMouseEnter={handleMouseHover(index, setHoverIndex)}
              onMouseLeave={handleMouseHover(null, setHoverIndex)}
              intent={hoverIndex === index ? intent : undefined}
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
  return (
    <CardWrap className={cx(className, isSelected && elCardFocussed)} {...rest}>
      {hasMainCard && (
        <>
          {mainContextMenuItems && <CardContextMenu contextMenuItems={mainContextMenuItems} />}
          <CardMainWrap>
            {mainCardImgUrl && (
              <CardImageWrap>
                {typeof mainCardImgUrl === 'string' ? <img src={mainCardImgUrl} /> : mainCardImgUrl}
              </CardImageWrap>
            )}
            <CardHeadingWrap>
              <CardHeading>{mainCardHeading}</CardHeading>
              <CardSubHeading>{mainCardSubHeading}</CardSubHeading>
              <CardSubHeadingAdditional>{mainCardSubHeadingAdditional}</CardSubHeadingAdditional>
            </CardHeadingWrap>
          </CardMainWrap>
          {mainCardBody && <CardBodyWrap className={cx(hasListCard && elMb5)}>{mainCardBody}</CardBodyWrap>}
        </>
      )}
      {hasListCard && (
        <>
          <CardListMainWrap className={cx(hasMainCard && elMt5)}>
            {listContextMenuItems && <CardContextMenu contextMenuItems={listContextMenuItems} />}
            <CardListHeading>{listCardHeading}</CardListHeading>
            <CardListSubHeading>{listCardSubHeading}</CardListSubHeading>
          </CardListMainWrap>
          {listCardItems &&
            listCardItems.map(({ listCardItemHeading, listCardItemSubHeading, listCardItemIcon, onClick }, index) => (
              <CardListItem key={index} onClick={onClick}>
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
