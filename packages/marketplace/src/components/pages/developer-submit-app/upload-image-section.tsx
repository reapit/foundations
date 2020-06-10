import * as React from 'react'
import { FormSection, FormHeading, FormSubHeading, GridFourCol, GridFourColItem, ImageInput } from '@reapit/elements'

export type UploadImageSectionProps = {}

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
            <ImageInput
              id="iconImage"
              dataTest="submit-app-icon"
              labelText="Upload Image"
              name="iconImageUrl"
              allowClear
              required
            />
          </div>
        </GridFourColItem>
        <GridFourColItem>
          <div className="control mb-4">
            <label className="label">Screenshot 1 *</label>
            <ImageInput
              id="screenshot1"
              dataTest="submit-app-screenshot1"
              labelText="Upload Image"
              name="screen1ImageUrl"
              allowClear
              required
            />
          </div>
        </GridFourColItem>
        <GridFourColItem>
          <div className="control mb-4">
            <label className="label">Screenshot 2</label>
            <ImageInput
              id="screenshot2"
              dataTest="submit-app-screenshot2"
              labelText="Upload Image"
              name="screen2ImageUrl"
              allowClear
            />
          </div>
        </GridFourColItem>
        <GridFourColItem>
          <div className="control mb-4">
            <label className="label">Screenshot 3</label>
            <ImageInput
              id="screenshot3"
              dataTest="submit-app-screenshot3"
              labelText="Upload Image"
              name="screen3ImageUrl"
              allowClear
            />
          </div>
        </GridFourColItem>
        <GridFourColItem>
          <div className="control mb-4">
            <label className="label">Screenshot 4</label>
            <ImageInput
              id="screenshot4"
              dataTest="submit-app-screenshot4"
              labelText="Upload Image"
              name="screen4ImageUrl"
              allowClear
            />
          </div>
        </GridFourColItem>
        <GridFourColItem>
          <div className="control mb-4">
            <label className="label">Screenshot 5</label>
            <ImageInput
              id="screenshot5"
              dataTest="submit-app-screenshot5"
              labelText="Upload Image"
              name="screen5ImageUrl"
              allowClear
            />
          </div>
        </GridFourColItem>
      </GridFourCol>
    </FormSection>
  )
}

export default UploadImageSection
