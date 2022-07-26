import { styled } from '@linaria/react'
import { forMobileAndAbove } from '../../../core/__styles__/media'

export interface CarouselGridProps {
  percentageWidth: string
  numberCols: number
  numberItems: number
}

export const CarouselWrapper = styled.div`
  position: relative;
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
  grid-template-columns: repeat(
    auto-fill,
    minmax(
      calc(
        ${({ percentageWidth }) => percentageWidth}% -
          ${({ numberCols, numberItems }) => {
            if (numberCols === numberItems) return `${0.375 / numberItems + 0.375}rem`
            if (numberCols > 1) return '0.375rem'
            return '0rem'
          }}
      ),
      1fr
    )
  );
  grid-auto-flow: column;
  grid-auto-columns: minmax(
    calc(
      ${(props) => props.percentageWidth}% -
        ${({ numberCols, numberItems }) => {
          if (numberCols === numberItems) return `${0.375 / numberItems + 0.375}rem`
          if (numberCols > 1) return '0.375rem'
          return '0rem'
        }}
    ),
    1fr
  );
  grid-column-gap: 0.75rem;

  &::-webkit-scrollbar {
    display: none;
  }

  ${forMobileAndAbove} {
    grid-column-gap: 1.25rem;
    grid-template-columns: repeat(
      auto-fill,
      minmax(
        calc(
          ${({ percentageWidth }) => percentageWidth}% -
            ${({ numberCols, numberItems }) => {
              if (numberCols === numberItems) return `${0.625 / numberItems + 0.625}rem`
              if (numberCols > 1) return '0.625rem'
              return '0rem'
            }}
        ),
        1fr
      )
    );
    grid-auto-flow: column;
    grid-auto-columns: minmax(
      calc(
        ${(props) => props.percentageWidth}% -
          ${({ numberCols, numberItems }) => {
            if (numberCols === numberItems) return `${0.625 / numberItems + 0.625}rem`
            if (numberCols > 1) return '0.625rem'
            return '0rem'
          }}
      ),
      1fr
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
  border: 1px solid var(--intent-secondary);
  box-shadow: 0px 2px 9px rgba(20, 164, 224, 0.15);
`

export const CarouselControlsRight = styled(CarouselControls)`
  right: 0;
`

export const CarouselControlsLeft = styled(CarouselControls)`
  left: 0;
`
