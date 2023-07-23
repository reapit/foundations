import { css } from '@linaria/core'
import { styled } from '@linaria/react'

export const ElNavContainer = styled.nav`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  background-color: var(--color-white);
  height: auto;
  width: 100%;
  position: sticky;
  top: 0;
  z-index: 3;
  border-bottom: 1px solid var(--color-grey-light);
  height: auto;
  flex: 0 0 auto;
  overflow: hidden;
  flex-wrap: wrap;

  @media screen and (min-width: 768px) {
    height: 3.5rem;
    flex: 0 0 3.5rem;
    flex-wrap: nowrap;
    overflow-x: auto;
  }
`

export const ElNavSubContainer = styled.div`
  background-color: var(--nav-menu-background-accent);
  width: 100%;

  @media screen and (min-width: 768px) {
    display: none;
  }
`

export const ElNavItem = styled.a`
  font-family: var(--font-sans-serif);
  font-size: var(--font-size-small);
  color: var(--color-grey-medium);
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
    --nav-menu-icon-primary-accent: var(--color-brand);
    --nav-menu-icon-secondary-accent: var(--color-brand-light);
    color: var(--color-brand);
    background-color: var(--color-accent-blue-lightest);
  }

  &:hover:not(:first-child) {
    border-left: 3px solid var(--color-brand);
  }

  &:first-child {
    opacity: 1;
    padding: 0;
    background-color: var(--color-white);
    margin-right: auto;
    width: 100%;
    padding: 0rem 0.75rem;
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
      padding: 0.5rem;
      height: 3.5rem;
    }

    &:hover:not(:first-child) {
      padding-bottom: 0.25rem;
      border-bottom: 0.25rem solid var(--color-brand);
      border-left: none;
    }

    &:first-child {
      width: auto;
    }

    svg {
      height: 2rem;
    }
  }
`

export const elNavItemActive = css`
  &:not(:first-child) {
    background-color: var(--color-accent-blue-lightest);
    border-left: 3px solid var(--color-brand-dark);
    color: var(--color-brand-dark);
  }

  @media screen and (min-width: 768px) {
    &:not(:first-child) {
      --nav-menu-icon-primary-accent: var(--color-brand-dark);
      --nav-menu-icon-secondary-accent: var(--color-brand);
      padding-bottom: 0.25rem;
      border-bottom: 0.25rem solid var(--color-brand-dark);
      border-left: none;
      height: 3.5rem;
    }
  }
`

export const elNavItemExpanded = css`
  :not(:first-child) {
    height: auto;
  }

  @media screen and (max-width: 767px) {
    opacity: 1;
    padding: 0.125rem 0.75rem;
    overflow: visible;
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
  color: var(--color-grey-medium);
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
    padding: 0.125rem 0.75rem 0.125rem 1.5rem;

    &:hover {
      color: var(--color-brand);
      background-color: var(--color-accent-blue-lightest);
      border-left: 3px solid var(--color-brand);
    }
  }
`

export const elNavSubItemActive = css`
  background-color: var(--color-accent-blue-lightest);
  border-left: 3px solid var(--color-brand-dark);
  color: var(--color-brand-dark);
`

export const elNavItemHideDesktop = css`
  @media screen and (min-width: 768px) {
    height: 0;
    width: 0;
    visibility: hidden;
  }

  svg {
    height: 1.2rem;
  }
`

export const elNavItemSecondary = css`
  @media screen and (min-width: 768px) {
    margin-left: auto;
  }
`

// Deprecated, we use the same interface for desktop and web - left class in to avoid breaking changes
export const elNavIsDesktop = css``
