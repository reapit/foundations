import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import { intentPrimary, intentNeutral } from '../../../styles/globals'

const checked = (fill: string) =>
  `data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.99996 0C3.58881 0 0 3.58872 0 7.99996C0 12.4112 3.58881 16 7.99996 16C12.4111 16 15.9999 12.4112 15.9999 7.99996C15.9999 3.58872 12.4112 0 7.99996 0ZM12.5937 6.6487L7.56771 11.6747C7.354 11.8884 7.06993 12.006 6.76774 12.006C6.46555 12.006 6.18147 11.8884 5.96777 11.6747L3.40624 9.11314C3.19254 8.89944 3.07483 8.61536 3.07483 8.31317C3.07483 8.01089 3.19254 7.72682 3.40624 7.51311C3.61986 7.29941 3.90394 7.18171 4.20621 7.18171C4.5084 7.18171 4.79256 7.29941 5.00618 7.5132L6.76765 9.27459L10.9936 5.04867C11.2073 4.83497 11.4913 4.71735 11.7935 4.71735C12.0957 4.71735 12.3798 4.83497 12.5935 5.04867C13.0348 5.48994 13.0348 6.2076 12.5937 6.6487Z" fill="${encodeURIComponent(
    fill,
  )}"/></svg>`

const dismiss = (fill: string) =>
  `data:image/svg+xml;utf8,<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M0 7.99996C0 3.58872 3.58881 0 7.99996 0C12.4112 0 15.9999 3.58872 15.9999 7.99996C15.9999 12.4112 12.4111 16 7.99996 16C3.58881 16 0 12.4112 0 7.99996ZM11.6374 11.6611C11.1884 12.113 10.4605 12.113 10.0116 11.6611L7.99254 9.62892L5.95504 11.6423C5.50196 12.09 4.77408 12.0832 4.32927 11.6272C3.88446 11.1712 3.89116 10.4386 4.34424 9.99085L6.36664 7.99243L4.36261 5.97534C3.91365 5.52345 3.91365 4.7908 4.36261 4.33891C4.81157 3.88703 5.53948 3.88703 5.98844 4.33891L8.00744 6.37107L10.045 4.3577C10.498 3.90999 11.2259 3.91674 11.6707 4.37277C12.1155 4.8288 12.1088 5.56142 11.6558 6.00912L9.63335 8.00756L11.6374 10.0247C12.0863 10.4765 12.0863 11.2092 11.6374 11.6611Z" fill="${encodeURIComponent(
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
      background-image: url('${checked(intentNeutral)}');
      background-position: center center;
      background-repeat: no-repeat;
      height: 1rem;
      width: 1rem;
      right: 0.5rem;
      margin-top: 2px;
    }

    &:hover {
      &:before {
        background-image: url('${dismiss(intentPrimary)}');
      }
    }

    &.${elHasGreyChips} {
      background: var(--color-accent-blue-lightest);
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
        margin-top: 2px;
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
  border: 1px solid var(--color-grey-light);
  padding: 0.2rem 1.5rem;
  position: relative;
  font-size: var(--font-size-small);
  transition: all 0.2s linear;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-grey-dark);

  &.${elHasGreyChips} {
    background: var(--color-accent-blue-lightest);
    border: 1px solid var(--color-accent-blue-lightest);
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
  border: 1px solid var(--color-grey-light);
  border-bottom: none;
  border-radius: 2px 2px 0 0;
  min-height: 3rem;
  padding: 0.25rem 0.5rem;
  position: relative;

  p {
    margin-left: 0.375rem;
    font-size: var(--font-size-small);
    color: var(--color-grey-dark);
  }
`

export const ElMultiSelectUnSelected = styled.div`
  display: flex;
  flex-wrap: wrap;
  padding: 0.25rem 0.5rem;
  background-color: var(--color-white);
  border: 1px solid var(--color-grey-light);
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
