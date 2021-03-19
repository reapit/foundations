import * as React from 'react'
import {
  FormSection,
  FormHeading,
  FormSubHeading,
  GridFourCol,
  GridFourColItem,
  Checkbox,
  FormikErrors,
} from '@reapit/elements'
import { ScopeModel, CreateAppModel } from '@reapit/foundations-ts-definitions'
import { formFields } from './form-schema/form-fields'

export type PermissionSectionProps = {
  scopes: ScopeModel[]
  errors: FormikErrors<CreateAppModel>
  isListed: boolean
}

export const renderScopesCheckbox = (scopes: ScopeModel[] = [], isListed: boolean, errorScope?: string) => (
  <>
    {scopes.map((item: ScopeModel) => {
      // TODO - short term hack to remove temporary scopes from API response
      if (
        item.name !== 'Marketplace/developers.read' &&
        item.name !== 'Marketplace/developers.write' &&
        item.name !== 'TestResourceServer/test.scope'
      ) {
        return (
          <GridFourColItem key={item.name}>
            <Checkbox
              name={formFields.scopes.name}
              labelText={item.description || ''}
              id={item.name || ''}
              value={item.name}
              disabled={isListed}
            />
          </GridFourColItem>
        )
      }
    })}
    {errorScope && (
      <div className="has-text-danger has-text-right w-100" data-test="input-error">
        {errorScope}
      </div>
    )}
  </>
)

const PermissionSection: React.FC<PermissionSectionProps> = ({ scopes, errors, isListed }) => {
  return (
    <FormSection>
      <FormHeading>Permissions *</FormHeading>
      <FormSubHeading>
        To access a client&apos;s data, you will need to specify the entities you need access to on a read or write
        basis. You should be familiar with these entities from the sandbox. When the user installs your application,
        they will have to consent to your usage based on these permissions. If you do not have the correct permissions
        on an entity basis, your app will receive a 403 error.
      </FormSubHeading>
      <GridFourCol>{renderScopesCheckbox(scopes, isListed, errors.scopes)}</GridFourCol>
    </FormSection>
  )
}

export default PermissionSection
