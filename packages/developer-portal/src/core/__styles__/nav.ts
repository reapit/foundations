import { css } from '@linaria/core'

export const NavWithOrgPicker = css`
  .el-nav-menu-option:first-child {
    height: auto;
  }
  .el-nav-menu-option:first-child:hover {
    cursor: default;
    color: var(--color-black);
  }
  .el-nav-item:nth-last-of-type(2) {
    margin-right: auto !important;
  }
  .el-nav-item:last-of-type {
    margin-right: 0 !important;
    background: none !important;
  }

  @media screen and (min-width: 768px) {
    .el-nav-item:last-of-type {
      margin-right: 0 !important;
    }
  }

  .el-nav-menu-option:first-of-type {
    padding: 0;
    margin-top: -0.5rem;
    margin-bottom: 0.5rem;
    border-bottom: 1px solid var(--color-grey-light);
  }
`
