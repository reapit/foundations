import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { ElAvatar } from '../../avatar'

export const ElNavContainer = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  background-color: var(--color-white);
  height: auto;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 3;
  height: auto;
  flex: 0 0 auto;
  overflow: hidden;
  flex-wrap: wrap;

  @media screen and (min-width: 768px) {
    height: 3.5rem;
    flex: 0 0 3.5rem;
    flex-wrap: nowrap;
    overflow-x: auto;
    border-bottom: 1px solid var(--color-grey-100);
  }
`

export const ElNavSubContainer = styled.div`
  background-color: var(--nav-menu-background-accent);
  width: 100%;

  @media screen and (min-width: 768px) {
    display: none;
  }
`

export const elNavItemSecondary = css`
  @media screen and (min-width: 768px) {
    margin-left: auto;

    &:last-child {
      margin-right: 0;
    }
  }
`

export const ElNavItem = styled.a`
  font-family: var(--font-sans-serif);
  font-size: var(--font-size-small);
  color: var(--color-grey-400);
  display: flex;
  text-align: center;
  justify-content: flex-start;
  align-items: center;
  opacity: 0;
  cursor: pointer;
  height: 3.5rem;
  align-items: center;
  opacity: 1;
  flex: 1 0 100%;
  width: 100%;
  border-left: 3px solid var(--color-white);

  svg {
    height: 2rem;
  }

  &:hover {
    color: var(--color-purple-300);
    background-color: var(--color-purple-50);
  }

  &:hover:not(:first-child) {
    border-left: 3px solid var(--color-purple-300);
  }

  &:first-child {
    opacity: 1;
    padding: 0;
    background-color: var(--color-white);
    margin-right: auto;
    width: 100%;
    padding: 0rem 0.75rem;
    border-bottom: 1px solid var(--color-grey-100);
  }

  :not(:first-child) {
    height: 0;
    overflow: hidden;
  }

  @media screen and (min-width: 768px) {
    height: 3.5rem;
    flex: 0 0 auto;
    justify-content: center;
    font-size: var(--font-size-default);
    padding: 0 0.75rem;
    width: auto;
    border-left: none;

    :not(:first-child) {
      overflow: visible;
      padding: 0.375rem 0.75rem;
      border-radius: 0.25rem;
      height: 2rem;
      border-top: none;
      margin-right: 1rem;
    }

    &:hover:not(:first-child) {
      background-color: var(--color-grey-100);
      border-left: none;

      &.${elNavItemSecondary} {
        background-color: var(--color-white);
      }
    }

    &:first-child {
      width: auto;
      border-bottom: none;
    }

    svg,
    ${ElAvatar} {
      height: 2rem;
      width: 2rem;
    }
  }
`

export const elNavItemActive = css`
  &:not(:first-child) {
    background-color: var(--color-purple-50);
    border-left: 3px solid var(--color-purple-500);
    color: var(--color-purple-500);
  }

  @media screen and (min-width: 768px) {
    &:not(:first-child) {
      --nav-menu-icon-primary-accent: var(--color-purple-500);
      --nav-menu-icon-secondary-accent: var(--color-purple-300);
      padding: 0.375rem 0.75rem;
      border-radius: 0.25rem;
      background-color: var(--color-grey-100);
      border-left: none;
      height: 2rem;

      &.${elNavItemSecondary} {
        background-color: var(--color-white);
      }
    }
  }
`

export const elNavItemExpanded = css`
  :not(:first-child) {
    height: 2rem;
  }

  @media screen and (max-width: 767px) {
    opacity: 1;
    padding: 0.625rem 1.5rem;
    overflow: visible;
    height: auto;

    &:last-child {
      border-bottom: 1px solid var(--color-grey-100);
    }
  }
`

export const elNavItemIcon = css`
  @media screen and (max-width: 767px) {
    margin-left: 0.75rem;
  }
`

export const ElNavSubItem = styled.a`
  height: 0;
  font-family: var(--font-sans-serif);
  font-size: var(--font-size-small);
  color: var(--color-grey-400);
  opacity: 0;
  display: flex;
  text-align: flex-start;
  justify-content: flex-start;
  align-items: center;
  transition: all 0.3s linear;
  border-left: 3px solid var(--color-white);

  @media screen and (min-width: 768px) {
    display: none;
  }
`

export const elNavSubItemExpanded = css`
  @media screen and (max-width: 767px) {
    height: auto;
    width: 100%;
    display: block;
    opacity: 1;
    padding: 0.625rem 1.5rem;
    margin-left: 1rem;

    &:hover {
      color: var(--color-purple-300);
    }
  }
`

export const elNavSubItemActive = css`
  color: var(--color-purple-500);
  margin-left: 1rem;
`

export const elNavItemHideDesktop = css`
  @media screen and (min-width: 768px) {
    height: 0;
    width: 0;
    visibility: hidden;
    padding: 0 !important;
    margin: 0 !important;
  }

  svg {
    height: 1.2rem;
  }
`

// Deprecated, we use the same interface for desktop and web - left class in to avoid breaking changes
export const elNavIsDesktop = css``
