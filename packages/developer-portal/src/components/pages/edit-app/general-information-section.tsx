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
  Checkbox,
} from '@reapit/elements'
import { exec } from 'pell'
import { link } from '@/styles/elements/link'
import { useSelector } from 'react-redux'
import { selectCategories } from '@/selector/app-categories'
import { CategoryModel } from '@reapit/foundations-ts-definitions'
import { formFields } from './form-schema/form-fields'
import { checkbox, editor } from './__styles__/styles'

const { name, categoryId, supportEmail, telephone, homePage, launchUri, summary, description } = formFields

export type GeneralInformationSectionProps = {
  isListed: boolean
}

export const prepareCategoryOptions = (categories: CategoryModel[]) => {
  return categories.map(category => ({
    value: category.id as string,
    label: category.name as string,
  }))
}

const GeneralInformationSection: React.FC<GeneralInformationSectionProps> = ({ isListed }) => {
  const categories = useSelector(selectCategories)

  const categoryOptions: SelectBoxOptions[] = prepareCategoryOptions(categories)

  return (
    <FormSection data-test="submit-app-form">
      <Helper>
        For more information on how to complete this form, please view our &quot;Step-by-step&quot; guide&nbsp;
        <a
          className={link}
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
        marketplace. When you have done your initial app submit, please return here to set the &ldquo;is Listed&rdquo;
        status to make the app installable for users.
      </FormSubHeading>
      <Grid isMultiLine>
        <GridItem>
          <Input
            dataTest="submit-app-name"
            type="text"
            labelText={name.label as string}
            id={name.name}
            name={name.name}
            placeholder={name.placeHolder}
            required
          />
        </GridItem>
        <GridItem>
          <div className="control">
            <div className={checkbox}>
              <Checkbox
                name={formFields.isListed.name}
                labelText={formFields.isListed.label as string}
                id={formFields.isListed.name}
              />
            </div>
          </div>
        </GridItem>
      </Grid>
      <Grid>
        <GridItem>
          <SelectBox
            id={categoryId.name}
            name={categoryId.name}
            options={categoryOptions}
            labelText={categoryId.label as string}
          />
        </GridItem>
        <GridItem>
          <Input
            dataTest="submit-app-home-page"
            type="text"
            labelText={homePage.label as string}
            id={homePage.name}
            name={homePage.name}
            placeholder={homePage.placeHolder}
            required={isListed}
          />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem>
          <Input
            dataTest="submit-app-support-email"
            type="email"
            labelText={supportEmail.label as string}
            id={supportEmail.name}
            name={supportEmail.name}
            placeholder={supportEmail.placeHolder}
            required={isListed}
          />
        </GridItem>
        <GridItem>
          <Input
            dataTest="submit-app-launch-uri"
            type="text"
            labelText={launchUri.label as string}
            id={launchUri.name}
            name={launchUri.name}
            placeholder={launchUri.placeHolder}
            required={isListed}
          />
        </GridItem>
      </Grid>
      <Grid>
        <GridItem>
          <div className="pb-4">
            <Input
              dataTest="submit-app-phone"
              type="tel"
              labelText={telephone.label as string}
              id={telephone.name}
              name={telephone.name}
              placeholder={telephone.placeHolder}
              required={isListed}
            />
          </div>
          <TextArea
            id="summary"
            dataTest="submit-app-summary"
            labelText={summary.label as string}
            name={summary.name}
            placeholder={summary.placeHolder}
            required={isListed}
          />
        </GridItem>
        <GridItem className="is-half-desktop">
          <TextAreaEditor
            id="description"
            containerClass={editor}
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
            labelText={description.label as string}
            name={description.name}
            placeholder={description.placeHolder}
            required={isListed}
          />
        </GridItem>
      </Grid>
      {/* <Grid>
        <GridItem className="is-half-desktop"></GridItem>
      </Grid> */}
    </FormSection>
  )
}

export default GeneralInformationSection
