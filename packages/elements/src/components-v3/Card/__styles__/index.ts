import { styled } from 'linaria/react'
import { css } from 'linaria'

export const elCardContextMenuOpen = css`
  display: flex;
`

export const ElCard = styled.div`
  padding: 1.25rem;
  border-radius: 0.25rem;
  background: var(--color-white);
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.05);
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
  height: 3rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: normal;
  margin-bottom: 1.25rem;
`

export const ElCardSubHeading = styled.h6`
  color: #646464;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export const ElCardSubHeadingAdditional = styled.h6`
  color: #646464;
  font-weight: bold;
  font-size: 0.875rem;
  margin-bottom: 1.25rem;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export const ElCardBodyWrap = styled.div`
  width: 100%;
  color: #646464;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: normal;
`

export const ElCardImageWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  background-color: #f2f2f2;
  padding: 1rem;
  margin-right: 0.5rem;
  margin-bottom: 1.25rem;
  border-radius: 0.25rem;

  img {
    min-height: 72px;
  }
`

export const ElCardList = styled.div`
  display: flex;
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
  color: #646464;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  margin-bottom: 1.25rem;
`

export const ElCardListItem = styled.div`
  display: flex;
  margin-bottom: 0.5rem;

  &:last-of-type {
    margin-bottom: 0;
  }
`

export const ElCardListItemTextWrap = styled.div`
  display: flex;
  flex-direction: column;
`

export const ElCardListItemTextPrimary = styled.div`
  color: #646464;
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
  display: flex;
  flex-direction: column;
  position: absolute;

  &.${elCardContextMenuOpen} {
    box-shadow: 2px 4px 14px rgba(0, 0, 0, 0.07);
    background: #fff;
    right: -1.2rem;
    top: -1.2rem;

    &:first-child {
      margin-bottom: 1rem;
    }
  }
`

export const ElCardContextMenuItem = styled.div`
  padding: 0.75rem;
  cursor: pointer;
`

export const ElCardContextMenuToggle = styled.div`
  position: absolute;
  padding-right: 0.25rem;
  cursor: pointer;

  svg {
    font-weight: bold;
  }
`
