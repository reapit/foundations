import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { ElIcon } from '../../icon/__styles__'
import { elIsActive } from '../../../styles/states'

export const isNarrow = '@media only screen and (max-width: 1024px)'

const EXPANDABLE_TRIGGER_CELL_WIDTH = '40px'
const CALL_TO_ACTION_CELL_WIDTH = '100px'

const MAX_HEADER_HEIGHT = '3rem'
const MAX_TABLE_CONTENT_HEIGHT = '60px'
const MAX_LINE_LENGTH = 2

export const ElTableCellNarrowOrder1 = css`
  ${isNarrow} {
    order: 0;
  }
`

export const ElTableCellNarrowOrder2 = css`
  ${isNarrow} {
    order: 1;
  }
`

export const ElTableCellNarrowOrder3 = css`
  ${isNarrow} {
    order: 2;
  }
`

export const ElTableCellNarrowOrder4 = css`
  ${isNarrow} {
    order: 3;
  }
`

export const ElTableCellNarrowOrder5 = css`
  ${isNarrow} {
    order: 4;
  }
`

export const ElTableCellNarrowOrder6 = css`
  ${isNarrow} {
    order: 5;
  }
`

export const ElTableCellNarrowOrder7 = css`
  ${isNarrow} {
    order: 6;
  }
`

export const ElTableCellNarrowOrder8 = css`
  ${isNarrow} {
    order: 7;
  }
`

export const ElTableCellNarrowOrder9 = css`
  ${isNarrow} {
    order: 8;
  }
`

export const ElTableCellNarrowOrder10 = css`
  ${isNarrow} {
    order: 9;
  }
`

export const ElTableCellNarrowOrder11 = css`
  ${isNarrow} {
    order: 10;
  }
`

export const ElTableCellNarrowOrder12 = css`
  ${isNarrow} {
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

// modifiers
export const elTableNarrowCellIsFullWidth = css`
  ${isNarrow} {
    grid-column-end: span 2;
    text-align: center;
  }
`
export const elTableCellHasDarkText = css``

export const elTableRowFocused = css`
  background: var(--color-purple-50);
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
  border-bottom: 1px solid var(--color-grey-100);

  ${isNarrow} {
    display: none;
  }
`

export const ElTableHeader = styled.div`
  color: var(--color-grey-400);
  padding: 1rem 0.5rem;
  display: flex;
  align-items: center;
  height: ${MAX_HEADER_HEIGHT};
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: var(--font-size-smallest);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;

  ${cellOrders}
`

export const ElTableRow = styled.div`
  display: grid;
  // see above for the explanation of this line
  grid-template-columns:
    repeat(var(--component-table-num-columns, auto-fit), minmax(var(--component-table-min-column-width), 1fr))
    var(--component-table-expandable-trigger-width, 0);
  background: var(--color-white);
  border-bottom: 1px solid var(--color-grey-100);

  ${isNarrow} {
    grid-template-columns: 1fr 1fr;
  }
`

export const ElTableCtaCell = styled.div`
  background: var(--color-white);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.75rem 0.5rem;
  order: 12;

  ${isNarrow} {
    grid-column-end: span 2;
    text-align: center;
    justify-content: right;
    justify-self: end;
    padding: 0;
    grid-column-end: 3;
  }
`

export const ElTableCell = styled.div`
  padding: 0.75rem;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  color: var(--color-grey-500);
  /* margin-right: 2px; */
  word-break: break-word;
  font-size: var(--font-size-small);

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

export const ElTableExpandableRowTriggerCell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 0.75rem;
  order: 12;

  ${isNarrow} {
    grid-column-end: span 2;
    text-align: center;
    justify-self: end;
    grid-column-end: 3;
  }
`

export const ElTableRowContainer = styled.div`
  &:hover:not(.${elIsActive}) {
    background-color: var(--color-grey-100);

    ${ElTableCell}, ${ElTableExpandableRowTriggerCell}, ${ElTableRow}, ${ElTableCtaCell} {
      background-color: var(--color-grey-100);
    }
  }

  &:focus,
  &.${elIsActive}, .${elTableRowFocused} {
    background: var(--color-purple-50);

    ${ElTableCell}, ${ElTableExpandableRowTriggerCell}, ${ElTableRow}, ${ElTableCtaCell} {
      background: var(--color-purple-50);
    }
  }

  &:not(.${elIsActive}) {
    background: var(--color-white);

    ${ElTableCell}, ${ElTableExpandableRowTriggerCell}, ${ElTableRow}, ${ElTableCtaCell} {
      background: var(--color-white);
    }
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

  ${isNarrow} {
    &::before {
      display: block;
      content: attr(data-narrow-label);
      width: 100%;
      color: var(--color-black);
    }
  }
`

export const ElTableCtaIconContainer = styled.div`
  padding: 1rem;
  background-color: var(--color-grey-100);

  ${isNarrow} {
    padding: 0.75rem;
  }
`

export const ElTableExpandableRow = styled.div`
  height: 0;
  background: var(--color-white);
  opacity: 0;
  border: none;
  overflow-y: scroll;
  padding: 0;

  &.${elIsActive} {
    height: auto;
    opacity: 1;
  }
`

export const ElTableExpandableContainer = styled.div`
  padding: 1rem 0.5rem;
  border-bottom: 1px solid var(--color-grey-100);
`

export const ElTable = styled.div`
  &[data-force-narrow-table='true'] {
    ${ElTableExpandableRowTriggerCell} {
      grid-column-end: span 2;
      text-align: center;
      justify-self: end;
      grid-column-end: 3;
    }

    ${ElTableCtaCell} {
      grid-column-end: span 2;
      text-align: center;
      justify-content: right;
      justify-self: end;
      padding: 0;
      grid-column-end: 3;
    }

    ${ElTableCtaIconContainer} {
      padding: 0.75rem;
    }

    ${ElTableCellContent} {
      &::before {
        display: block;
        content: attr(data-narrow-label);
        width: 100%;
        color: var(--color-black);
      }
    }

    ${ElTableRow} {
      grid-template-columns: 1fr 1fr;
    }

    ${ElTableHeadersRow} {
      display: none;
    }

    .${elTableNarrowCellIsFullWidth} {
      grid-column-end: span 2;
      text-align: center;
    }

    ${ElTableCellNarrowOrder1} {
      order: 0;
    }

    ${ElTableCellNarrowOrder2} {
      order: 1;
    }

    ${ElTableCellNarrowOrder3} {
      order: 2;
    }

    ${ElTableCellNarrowOrder4} {
      order: 3;
    }

    ${ElTableCellNarrowOrder5} {
      order: 4;
    }

    ${ElTableCellNarrowOrder6} {
      order: 5;
    }

    ${ElTableCellNarrowOrder7} {
      order: 6;
    }

    ${ElTableCellNarrowOrder8} {
      order: 7;
    }

    ${ElTableCellNarrowOrder9} {
      order: 8;
    }

    ${ElTableCellNarrowOrder10} {
      order: 9;
    }

    ${ElTableCellNarrowOrder11} {
      order: 10;
    }

    ${ElTableCellNarrowOrder12} {
      order: 11;
    }
  }

  &[data-num-columns-excl-action-col='2'] {
    --component-table-num-columns: 2;
  }
  &[data-num-columns-excl-action-col='3'] {
    --component-table-num-columns: 3;
  }
  &[data-num-columns-excl-action-col='4'] {
    --component-table-num-columns: 4;
  }
  &[data-num-columns-excl-action-col='5'] {
    --component-table-num-columns: 5;
  }
  &[data-num-columns-excl-action-col='6'] {
    --component-table-num-columns: 6;
  }
  &[data-num-columns-excl-action-col='7'] {
    --component-table-num-columns: 7;
  }
  &[data-num-columns-excl-action-col='8'] {
    --component-table-num-columns: 8;
  }
  &[data-num-columns-excl-action-col='9'] {
    --component-table-num-columns: 9;
  }
  &[data-num-columns-excl-action-col='10'] {
    --component-table-num-columns: 10;
  }
  &[data-num-columns-excl-action-col='11'] {
    --component-table-num-columns: 11;
  }
  &[data-num-columns-excl-action-col='12'] {
    --component-table-num-columns: 12;
  }

  &[data-has-expandable-action='true'] {
    --component-table-expandable-trigger-width: ${EXPANDABLE_TRIGGER_CELL_WIDTH};
  }

  &[data-has-call-to-action='true'] {
    --component-table-expandable-trigger-width: ${CALL_TO_ACTION_CELL_WIDTH};
  }
`

export const ElTableSortHeader = styled.div`
  width: 100%;
  cursor: pointer;
`
