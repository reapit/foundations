import { css } from 'linaria'
import * as sizes from '../../../../core/__styles__/sizes'
import * as colors from '../../../../core/__styles__/colors'
import { iconButtonContainer } from '../../icon-button/__styles__'

export const contactName = css`
  font-size: ${sizes.textNormal};
  margin: 0;
`
export const extraContactName = css`
  padding: ${sizes.paddingLarge};
  margin-bottom: ${sizes.marginLarge};

  span {
    margin-right: ${sizes.marginLarge};
  }
`
export const contactOptionRow = css`
  margin-bottom: ${sizes.marginMedium};
  padding-bottom: ${sizes.paddingMedium};
  border-bottom: 1px solid ${colors.black20};
  padding-left: ${sizes.paddingLarge};
  padding-right: ${sizes.paddingLarge};

  &:last-child {
    margin-bottom: 0;
    padding-bottom: 0;
    border-bottom: none;
  }
`
export const contactOptionLabel = css`
  text-align: left;
  font-size: ${sizes.textSmaller};
  font-weight: ${sizes.semiBold};
  text-transform: uppercase;
  color: ${colors.black60};
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
