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
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 2rem;
  font-size: var(--font-size-small);

  :hover {
    background-color: var(--intent-primary);
    color: var(--color-white);
    cursor: pointer;
  }
`

export const ElSearchableDropdownResultsContainer = styled.div`
  position: absolute;
  top: calc(100% + 0.25rem);
  left: 0;
  z-index: 11;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background: #fff;
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 4px;
  background: var(--color-white);
  box-shadow: 0px 4px 16px 0px rgba(34, 43, 51, 0.16);
`

export const ElSearchableDropdownSearchInputAddOn = styled(InputAddOn)`
  position: absolute;
  margin-top: 10px;
  padding-left: 10px;
`

export const ElSearchableDropdownCloseButton = styled(Icon)`
  position: absolute;
  font-size: 1rem;
  color: var(--intent-default);
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
