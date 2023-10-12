import { Icon } from '../../icon'
import { styled } from '@linaria/react'
import { InputAddOn } from '../../input-add-on'
import { Input } from '../../input'
import { Loader } from '../../loader'
import { Label } from '../../label'

export const ElSearchableDropdownContainer = styled.div`
  display: flex;
  position: relative;
  flex-grow: 1;
  color: var(--color-black);
`

export const ElSearchableDropdownResult = styled.div`
  padding: 0.5rem;
  font-size: var(--font-size-small);
  :hover {
    color: var(--intent-primary);
    cursor: pointer;
  }
`

export const ElSearchableDropdownResultsContainer = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 11;
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
  padding-left: 8px;
`

export const ElSearchableDropdownCloseButton = styled(Icon)`
  position: absolute;
  right: 0;
  padding: 9px;
  cursor: pointer;
`

export const ElSearchableDropdownSearchInput = styled(Input)`
  padding-left: 32px;
`

export const ElSearchableDropdownSearchLabel = styled(Label)`
  margin-left: 0.25rem;
  margin-bottom: 0.125rem;
  display: inline-block;
`

export const ElSearchableDropdownSearchLoader = styled(Loader)`
  position: absolute;
  margin-left: -88px;
`
