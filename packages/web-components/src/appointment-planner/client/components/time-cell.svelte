<script>
  import { css } from 'emotion'
  import cx from 'classnames'

  export let startTime = ''

  const backgroundStyle = css`
    background: ${startTime ? '#e6e6e6' : ''};
    &:hover {
      background: ${startTime ? 'var(--hoverBackgroundColor)' : ''};
    }
  `
</script>

<style>
  .time-cell__container {
    padding: 10px;
    margin-bottom: var(--cellSpacing);
    height: 5vw;
    cursor: pointer;
  }
</style>

<div class={cx('time-cell__container', backgroundStyle)}>
  <div>{startTime || ''}</div>
</div>
