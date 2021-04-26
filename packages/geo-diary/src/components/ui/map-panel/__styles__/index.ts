import { css } from 'linaria'

export const mapPanelContainer = css`
  position: absolute;
  bottom: 0;
  width: calc(100vw - 416px);
  left: 416px;
  display: flex;
  background-color: #fff;
  padding: 1.5rem;

  & > * {
    margin-right: 10px;
  }

  @media screen and (max-width: 768px) {
    justify-content: space-between;

    & > * {
      margin-right: 0;
    }
    left: 0;
    width: 100%;
  }
  @media screen and (min-width: 768px) {
    width: calc(100vw - 464px);
    left: 0;
  }
`
