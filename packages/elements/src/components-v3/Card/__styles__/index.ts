import { styled } from 'linaria/react'
import { css } from 'linaria'

export const ElCard = styled.div`
  display: flex;
  padding: 1.25rem;
  border-radius: 0.25rem;
  background: var(--color-white);
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.05);
`

export const ElCardContent = styled.div`
  display: flex;
`

export const ElCardHeading = styled.h5`
  font-size: 20px;
  line-height: 24px;
  min-height: 3.5rem;
`

export const ElCardSubHeading = styled.h6`
  color: #646464;
`

export const ElCardSubHeadingAdditional = styled.h6`
  color: #646464;
  font-weight: bold;
  height: 1rem;
  margin-bottom: 2rem;
`

export const ElCardBodyWrap = styled.div`
  p,
  div,
  section {
    color: #646464;
  }
`

export const ElCardImageWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f2f2f2;
  padding: 1rem;
  margin-right: 1rem;

  img {
    min-height: 72px;
  }
`

export const ElCardList = styled.div`
  display: flex;
`

export const ElCardListItem = styled.div`
  display: flex;
`

export const ElCardListIcon = styled.div`
  display: flex;
`

export const ElCardContextMenuWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: flex-end;
  width: 100%;
`

export const ElCardContextMenuItems = styled.div`
  position: absolute;
  box-shadow: 2px 4px 14px rgba(0, 0, 0, 0.07);
  background: #fff;
  right: -0.75rem;
  top: -0.75rem;
`

export const ElCardContextMenuItem = styled.div`
  padding: 0.75rem;
  cursor: pointer;
`

export const ElCardContextMenuToggle = styled.div`
  position: absolute;
  padding-right: 0.25rem;
  font-weight: bold;
  cursor: pointer;
`

export const elCardContextMenuIsHidden = css`
  display: none;
`
