import * as React from 'react'
import {
  FormSection,
  FormHeading,
  FormSubHeading,
  GridFourCol,
  GridFourColItem,
  ImageCropperWithInput,
  ResizeDimensions,
} from '@reapit/elements'

export type UploadImageSectionProps = {}

const UPLOAD_IMAGE_DIMENSIONS: Record<string, ResizeDimensions> = {
  icon: {
    width: 96,
    height: 96,
  },
  feature: {
    width: 495,
    height: 222,
  },
  screenshot: {
    width: 598,
    height: 457,
  },
}

const ICON_DIMENSIONS = UPLOAD_IMAGE_DIMENSIONS.icon
const ICON_RATIO = ICON_DIMENSIONS.width / ICON_DIMENSIONS.height

const FEATURE_DIMENSIONS = UPLOAD_IMAGE_DIMENSIONS.feature
const FEATURE_RATIO = FEATURE_DIMENSIONS.width / FEATURE_DIMENSIONS.height

const SCREENSHOT_DIMENSIONS = UPLOAD_IMAGE_DIMENSIONS.screenshot
const SCREENSHOT_RATIO = SCREENSHOT_DIMENSIONS.width / SCREENSHOT_DIMENSIONS.height

const UploadImageSection: React.FC<UploadImageSectionProps> = () => {
  return (
    <FormSection>
      <FormHeading>Images</FormHeading>
      <FormSubHeading>
        The icon field will appear as the main brand representation of your app in marketplace listings and installed
        apps pages. You can also select a minimum of one and up to five screenshots of your application, that will
        appear in a carousel in the details view of your app listing.
      </FormSubHeading>
      <GridFourCol>
        <GridFourColItem>
          <div className="control">
            <label className="label">Icon *</label>
            <ImageCropperWithInput
              id="iconImage"
              dataTest="submit-app-icon"
              labelText="Upload Image"
              name="iconImageUrl"
              allowClear
              required
              aspect={ICON_RATIO}
              resizeDimensions={ICON_DIMENSIONS}
            />
          </div>
        </GridFourColItem>
        <GridFourColItem>
          <div className="control mb-4">
            <label className="label">Screenshot 1 *</label>
            <ImageCropperWithInput
              id="screenshot1"
              dataTest="submit-app-screenshot1"
              labelText="Upload Image"
              name="screen1ImageUrl"
              allowClear
              required
              aspect={FEATURE_RATIO}
              resizeDimensions={FEATURE_DIMENSIONS}
            />
          </div>
        </GridFourColItem>
        <GridFourColItem>
          <div className="control mb-4">
            <label className="label">Screenshot 2</label>
            <ImageCropperWithInput
              id="screenshot2"
              dataTest="submit-app-screenshot2"
              labelText="Upload Image"
              name="screen2ImageUrl"
              allowClear
              aspect={SCREENSHOT_RATIO}
              resizeDimensions={SCREENSHOT_DIMENSIONS}
            />
          </div>
        </GridFourColItem>
        <GridFourColItem>
          <div className="control mb-4">
            <label className="label">Screenshot 3</label>
            <ImageCropperWithInput
              id="screenshot3"
              dataTest="submit-app-screenshot3"
              labelText="Upload Image"
              name="screen3ImageUrl"
              allowClear
              aspect={SCREENSHOT_RATIO}
              resizeDimensions={SCREENSHOT_DIMENSIONS}
            />
          </div>
        </GridFourColItem>
        <GridFourColItem>
          <div className="control mb-4">
            <label className="label">Screenshot 4</label>
            <ImageCropperWithInput
              id="screenshot4"
              dataTest="submit-app-screenshot4"
              labelText="Upload Image"
              name="screen4ImageUrl"
              allowClear
              aspect={SCREENSHOT_RATIO}
              resizeDimensions={SCREENSHOT_DIMENSIONS}
            />
          </div>
        </GridFourColItem>
        <GridFourColItem>
          <div className="control mb-4">
            <label className="label">Screenshot 5</label>
            <ImageCropperWithInput
              id="screenshot5"
              dataTest="submit-app-screenshot5"
              labelText="Upload Image"
              name="screen5ImageUrl"
              allowClear
              aspect={SCREENSHOT_RATIO}
              resizeDimensions={SCREENSHOT_DIMENSIONS}
            />
          </div>
        </GridFourColItem>
      </GridFourCol>
    </FormSection>
  )
}

export default UploadImageSection
