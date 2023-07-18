import { styled } from '@linaria/react'
import { css } from '@linaria/core'
import { isTablet } from '../../../styles/media'

export const elCardContextMenuOpen = css`
  display: flex;
`

export const elCardFocussed = css`
  background-color: var(--color-accent-blue-lightest);
  /* box-shadow: 0px 2px 9px rgba(20, 164, 224, 0.16); */
`

export const ElCardWrap = styled.div`
  padding: 1rem;
  border-radius: 0.25rem;
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.03);
  background: var(--color-white);
  position: relative;

  ${isTablet} {
    padding: 1.25rem;
    box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.05);
  }

  &.${elCardFocussed} {
    background-color: var(--color-accent-blue-lightest);
    /* box-shadow: 0px 2px 9px rgba(20, 164, 224, 0.16); */
  }
`

export const ElCardHeadingWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: hidden;
  width: 100%;
  justify-content: space-between;
`

export const ElCardMainWrap = styled.div`
  display: flex;
  flex-wrap: nowrap;
`

export const ElCardHeading = styled.h5`
  height: 1.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: normal;
  margin-bottom: 0.25rem;
  width: 100%;
  font-size: var(--font-size-default);

  ${isTablet} {
    font-size: var(--font-size-subheading);
    -webkit-line-clamp: 2;
    height: 3rem;
  }
`

export const ElCardSubHeading = styled.h6`
  color: var(--color-grey-dark);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: var(--font-size-small);
  /* justify-self: flex-start; */

  /* ${isTablet} {
    font-size: var(--font-size-default);
  } */
`

export const elCardSubHeadingAdditionalExpanded = css``

export const ElCardSubHeadingAdditional = styled.h6`
  color: var(--color-grey-dark);
  /* font-weight: bold; */
  font-size: var(--font-size-small);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  /* margin-bottom: 1.25rem; */
  display: flex;
  /* justify-self: flex-end; */
  justify-content: space-between;
`

export const elCardBodyWrapExpanded = css``

export const ElCardBodyWrap = styled.div`
  width: 100%;
  color: var(--color-grey-dark);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: normal;
  height: 3rem;
  font-size: var(--font-size-small);
  transition: height 0.2s linear;
  transition: margin-bottom 0.2s linear;
  margin-top: 0.5rem;

  ${isTablet} {
    height: 3.5rem;
    font-size: var(--font-size-default);
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
  top: 4.25rem;
  right: 0.5rem;

  svg {
    font-size: 0.75rem;
  }

  ${isTablet} {
    display: none;
  }

  &.${elMobileListToggle} {
    top: 0;
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
  border-radius: 50%;
  width: 2.5rem;
  height: 2.5rem;

  img {
    max-width: 2.5rem;
  }

  ${isTablet} {
    margin-bottom: 1.25rem;
    padding: 1rem;
    /* height: 6.25rem; */
  }
`

export const ElCardList = styled.div`
  display: flex;
`

export const elCardListMainWrapExpanded = css``

export const ElCardListMainWrap = styled.div`
  display: flex;
  flex-wrap: nowrap;
  position: relative;
  flex-direction: column;
  /* height: 4rem; */
`

export const ElCardListHeading = styled.h5`
  width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  font-size: var(--font-size-default);
  margin-bottom: 0.25rem;

  /* ${isTablet} { */
  /* font-size: var(--font-size-subheading); */
  /* line-height: 24px; */
  /* } */
`

export const ElCardListSubHeading = styled.h6`
  font-size: var(--font-size-small);
  color: var(--color-grey-dark);
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 0.75rem;
  /* margin-bottom: 1.25rem; */
  /* transition: margin-bottom 0.2s linear; */

  /* ${isTablet} { */
  /* font-size: var(--font-size-default); */
  /* } */
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
  height: 2rem;
  margin-bottom: 0.5rem;
  overflow: hidden;

  &:last-of-type {
    margin-bottom: 0;
  }
`

export const ElCardListItemTextWrap = styled.div`
  font-size: var(--font-size-small);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  cursor: pointer;
  /* 
  ${isTablet} {
    font-size: var(--font-size-default);
  } */
`

export const ElCardListItemTextPrimary = styled.div`
  color: var(--color-grey-dark);
`

export const ElCardListItemTextSecondary = styled.div`
  font-size: var(--font-size-small);
  color: var(--intent-primary);
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
`

export const ElCardListIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 2em;
  width: 2em;
  background: var(--color-grey-light);
  margin-right: 0.5rem;
  border-radius: 0.25rem;
  flex-shrink: 0;
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
    z-index: 2;
    box-shadow: 2px 4px 14px rgba(0, 0, 0, 0.07);
    background: #fff;
    right: -0.75rem;
    top: -0.75rem;
  }

  ${isTablet} {
    &.${elCardContextMenuOpen} {
      right: -1.25rem;
      top: -1.25rem;
    }
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
