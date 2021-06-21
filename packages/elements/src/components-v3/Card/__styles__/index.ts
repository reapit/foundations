import { styled } from 'linaria/react'
import { css } from 'linaria'
import { isTablet } from '../../../styles-v3/base/media'

export const elCardContextMenuOpen = css`
  display: flex;
`

export const elCardFocussed = css`
  border: 1px solid var(--color-blue-light2);
  box-shadow: 0px 2px 9px rgba(20, 164, 224, 0.16);
`

export const ElCardWrap = styled.div`
  padding: 1.25rem;
  border-radius: 0.25rem;
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.03);
  border: 1px solid var(--color-grey-medium);
  background: var(--color-white);
  position: relative;
  border: 1px solid var(--color-white);

  ${isTablet} {
    box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.05);
  }

  &.${elCardFocussed} {
    border: 1px solid var(--color-blue-light2);
    box-shadow: 0px 2px 9px rgba(20, 164, 224, 0.16);
  }
`

export const ElCardHeadingWrap = styled.div`
  display: flex;
  flex-direction: column;
  overflow: hidden;
`

export const ElCardMainWrap = styled.div`
  display: flex;
  flex-wrap: nowrap;
`

export const ElCardHeading = styled.h5`
  font-size: 20px;
  line-height: 24px;
  height: 1.5em;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: normal;
  margin-bottom: 0;

  ${isTablet} {
    margin-bottom: 1.25rem;
    -webkit-line-clamp: 2;
    height: 3rem;
  }
`

export const ElCardSubHeading = styled.h6`
  color: var(--color-grey-dark);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export const elCardSubHeadingAdditionalExpanded = css`
  margin-bottom: 1.25rem;
`

export const ElCardSubHeadingAdditional = styled.h6`
  color: var(--color-grey-dark);
  font-weight: bold;
  font-size: 0.875rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 0;
  transition: margin-bottom 0.2s linear;
  display: flex;
  justify-content: space-between;

  ${isTablet} {
    margin-bottom: 1.25rem;
  }

  &.${elCardSubHeadingAdditionalExpanded} {
    margin-bottom: 1.25rem;
  }
`

export const elCardBodyWrapExpanded = css`
  height: 3.5rem;
`

export const ElCardBodyWrap = styled.div`
  width: 100%;
  color: var(--color-grey-dark);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: normal;
  height: 0;
  transition: height 0.2s linear;
  transition: margin-bottom 0.2s linear;

  ${isTablet} {
    height: 3.5rem;
  }

  &.${elCardBodyWrapExpanded} {
    height: 3.5rem;
  }
`

export const elMobileListToggle = css`
  top: 1.5rem;
  right: 0;
`

export const ElMobileToggle = styled.button`
  border: none;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0;
  border-radius: 0.25rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: auto;
  position: absolute;
  top: 4.5rem;
  right: 1.25rem;

  svg {
    font-size: 0.75rem;
  }

  ${isTablet} {
    display: none;
  }

  &.${elMobileListToggle} {
    top: 4.5rem;
  }
`

export const ElCardImageWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  background-color: var(--color-grey-light);
  margin-right: 0.5rem;
  border-radius: 0.25rem;
  height: fit-content;

  img {
    min-height: 67px;
  }

  ${isTablet} {
    margin-bottom: 1.25rem;
    padding: 1rem;
    height: auto;
    img {
      min-height: 72px;
    }
  }
`

export const ElCardList = styled.div`
  display: flex;
`

export const elCardListMainWrapExpanded = css`
  height: 4rem;
`

export const ElCardListMainWrap = styled.div`
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  flex-direction: column;
  transition: height 0.2s linear;
  height: auto;
  height: 0;

  ${isTablet} {
    height: 4rem;
  }

  &.${elCardListMainWrapExpanded} {
    height: 4rem;
  }
`

export const ElCardListHeading = styled.h5`
  width: 100%;
  font-size: 20px;
  line-height: 24px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export const ElCardListSubHeading = styled.h6`
  color: var(--color-grey-dark);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 1.25rem;
  transition: margin-bottom 0.2s linear;
`

export const elCardListItemExpanded = css`
  height: 2.5rem;
  margin-bottom: 0.5rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`

export const ElCardListItem = styled.div`
  display: flex;
  margin-bottom: 0;
  height: 0;
  transition: height 0.2s linear;
  transition: margin-bottom 0.2s linear;
  overflow: hidden;

  ${isTablet} {
    height: 2.5rem;
    margin-bottom: 0.5rem;

    &:last-of-type {
      margin-bottom: 0;
    }
  }

  &.${elCardListItemExpanded} {
    height: 2.5rem;
    margin-bottom: 0.5rem;

    &:last-of-type {
      margin-bottom: 0;
    }
  }
`

export const ElCardListItemTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  cursor: pointer;
`

export const ElCardListItemTextPrimary = styled.div`
  color: var(--color-grey-dark);
`

export const ElCardListItemTextSecondary = styled.div`
  font-size: 0.85rem;
  color: var(--intent-primary);
`

export const ElCardListIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2.5rem;
  width: 2.5rem;
  background: var(--color-grey-light);
  margin-right: 0.5rem;
  border-radius: 0.25rem;
`

export const ElCardContextMenuWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

export const ElCardContextMenuItems = styled.div`
  display: none;

  &.${elCardContextMenuOpen} {
    display: flex;
    flex-direction: column;
    position: absolute;
    z-index: 1;
    box-shadow: 2px 4px 14px rgba(0, 0, 0, 0.07);
    background: #fff;
    right: -1rem;
    top: -1rem;
  }
`

export const ElCardContextMenuItem = styled.div`
  padding: 0.75rem;
  cursor: pointer;

  &:first-child {
    margin-bottom: 1rem;
  }
`

export const ElCardContextMenuToggle = styled.div`
  position: absolute;
  padding-right: 0.25rem;
  cursor: pointer;

  svg {
    font-weight: bold;
  }
`
