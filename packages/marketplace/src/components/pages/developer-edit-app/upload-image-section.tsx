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
import { formFields } from './form-schema/form-fields'

const { screen1ImageUrl, screen2ImageUrl, screen3ImageUrl, screen4ImageUrl, screen5ImageUrl, iconImageUrl } = formFields

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
              id={iconImageUrl.name}
              dataTest="submit-app-icon"
              labelText={iconImageUrl.label as string}
              name={iconImageUrl.name}
              allowClear
              required
              aspect={ICON_RATIO}
              resizeDimensions={ICON_DIMENSIONS}
            />
          </div>
        </GridFourColItem>
        <GridFourColItem>
          <div className="control mb-4">
            <label className="label">Feature Image *</label>
            <ImageCropperWithInput
              id={screen1ImageUrl.name}
              dataTest="submit-app-screenshot1"
              labelText={screen1ImageUrl.label as string}
              name={screen1ImageUrl.name}
              allowClear
              required
              aspect={FEATURE_RATIO}
              resizeDimensions={FEATURE_DIMENSIONS}
            />
          </div>
        </GridFourColItem>
        <GridFourColItem>
          <div className="control mb-4">
            <label className="label">Screenshot 1</label>
            <ImageCropperWithInput
              id={screen2ImageUrl.name}
              dataTest="submit-app-screenshot2"
              labelText={screen2ImageUrl.label as string}
              name={screen2ImageUrl.name}
              allowClear
              aspect={SCREENSHOT_RATIO}
              resizeDimensions={SCREENSHOT_DIMENSIONS}
            />
          </div>
        </GridFourColItem>
        <GridFourColItem>
          <div className="control mb-4">
            <label className="label">Screenshot 2</label>
            <ImageCropperWithInput
              id={screen3ImageUrl.name}
              dataTest="submit-app-screenshot3"
              labelText={screen3ImageUrl.label as string}
              name={screen3ImageUrl.name}
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
              id={screen4ImageUrl.name}
              dataTest="submit-app-screenshot4"
              labelText={screen4ImageUrl.label as string}
              name={screen4ImageUrl.name}
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
              id={screen5ImageUrl.name}
              dataTest="submit-app-screenshot5"
              labelText={screen5ImageUrl.label as string}
              name={screen5ImageUrl.name}
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
