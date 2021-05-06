import { css } from 'linaria'
import * as colors from '../../../../core/__styles__/colors'
import * as sizes from '../../../../core/__styles__/sizes'

export const tagContainer = css`
  display: inline-block;
  background: ${colors.gray2};
  font-size: ${sizes.textSmaller};
  font-weight: ${sizes.semiBold};
  color: black;
  border-radius: 100rem; // set a very high number to make sure it's always completely rounded
  padding: ${sizes.paddingNormal} ${sizes.paddingLarge};
  box-sizing: border-box;
`
