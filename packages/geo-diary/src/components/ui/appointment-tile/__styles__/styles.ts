import { css } from 'linaria'
import { styled } from 'linaria/react'

export const TileSectionContainer = styled.div`
  margin-bottom: 0.25rem;

  &:last-child {
    margin-bottom: 0;
  }
`

export const TileIconAnchorWrap = styled.div`
  display: flex;

  svg,
  .el-icon {
    margin: 1px 0.5rem 0 0;
  }
`

export const AppointmentTileContainer = styled.div`
  box-shadow: 2px 4px 20px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  border: 2px solid #fff;
  cursor: pointer;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background: #fff;

  &:hover {
    border: 2px solid #e3e3e3;
  }
`

export const AppointmentTileHeadingWrap = styled.div`
  display: flex;
  justify-content: space-between;
`

export const highlightTile = css`
  border: 2px solid #e3e3e3;
`

export const cancelledTile = css`
  * {
    color: #646464;
  }
`
