import { styled } from '@linaria/react'

export interface CarouselGridProps {
  percentageWidth: string
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
  grid-template-columns: repeat(auto-fill, minmax(calc(${(props) => props.percentageWidth}% - 0.625rem), 1fr));
  grid-auto-flow: column;
  grid-auto-columns: minmax(calc(${(props) => props.percentageWidth}% - 0.625rem), 1fr);
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
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: var(--intent-primary);
`

export const CarouselControlsRight = styled.a`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 0;
  top: 50%;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  background-color: var(--intent-primary);
`
