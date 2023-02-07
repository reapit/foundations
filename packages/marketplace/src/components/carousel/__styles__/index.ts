import { styled } from '@linaria/react'
import { forMobileAndAbove } from '../../../core/__styles__/media'

export interface CarouselGridProps {
  percentageWidth: string
  numberCols: number
  numberItems: number
}

export const CarouselWrapper = styled.div`
  position: relative;
  height: fit-content;
`

export const CarouselCol = styled.div`
  scroll-snap-align: start;
  align-self: end;
`

export const CarouselGrid = styled.div<CarouselGridProps>`
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  scroll-behavior: smooth;
  display: grid;
  grid-auto-flow: column;
  grid-column-gap: 0.75rem;
  grid-template-columns: repeat(
    ${({ numberItems }) => numberItems},
    calc(
      ${({ percentageWidth }) => percentageWidth}% -
        ${({ numberCols }) => {
          return `${0.75 - 0.75 / numberCols}rem`
        }}
    )
  );

  &::-webkit-scrollbar {
    display: none;
  }

  ${forMobileAndAbove} {
    grid-column-gap: 1.25rem;
    grid-template-columns: repeat(
      ${({ numberItems }) => numberItems},
      calc(
        ${({ percentageWidth }) => percentageWidth}% -
          ${({ numberCols }) => {
            return `${1.25 - 1.25 / numberCols}rem`
          }}
      )
    );
  }
`

export const CarouselControls = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: calc(50% - 1rem);
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: var(--color-white);
  box-shadow: 0px 2px 9px rgba(20, 164, 224, 0.15);

  &:hover {
    svg {
      color: var(--intent-secondary);
    }
  }
`

export const CarouselControlsRight = styled(CarouselControls)`
  right: -1rem;
`

export const CarouselControlsLeft = styled(CarouselControls)`
  left: -1rem;
`
