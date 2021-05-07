import { css } from 'linaria'
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
