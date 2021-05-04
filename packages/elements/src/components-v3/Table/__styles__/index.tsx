import { css } from 'linaria'
import { styled } from 'linaria/react'
import { ElIcon } from '../../Icon/__styles__'
import { elIsActive } from '../../../styles-v3/base/states'

const EXPANDABLE_TRIGGER_CELL_WIDTH = '50px'

export const ElTable = styled.div`
  &[data-num-columns-excl-expandable-row-trigger-col='2'] {
    --component-table-expandable-trigger-width: ${EXPANDABLE_TRIGGER_CELL_WIDTH};
    --component-table-num-columns: 2;
  }
  &[data-num-columns-excl-expandable-row-trigger-col='3'] {
    --component-table-expandable-trigger-width: ${EXPANDABLE_TRIGGER_CELL_WIDTH};
    --component-table-num-columns: 3;
  }
  &[data-num-columns-excl-expandable-row-trigger-col='4'] {
    --component-table-expandable-trigger-width: ${EXPANDABLE_TRIGGER_CELL_WIDTH};
    --component-table-num-columns: 4;
  }
  &[data-num-columns-excl-expandable-row-trigger-col='5'] {
    --component-table-expandable-trigger-width: ${EXPANDABLE_TRIGGER_CELL_WIDTH};
    --component-table-num-columns: 5;
  }
  &[data-num-columns-excl-expandable-row-trigger-col='6'] {
    --component-table-expandable-trigger-width: ${EXPANDABLE_TRIGGER_CELL_WIDTH};
    --component-table-num-columns: 6;
  }
  &[data-num-columns-excl-expandable-row-trigger-col='7'] {
    --component-table-expandable-trigger-width: ${EXPANDABLE_TRIGGER_CELL_WIDTH};
    --component-table-num-columns: 7;
  }
  &[data-num-columns-excl-expandable-row-trigger-col='8'] {
    --component-table-expandable-trigger-width: ${EXPANDABLE_TRIGGER_CELL_WIDTH};
    --component-table-num-columns: 8;
  }
  &[data-num-columns-excl-expandable-row-trigger-col='9'] {
    --component-table-expandable-trigger-width: ${EXPANDABLE_TRIGGER_CELL_WIDTH};
    --component-table-num-columns: 9;
  }
  &[data-num-columns-excl-expandable-row-trigger-col='10'] {
    --component-table-expandable-trigger-width: ${EXPANDABLE_TRIGGER_CELL_WIDTH};
    --component-table-num-columns: 10;
  }
  &[data-num-columns-excl-expandable-row-trigger-col='11'] {
    --component-table-expandable-trigger-width: ${EXPANDABLE_TRIGGER_CELL_WIDTH};
    --component-table-num-columns: 11;
  }
  &[data-num-columns-excl-expandable-row-trigger-col='12'] {
    --component-table-expandable-trigger-width: ${EXPANDABLE_TRIGGER_CELL_WIDTH};
    --component-table-num-columns: 12;
  }
`

// modifiers
export const elTableNarrowCellIsFullWidth = css`
  @media screen and (max-width: 750px) {
    grid-column-end: span 2;
    text-align: center;
  }
`
export const elTableCellHasDarkText = css``

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

  grid-template-columns: repeat(var(--component-table-num-columns, auto-fit), minmax(var(--component-table-min-column-width), 1fr)) var(--component-table-expandable-trigger-width, 0);

  @media screen and (max-width: 750px) {
    display: none;
  }
}

`
export const ElTableHeader = styled.div`
  background: var(--color-grey-light);
  color: var(--color-black);
  padding: 0.75rem;
  margin-right: 2px;

  &:last-child {
    margin-right: 0;
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

  @media screen and (max-width: 750px) {
    grid-template-columns: 1fr 1fr;
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

  ${ElIcon} {
    margin-right: 0.75rem;
  }

  &.${elTableCellHasDarkText} {
    color: var(--color-black);
  }
`

export const ElTableCellContent = styled.div`
  flex: 1;

  @media screen and (max-width: 750px) {
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

  @media screen and (max-width: 750px) {
    grid-column-end: span 2;
    text-align: center;
  }
`

export const ElTableExpandableRow = styled.div`
  display: none;

  background: var(--color-white);
  box-shadow: 0px 2px 9px rgba(0, 0, 0, 0.08);
  border-radius: 0 0 var(--default-border-radius) var(--default-border-radius);
  padding: 0.75rem 1rem;
  border-top: 1px solid var(--color-grey-medium);

  &${elIsActive} {
    display: block;
  }
`
