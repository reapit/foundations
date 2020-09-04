import { css } from 'linaria'

export const scheduleWrapper = css`
  .schedule-parent {
    list-style-type: none;
    margin: 0;
    padding: 0;
    counter-reset: schedule1-item;
    > .schedule-child {
      display: table;
      margin-bottom: 0.6em;
      counter-increment: schedule1-item;
      &:before {
        content: counters(schedule1-item, '.');
        font-weight: 700;
        color: $black;
        display: table-cell;
        padding-right: 2em;
      }
      schedule-parent > .schedule-child {
        &:before {
          content: counters(schedule1-item, '.') ' ';
        }
      }
    }
  }
`
