import { styled } from '@linaria/react'

const checked = `data:image/svg+xml;utf8,<svg width="12px" height="12px" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17.8336 19.2477C18.1265 19.5406 18.6014 19.5406 18.8943 19.2477C19.1872 18.9548 19.1872 18.4799 18.8943 18.1871L10.7071 9.9999L19.1369 1.57012C19.4298 1.27723 19.4298 0.802358 19.1369 0.509465C18.844 0.216572 18.3692 0.216572 18.0763 0.509465L9.64649 8.93924L1.57019 0.862935C1.27729 0.570042 0.802419 0.570042 0.509526 0.862935C0.216633 1.15583 0.216632 1.6307 0.509526 1.9236L8.58583 9.9999L0.752144 17.8336C0.459251 18.1265 0.459251 18.6013 0.752144 18.8942C1.04504 19.1871 1.51991 19.1871 1.8128 18.8942L9.64649 11.0606L17.8336 19.2477Z" fill="currentColor"/>
</svg>
`

export const ElChipCheckbox = styled.input`
  height: 0;
  width: 0;
  visibility: hidden;
  position: absolute;

  :checked + label,
  :hover + label {
    background: var(--color-purple-50);
    padding: 0.2rem 2rem 0.2rem 1rem;
    color: var(--color-black);

    &::before {
      content: '';
      position: absolute;
      background-image: url('${checked}');
      background-position: center center;
      background-repeat: no-repeat;
      height: 1rem;
      width: 1rem;
      right: 0.5rem;
      margin-top: 2px;
    }
  }
`

export const ElChipLabel = styled.label`
  cursor: pointer;
  width: auto;
  height: 28px;
  background: var(--color-purple-50);
  border: 1px solid var(--color-purple-50);
  border-radius: 1rem;
  padding: 0.2rem 1.5rem;
  position: relative;
  font-size: var(--font-size-small);
  transition: all 0.2s linear;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-grey-500);

  &:hover {
    color: var(--color-grey-700);
  }
`

export const ElChipGroup = styled.div`
  display: grid;
`

export const ElChipGroupInner = styled.div`
  display: flex;
  flex-wrap: wrap;
  grid-auto-flow: column;
  column-gap: 0.25rem;
  row-gap: 0.25rem;
  width: fit-content;
  height: fit-content;
`
