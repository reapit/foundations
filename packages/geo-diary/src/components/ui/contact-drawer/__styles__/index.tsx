import { css } from '@linaria/core'
import { styled } from '@linaria/react'
import * as sizes from '../../../../core/__styles__/sizes'
import * as colors from '../../../../core/__styles__/colors'
import { iconButtonContainer } from '../../icon-button/__styles__'

export const contactName = css`
  font-size: ${sizes.textNormal};
  margin: 0;
`
export const extraContactName = css`
  padding: ${sizes.paddingNormal};
  margin-bottom: ${sizes.marginNormal};

  span {
    margin-right: ${sizes.marginNormal};
  }
`
export const contactOptionRow = css`
  margin-bottom: ${sizes.marginNormal};
  padding-bottom: ${sizes.paddingNormal};
  border-bottom: 1px solid ${colors.black20};
  padding-left: ${sizes.paddingLarge};
  padding-right: ${sizes.paddingLarge};

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`

export const contactOptionValue = css`
  text-align: left;
  font-size: var(--font-size-default);
`
export const contactOptionIcons = css`
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: flex-end;

  ${iconButtonContainer} {
    margin-left: ${sizes.marginNormal};
  }
`

export const FaIconWrap = styled.div`
  border: none;
  background: #fff;
  width: 1.8rem;
  height: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin: 0 0.65rem;

  svg {
    color: var(--color-grey-500);
    height: 100%;
    width: 100%;
  }
`
