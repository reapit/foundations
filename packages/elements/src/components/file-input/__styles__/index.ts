import { styled } from '@linaria/react'

export const ElFileInput = styled.input`
  &[type='file'] {
    font-family: var(--font-sans-serif);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
    z-index: 10;
    cursor: pointer;

    &::file-selector-button {
      visibility: hidden;
      width: 0;
    }
  }
`

export const ElFileInputWrap = styled.div`
  display: inline-block;
  text-align: left;
  background: #fff;
  padding: 16px;
  width: 450px;
  position: relative;
  border-radius: 3px;
`

export const ElFileInputText = styled.div`
  color: #333;
  white-space: nowrap;
  opacity: 0.3;
`
