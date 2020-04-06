<script>
  import { css } from 'emotion'
  import cx from 'classnames'
  import { themeStore  } from '../core/store/theme-store'

  export let startTime = ''

  const visibilityStyle = css`
   visible: ${startTime ? 'visible' : 'hidden'}
  `
</script>

<style>
  .time-cell-container {
    padding: 10px;
    margin-bottom: var(--cellSpacing);
    height: 5vw;
    cursor: pointer;
  }
</style>

<div class="time-cell-container {visibilityStyle} {$themeStore.item}">
  <div>{startTime || ''}</div>
</div>
