import { css } from 'linaria'
import { styled } from 'linaria/react'
import { ElIcon } from '../../icon/__styles__'
import { elIsActive } from '../../../styles/states'
import { isMobile } from './../../../styles/media'

const EXPANDABLE_TRIGGER_CELL_WIDTH = '40px'

const MAX_HEADER_HEIGHT = '40px'
const MAX_TABLE_CONTENT_HEIGHT = '60px'
const MAX_LINE_LENGTH = 2

export const ElTableCellNarrowOrder1 = css`
  ${isMobile} {
    order: 0;
  }
`

export const ElTableCellNarrowOrder2 = css`
  ${isMobile} {
    order: 1;
  }
`

export const ElTableCellNarrowOrder3 = css`
  ${isMobile} {
    order: 2;
  }
`

export const ElTableCellNarrowOrder4 = css`
  ${isMobile} {
    order: 3;
  }
`

export const ElTableCellNarrowOrder5 = css`
  ${isMobile} {
    order: 4;
  }
`

export const ElTableCellNarrowOrder6 = css`
  ${isMobile} {
    order: 5;
  }
`

export const ElTableCellNarrowOrder7 = css`
  ${isMobile} {
    order: 6;
  }
`

export const ElTableCellNarrowOrder8 = css`
  ${isMobile} {
    order: 7;
  }
`

export const ElTableCellNarrowOrder9 = css`
  ${isMobile} {
    order: 8;
  }
`

export const ElTableCellNarrowOrder10 = css`
  ${isMobile} {
    order: 9;
  }
`

export const ElTableCellNarrowOrder11 = css`
  ${isMobile} {
    order: 10;
  }
`

export const ElTableCellNarrowOrder12 = css`
  ${isMobile} {
    order: 11;
  }
`

const cellOrders = `
  &:nth-child(1) {
    order: 0;
  }

  &:nth-child(2) {
    order: 1;
  }

  &:nth-child(3) {
    order: 2;
  }

  &:nth-child(4) {
    order: 3;
  }

  &:nth-child(5) {
    order: 4;
  }

  &:nth-child(6) {
    order: 5;
  }

  &:nth-child(7) {
    order: 6;
  }

  &:nth-child(8) {
    order: 7;
  }

  &:nth-child(9) {
    order: 8;
  }

  &:nth-child(10) {
    order: 9;
  }

  &:nth-child(11) {
    order: 10;
  }

  &:nth-child(12) {
    order: 11;
  }
`

export const ElTable = styled.div`
  &[data-num-columns-excl-expandable-row-trigger-col='2'] {
    --component-table-num-columns: 2;
  }
  &[data-num-columns-excl-expandable-row-trigger-col='3'] {
    --component-table-num-columns: 3;
  }
  &[data-num-columns-excl-expandable-row-trigger-col='4'] {
    --component-table-num-columns: 4;
  }
  &[data-num-columns-excl-expandable-row-trigger-col='5'] {
    --component-table-num-columns: 5;
  }
  &[data-num-columns-excl-expandable-row-trigger-col='6'] {
    --component-table-num-columns: 6;
  }
  &[data-num-columns-excl-expandable-row-trigger-col='7'] {
    --component-table-num-columns: 7;
  }
  &[data-num-columns-excl-expandable-row-trigger-col='8'] {
    --component-table-num-columns: 8;
  }
  &[data-num-columns-excl-expandable-row-trigger-col='9'] {
    --component-table-num-columns: 9;
  }
  &[data-num-columns-excl-expandable-row-trigger-col='10'] {
    --component-table-num-columns: 10;
  }
  &[data-num-columns-excl-expandable-row-trigger-col='11'] {
    --component-table-num-columns: 11;
  }
  &[data-num-columns-excl-expandable-row-trigger-col='12'] {
    --component-table-num-columns: 12;
  }

  &[data-has-expandable-action] {
    --component-table-expandable-trigger-width: ${EXPANDABLE_TRIGGER_CELL_WIDTH};
  }

  &[data-expandable-content-size='small'] {
    --table-expanded-height: 12rem;
  }

  &[data-expandable-content-size='medium'] {
    --table-expanded-height: 18rem;
  }

  &[data-expandable-content-size='large'] {
    --table-expanded-height: 24rem;
  }
`

// modifiers
export const elTableNarrowCellIsFullWidth = css`
  ${isMobile} {
    grid-column-end: span 2;
    text-align: center;
  }
`
export const elTableCellHasDarkText = css``

export const elTableRowFocused = css`
  box-shadow: 0px 0px 2px var(--color-blue-light);
`

// molecules
export const ElTableHeadersRow = styled.div`
  display: grid;

  // the below "grid-template-columns" is a bit mad, so I'll explain the constituent parts...

  // - "repeat(" - takes 2 args. The first is the number of columns (or auto-fit
  // if not supplied). The second is the width of each column

  // - "var(--component-table-num-columns, auto-fit)" - this is saying that if the
  // number of columns is known through our variable (set by the data-columns attribute)
  // on the ElTable element, then use that. Otherwise use CSS auto-fit, which will
  // work out the number of columns based on what's in the DOM. This is required as
  // people using this table could put any number of columns in. Unless the CSS is
  // explicitly told the number of columns, it doesn't know.

  // - minmax(var(--component-table-min-column-width), 1fr)) - this sets the width
  // of each column. The columns will be a minimum of the variable and a maximum
  // of 1fr (i.e. equal column widths)

  // - var(--component-table-expandable-trigger-width, 0); - This bit at the end
  // will add one additional column. It's width will be set by the variable, otherwise
  // it will be 0 if the variable isn't defined. The idea here is that the button at the
  // end of each row to open/close the expandable row is quite small, and by defining a
  // set width for this column only the other columns can expand into the remaining space.
  // If there are no expandable rows in the table, this variable can be left undefined
  // and 0 will be used as the value. The column will still be there but won't be useful.
  // The variable component-table-num-columns should be the number of columns MINUS
  // the column that has the button to trigger the expandable row.

  grid-template-columns:
    repeat(var(--component-table-num-columns, auto-fit), minmax(var(--component-table-min-column-width), 1fr))
    var(--component-table-expandable-trigger-width, 0);

  @media only screen and (max-width: 1024px) {
    display: none;
  }
`

export const ElTableHeader = styled.div`
  background: var(--color-grey-light);
  color: var(--color-black);
  padding: 0.75rem;
  margin-right: 2px;
  display: flex;
  align-items: center;
  max-height: calc(${MAX_HEADER_HEIGHT} - 1.5rem);
  overflow: hidden;
  text-overflow: ellipsis;

  ${cellOrders}

  &:last-child {
    margin-right: 0;
    border-radius: 0 var(--default-border-radius) var(--default-border-radius) 0;
  }

  &:first-child {
    border-radius: var(--default-border-radius) 0 0 var(--default-border-radius);
  }
`

export const ElTableRow = styled.div`
  display: grid;
  // see above for the explanation of this line
  grid-template-columns:
    repeat(var(--component-table-num-columns, auto-fit), minmax(var(--component-table-min-column-width), 1fr))
    var(--component-table-expandable-trigger-width, 0);
  margin-top: 0.5rem;

  background: var(--color-white);
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.08);
  border-radius: var(--default-border-radius);

  @media only screen and (max-width: 1024px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  ${isMobile} {
    grid-template-columns: 1fr 1fr;
  }

  &:hover,
  &:focus {
    box-shadow: 0px 0px 3px var(--color-blue-light);
  }
`

export const ElTableRowContainer = styled.div`
  border-radius: var(--default-border-radius);

  &:hover,
  &:focus {
    box-shadow: 0px 0px 3px var(--color-blue-light);

    .el-table-row {
      box-shadow: none;
    }
  }

  &${elIsActive} {
    .el-table-row {
      border-radius: var(--default-border-radius) var(--default-border-radius) 0 0;
    }

    .el-table-expandable-row-trigger-cell {
      border-radius: 0 var(--default-border-radius) 0 0;
    }
  }
`

export const ElTableCell = styled.div`
  padding: 0.75rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  color: var(--color-grey-dark);
  margin-right: 2px;

  &:last-child {
    margin-right: 0;
  }

  ${cellOrders}

  ${ElIcon} {
    margin-right: 0.75rem;
  }

  &.${elTableCellHasDarkText} {
    color: var(--color-black);
  }
`

export const ElTableCellContent = styled.div`
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: ${MAX_LINE_LENGTH};
  -webkit-box-orient: vertical;
  max-height: calc(${MAX_TABLE_CONTENT_HEIGHT} - 0.75rem);
  overflow: hidden;
  line-height: 1.5rem;
  text-overflow: ellipsis;

  ${isMobile} {
    &::before {
      display: block;
      content: attr(data-narrow-label);
      width: 100%;
      color: var(--color-black);
    }
  }
`

export const ElTableExpandableRowTriggerCell = styled.div`
  background: var(--color-grey-light);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.75rem;
  order: 12;

  &:last-child {
    border-radius: 0 var(--default-border-radius) var(--default-border-radius) 0;
  }

  &:first-child {
    border-radius: var(--default-border-radius) 0 0 var(--default-border-radius);
  }

  @media only screen and (max-width: 1024px) {
    &:not(.el-table-narrow-cell-is-full-width) {
      grid-column-end: span 4;
      text-align: center;
      width: 40px;
      justify-self: end;
      grid-column-end: 5;
    }

    &:last-child {
      border-radius: 0 0 var(--default-border-radius) var(--default-border-radius);
    }

    &:first-child {
      border-radius: var(--default-border-radius) var(--default-border-radius) 0 0;
    }
  }

  ${isMobile} {
    &:not(.el-table-narrow-cell-is-full-width) {
      grid-column-end: span 2;
      text-align: center;
      width: 40px;
      justify-self: end;
      grid-column-end: 3;
    }

    &:last-child {
      border-radius: 0 0 var(--default-border-radius) var(--default-border-radius);
    }

    &:first-child {
      border-radius: var(--default-border-radius) var(--default-border-radius) 0 0;
    }
  }
`

export const ElTableExpandableRow = styled.div`
  height: 0;
  background: var(--color-white);
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.08);
  border-radius: 0 0 var(--default-border-radius) var(--default-border-radius);
  opacity: 0;
  transition: height var(--table-expanded-animation-speed, 0.2s) linear, opacity 0.2s linear;
  border: none;
  overflow: hidden;
  padding: 0;

  &${elIsActive} {
    height: var(--table-expanded-height, 6rem);
    opacity: 1;
    border-top: 1px solid var(--color-grey-medium);
  }
`

export const ElTableExpandableContainer = styled.div`
  padding: 2.5rem;
  overflow-y: scroll;
`
