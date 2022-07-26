import { styled } from '@linaria/react'

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
  grid-column-gap: 1.25rem;

  &::-webkit-scrollbar {
    display: none;
  }
`

export const CarouselControlsLeft = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 50%;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: var(--color-white);
  border: 1px solid var(--intent-secondary);
  box-shadow: 0px 2px 9px rgba(20, 164, 224, 0.15);
`

export const CarouselControlsRight = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  top: 50%;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  background-color: var(--color-white);
  border: 1px solid var(--intent-secondary);
  box-shadow: 0px 2px 9px rgba(20, 164, 224, 0.15);
`
