import { Icon } from '../../icon'
import { styled } from '@linaria/react'
import { InputAddOn } from '../../input-add-on'
import { Input } from '../../input'
import { Loader } from '../../loader'

export const ElSearchableDropdownContainer = styled.div`
  display: flex;
  position: relative;
  flex-grow: 1;
`

export const ElSearchableDropdownResult = styled.div`
  padding: 0.5rem;
  :hover {
    background-color: #f5f5f5;
    color: #000;
    cursor: pointer;
  }
`

export const ElSearchableDropdownResultsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 4px 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2);
`

export const ElSearchableDropdownSearchInputAddOn = styled(InputAddOn)`
  position: absolute;
  margin-top: 8px;
  padding-left: 4px;
`

export const ElSearchableDropdownCloseButton = styled(Icon)`
  position: absolute;
  right: 0;
  padding: 9px;
  cursor: pointer;
`

export const ElSearchableDropdownSearchInput = styled(Input)`
  padding-left: 24px;
`

export const ElSearchableDropdownSearchLoader = styled(Loader)`
  position: absolute;
  margin-left: -88px;
`
