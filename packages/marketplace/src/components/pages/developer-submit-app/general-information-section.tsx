import * as React from 'react'
import {
  FormSection,
  Helper,
  FormHeading,
  FormSubHeading,
  Grid,
  GridItem,
  Input,
  SelectBox,
  TextArea,
  TextAreaEditor,
  SelectBoxOptions,
} from '@reapit/elements'
import { exec } from 'pell'
import linkStyles from '@/styles/elements/link.scss?mod'
import { useSelector } from 'react-redux'
import { selectCategories } from '@/selector/app-categories'
import { CategoryModel } from '@reapit/foundations-ts-definitions'
import styles from '@/styles/pages/developer-submit-app.scss?mod'

export type GeneralInformationSectionProps = {}

export const prepareCategoryOptions = (categories: CategoryModel[]) => {
  return categories.map(category => ({
    value: category.id as string,
    label: category.name as string,
  }))
}

const GeneralInformationSection: React.FC<GeneralInformationSectionProps> = () => {
  const categories = useSelector(selectCategories)

  const categoryOptions: SelectBoxOptions[] = prepareCategoryOptions(categories)

  return (
    <FormSection data-test="submit-app-form">
      <Helper>
        For more information on how to complete this form, please view our &quot;Step-by-step&quot; guide&nbsp;
        <a
          className={linkStyles.link}
          href="https://foundations-documentation.reapit.cloud/developer-portal"
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
      </Helper>
      <FormHeading>App Listing</FormHeading>
      <FormSubHeading>
        The section below relates to the fields that comprise the listing of your application as it will appear to a
        user in the Marketplace. It also includes details we will use to enable us to contact you about your submitted
        application, how best to make your app discoverable to users and to determine where to launch it from the
        marketplace.
      </FormSubHeading>
      <Grid isMultiLine>
        <GridItem>
          <Input
            dataTest="submit-app-name"
            type="text"
            labelText="Name"
            id="name"
            name="name"
            placeholder="The name of your app as it will appear to users"
            required
          />
        </GridItem>
        <GridItem>
          <SelectBox id="categoryId" name="categoryId" options={categoryOptions} labelText="Category" />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem>
          <Input
            dataTest="submit-app-support-email"
            type="email"
            labelText="Support email"
            id="supportEmail"
            name="supportEmail"
            placeholder="The contact to your support team if your users have a problem"
          />
        </GridItem>
        <GridItem>
          <Input
            dataTest="submit-app-phone"
            type="tel"
            labelText="Telephone"
            id="phone"
            name="telephone"
            placeholder="Should one of our developers need to contact you about your app"
          />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem>
          <Input
            dataTest="submit-app-home-page"
            type="text"
            labelText="Home page"
            id="homePage"
            name="homePage"
            placeholder="Your company homepage. HTTP:// or HTTPS://"
          />
        </GridItem>
        <GridItem>
          <Input
            dataTest="submit-app-launch-uri"
            type="text"
            labelText="Launch URI"
            id="launch Url"
            name="launchUri"
            placeholder="The launch page for your app. HTTPS only other than for http://localhost"
          />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem>
          <TextArea
            id="summary"
            dataTest="submit-app-summary"
            labelText="Summary"
            name="summary"
            placeholder={'A short strapline summary for your app listing. Must be between 50 and 150 characters'}
          />
        </GridItem>
        <GridItem className={styles.descriptionColumn}>
          <TextAreaEditor
            id="description"
            actions={[
              'bold',
              'italic',
              'paragraph',
              'olist',
              'ulist',
              'link',
              {
                name: 'test',
                icon: '<b>H<sub>5</sub></b>',
                title: 'Add heading 5',
                result: () => exec('formatBlock', '<h5>'),
              },
            ]}
            dataTest="submit-app-description"
            labelText="Description"
            name="description"
            placeholder={
              // eslint-disable-next-line max-len
              'A detailed description for your app listing. Must be between 150 and 1000 characters. Please note: As this field supports HTML, special characters will be included in the character count'
            }
          />
        </GridItem>
      </Grid>
    </FormSection>
  )
}

export default GeneralInformationSection
