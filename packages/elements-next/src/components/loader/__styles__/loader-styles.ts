import { css } from 'linaria'

export const elLoader = css`
  position: relative;
  width: 100%;
  height: 100%;
  &.is-loading {
    .el-loader-overlay {
      opacity: 0.7;
    }
  }
  &.is-embedded {
    .el-spinner {
      position: absolute;
      margin: auto;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
    }
  }
`

export const elLoaderOverlay = css`
  background: white;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100%;
  height: 100%;
  clear: both;
  overflow: hidden;
  opacity: 0;
  user-select: none;
  pointer-events: none;
  transition: opacity 0.5s ease;
`

export const elSpinner = css`
  margin: auto;
  height: 40px;
  text-align: center;
  z-index: 5;
  opacity: 0;
  transition: opacity 0.5s ease;
  &.is-loading {
    opacity: 1;
  }
  &.small {
    height: 20px;
    > div {
      width: 3px;
    }
  }
  &.large {
    height: 60px;
    > div {
      width: 12px;
    }
  }
  p {
    margin: 0;
  }
  > div {
    background-color: #74818d;
    height: 100%;
    width: 6px;
    display: inline-block;
    -webkit-animation: sk-stretchdelay 1.2s infinite ease-in-out;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
    margin: 0 1.5px;
  }
  .rect2 {
    -webkit-animation-delay: -1.1s;
    animation-delay: -1.1s;
  }
  .rect3 {
    -webkit-animation-delay: -1s;
    animation-delay: -1s;
  }
  .rect4 {
    -webkit-animation-delay: -0.9s;
    animation-delay: -0.9s;
  }
  @-webkit-keyframes sk-stretchdelay {
    0%,
    40%,
    100% {
      -webkit-transform: scaleY(0.4);
    }
    20% {
      -webkit-transform: scaleY(1);
    }
  }

  @keyframes sk-stretchdelay {
    0%,
    40%,
    100% {
      transform: scaleY(0.4);
      -webkit-transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1);
      -webkit-transform: scaleY(1);
    }
  }
`
