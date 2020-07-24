export const HEADER_HEIGHT = 68
export const FEATURED_APP_HEIGHT = 200
export const NORMAL_APP_MIN_HEIGHT = 180
export const MAXIMUM_ITEMS_PER_ROW = 3

export const getNumberOfItems = () => {
  const normalAppContainerHeight = window.innerHeight - HEADER_HEIGHT - FEATURED_APP_HEIGHT
  const numOfRow = Math.ceil(normalAppContainerHeight / NORMAL_APP_MIN_HEIGHT)
  return numOfRow * MAXIMUM_ITEMS_PER_ROW
}
