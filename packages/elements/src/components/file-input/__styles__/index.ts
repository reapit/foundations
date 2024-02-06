import { ElLabel } from './../../label/__styles__/index'
import { ElIcon } from './../../icon/__styles__/index'
import { ElButton } from './../../button/__styles__/index'
import { styled } from '@linaria/react'

export const ElFileInput = styled.input`
  &[type='file'] {
    font-family: var(--font-sans-serif);
    position: absolute;
    height: 34px;
    width: 5.5rem;
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
  position: relative;

  ${ElButton} {
    height: 34px;
    padding: 1rem;
  }

  ${ElLabel} {
    height: 1.25rem;
    display: block;
  }
`

export const ElFileInputIconContainer = styled.div`
  display: flex;
  height: 34px;

  ${ElIcon} {
    background: var(--color-white);
    border: 1px solid var(--component-input-focus-bg);
    border-radius: 0.25rem;
    height: 100%;
    width: 34px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }
`
export const ElFileInputHidden = styled.input`
  position: absolute;
  margin: 0;
  height: 0;
  width: 0;
  visibility: hidden;
  padding: 0;
`

export const ElFilePreviewImage = styled.img`
  max-width: 100%;
  max-height: 100%;
`
