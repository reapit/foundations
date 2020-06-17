import React from 'react'
import {
  H3,
  FlexContainerResponsive,
  Content,
  FlexContainerBasic,
  GridItem,
  Grid,
  Button,
  Formik,
  Input,
  H4,
  ImageInput,
  TextArea,
  SelectBox,
  Form,
} from '@reapit/elements'
import styles from '@/styles/pages/developer-settings-organisation-tab.scss?mod'
import { validateEmail } from '@reapit/elements'

export const validate = values => {
  const errors = validateEmail({
    values,
    currentErrors: {},
    keys: ['officeEmail'],
  })

  return errors
}

export const CompanyInformation = () => {
  return (
    <FlexContainerBasic flexColumn hasPadding>
      <Content>
        <FlexContainerResponsive flexColumn hasBackground hasPadding>
          <H3>Company Information</H3>
          <Formik initialValues={{}} validate={validate} onSubmit={() => {}}>
            {() => (
              <Form>
                <Grid>
                  <GridItem>
                    <Input type="text" labelText="Company Name" id="companyName" name="companyName" />
                  </GridItem>
                  <GridItem>
                    <Input type="text" labelText="Telephone" id="tel" name="tel" />
                  </GridItem>
                </Grid>
                <Grid>
                  <GridItem className={styles.addressColumn}>
                    <H4>Address</H4>
                  </GridItem>
                  <GridItem>
                    <Input type="text" labelText="Website" id="website" name="website" />
                  </GridItem>
                </Grid>

                <Grid>
                  <GridItem>
                    <Input type="text" labelText="Building Name" id="buildingName" name="buildingName" />
                  </GridItem>
                  <GridItem>
                    <Input type="text" labelText="Office Email" id="officeEmail" name="officeEmail" />
                  </GridItem>
                </Grid>

                <Grid>
                  <GridItem>
                    <Input type="text" labelText="Building No." id="name" name="name" />
                  </GridItem>
                  <GridItem>
                    <Input type="text" labelText="VAT" id="name" name="name" />
                  </GridItem>
                </Grid>

                <Grid>
                  <GridItem>
                    <Input type="text" labelText="Line 1*" id="line1" name="line1" />
                  </GridItem>
                  <GridItem>
                    <Input type="text" labelText="REG" id="reg" name="reg" />
                  </GridItem>
                </Grid>

                <Grid>
                  <GridItem>
                    <Input type="text" labelText="Line 2" id="line2" name="line2" />
                  </GridItem>
                  <GridItem>
                    <div className="control">
                      <label className="label">Logo</label>
                      <ImageInput id="iconImage" labelText="Upload Logo" name="iconImageUrl" allowClear />
                    </div>
                  </GridItem>
                </Grid>

                <Grid>
                  <GridItem>
                    <GridItem>
                      <Input type="text" labelText="Line 3" id="line3" name="line3" />
                    </GridItem>
                    <GridItem>
                      <Input type="text" labelText="Line 4" id="line4" name="line4" />
                    </GridItem>
                    <GridItem>
                      <Input type="text" labelText="Postcode" id="postCode" name="postCode" />
                    </GridItem>
                  </GridItem>
                  <GridItem>
                    <TextArea className={styles.aboutField} id="about" labelText="About" name="about" />
                  </GridItem>
                </Grid>

                <Grid>
                  <GridItem>
                    <SelectBox id="countryId" name="countryId" options={[]} labelText="Country" />
                  </GridItem>
                  <GridItem>
                    <Button className={styles.buttonSave} type="submit" variant="primary" onClick={() => {}}>
                      Save
                    </Button>
                  </GridItem>
                </Grid>
              </Form>
            )}
          </Formik>
        </FlexContainerResponsive>
      </Content>
    </FlexContainerBasic>
  )
}
