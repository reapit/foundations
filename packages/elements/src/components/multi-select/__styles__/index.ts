import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { intentPrimary, intentDefault } from '../../../styles/globals'

const checked = (fill: string) =>
  `data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20.2887 6.38743C19.7721 5.87086 18.9347 5.87086 18.4182 6.38743L9.99959 14.8067L6.25793 11.0643C5.74136 10.5478 4.904 10.5478 4.38743 11.0643C3.87086 11.5816 3.87086 12.4183 4.38743 12.9348L9.06434 17.6124C9.32295 17.8704 9.6616 18 9.99959 18C10.3382 18 10.6769 17.8704 10.9348 17.6124L20.2887 8.25793C20.8052 7.74202 20.8052 6.90334 20.2887 6.38743Z" fill="${encodeURIComponent(
    fill,
  )}"/></svg>`

const dismiss = (fill: string) =>
  `data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12.3608 13.8296L18.0208 19.4896C18.2652 19.775 18.6489 19.8993 19.0142 19.8114C19.3795 19.7235 19.6647 19.4383 19.7526 19.073C19.8405 18.7077 19.7162 18.324 19.4308 18.0796L13.7708 12.4196L19.4308 6.75958C19.7162 6.51519 19.8405 6.13146 19.7526 5.76616C19.6647 5.40086 19.3795 5.11564 19.0142 5.02777C18.6489 4.93989 18.2652 5.0642 18.0208 5.34958L12.3608 11.0096L6.70079 5.34958C6.31076 4.96185 5.68083 4.96185 5.29079 5.34958C4.90307 5.73961 4.90307 6.36954 5.29079 6.75958L10.9508 12.4196L5.29079 18.0796C4.90307 18.4696 4.90307 19.0995 5.29079 19.4896C5.68083 19.8773 6.31076 19.8773 6.70079 19.4896L12.3608 13.8296Z" fill="${encodeURIComponent(
    fill,
  )}"/></svg>`

export const elHasGreyChips = css``

export const ElMultiSelectCheckbox = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
  position: absolute;

  :checked + label {
    background: var(--color-white);
    padding: 0.2rem 2rem 0.2rem 1rem;
    color: var(--color-black);

    &::before {
      content: '';
      position: absolute;
      background-image: url('${checked(intentDefault)}');
      background-position: center center;
      background-repeat: no-repeat;
      height: 1rem;
      width: 1rem;
      right: 0.5rem;
      top: 0.3rem;
    }

    &:hover {
      &:before {
        background-image: url('${dismiss(intentPrimary)}');
      }
    }

    &.${elHasGreyChips} {
      background: var(--color-purple-50);
    }
  }

  :not(:checked) + label {
    &:hover {
      padding: 0.2rem 2rem 0.2rem 1rem;
      &:before {
        content: '';
        position: absolute;
        background-image: url('${checked(intentPrimary)}');
        background-position: center center;
        background-repeat: no-repeat;
        height: 1rem;
        width: 1rem;
        right: 0.5rem;
        top: 0.3rem;
      }
    }
  }
`

export const ElMultiSelectLabel = styled.label`
  cursor: pointer;
  min-width: 75px;
  width: auto;
  margin: 0.25rem 0.375rem;
  height: 28px;
  background: var(--color-white);
  border-radius: 1rem;
  border: 1px solid var(--color-grey-150);
  padding: 0.2rem 1.5rem;
  position: relative;
  font-size: var(--font-size-small);
  transition: all 0.2s linear;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-grey-500);

  &.${elHasGreyChips} {
    background: var(--color-purple-50);
    border: 1px solid var(--color-purple-50);
  }

  &:hover {
    color: var(--color-black);
  }
`

export const ElMultiSelect = styled.div`
  display: flex;
  flex-wrap: wrap;
  background-color: var(--color-white);
  padding: 0.25rem 0.5rem;
  position: relative;
`

export const ElMultiSelectSelected = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  padding: 0.25rem 0.5rem;
  background-color: var(--color-white);
  border: 1px solid var(--color-grey-150);
  border-radius: 2px 2px 0 0;
  min-height: 3rem;
  padding: 0.25rem 0.5rem;
  position: relative;

  p {
    margin-left: 0.375rem;
    font-size: var(--font-size-small);
    color: var(--color-grey-500);
  }
`

export const ElMultiSelectUnSelected = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.25rem 0.5rem;
  background-color: var(--color-white);
  border: 1px solid var(--color-grey-150);
  border-top: none;
  border-radius: 0 0 4px 4px;
  padding: 0.25rem 0.5rem;
  position: relative;
`

export const ElMultiSelectInput = styled.input`
  height: 0;
  width: 0;
  position: absolute;
  visibility: hidden;
`

export const ElMultiSelectInputWrapper = styled.div`
  width: 100%;
`
