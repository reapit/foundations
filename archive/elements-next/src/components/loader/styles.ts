import { css } from 'linaria'

export const elLoaderContainer = css`
  position: relative;
  width: 100%;
  height: 100%;
  &.is-loading {
    .el-loader-overlay {
      opacity: 0.8;
    }
  }
  .el-loader {
    position: absolute;
    margin: auto;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
`

export const elLoaderOverlay = css`
  background: var(--color-white, #fff);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  clear: both;
  overflow: hidden;
  opacity: 0;
  user-select: none;
  pointer-events: none;
  transition: opacity 0.5s ease;
`

export const elLoader = css`
  margin: auto;
  height: 40px;
  text-align: center;
  z-index: 2;
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
    background-color: var(--color-grey, #74818d);
    height: 100%;
    width: 6px;
    display: inline-block;
    animation: sk-stretchdelay 1.2s infinite ease-in-out;
    margin: 0 1.5px;
    &:nth-child(2) {
      animation-delay: -1.1s;
    }
    &:nth-child(3) {
      animation-delay: -1s;
    }
    &:nth-child(4) {
      animation-delay: -0.9s;
    }
  }

  @keyframes sk-stretchdelay {
    0%,
    40%,
    100% {
      transform: scaleY(0.4);
    }
    20% {
      transform: scaleY(1);
    }
  }
`
