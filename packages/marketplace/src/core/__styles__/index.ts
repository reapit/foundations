import { css } from 'linaria'

export const globals = css`
  @import url('https://fonts.googleapis.com/css?family=Source+Code+Pro&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

  :global() {
    body {
      background: #262f69;
    }

    #root {
      height: 100%;
      background: #f2f2f2;
    }
  }
`
