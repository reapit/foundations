import { ResizeDimensions } from '@reapit/utils-react'

const UPLOAD_IMAGE_DIMENSIONS: Record<string, ResizeDimensions> = {
  icon: {
    width: 192,
    height: 192,
  },
  feature: {
    width: 990,
    height: 444,
  },
  screenshot: {
    width: 1196,
    height: 914,
  },
}

export const ICON_DIMENSIONS = UPLOAD_IMAGE_DIMENSIONS.icon
export const FEATURE_DIMENSIONS = UPLOAD_IMAGE_DIMENSIONS.feature
export const SCREENSHOT_DIMENSIONS = UPLOAD_IMAGE_DIMENSIONS.screenshot

export const ICON_RATIO = ICON_DIMENSIONS.width / ICON_DIMENSIONS.height
export const FEATURE_RATIO = FEATURE_DIMENSIONS.width / FEATURE_DIMENSIONS.height
export const SCREENSHOT_RATIO = SCREENSHOT_DIMENSIONS.width / SCREENSHOT_DIMENSIONS.height
