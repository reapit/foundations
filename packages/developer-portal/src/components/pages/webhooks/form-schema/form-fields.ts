import { FormFieldInfo } from '@reapit/utils'

export type FieldKey =
  | 'webhookUrlField'
  | 'topicIdsField'
  | 'customerIdsField'
  | 'activeField'
  | 'ignoreEtagOnlyChangesField'

export const formFields: Record<FieldKey, FormFieldInfo> = {
  webhookUrlField: {
    name: 'url',
    label: 'Webhook URL',
    placeHolder: 'Enter a secure URL (https://)',
    errorMessage: 'The value must be a valid and secure URI',
  },
  topicIdsField: {
    name: 'topicIds',
    label: 'Subscription Topics',
    placeHolder: 'Please select',
  },
  customerIdsField: {
    name: 'customerIds',
    label: 'Subscription Customers',
    placeHolder: 'All Customers who have installed your application (default)',
  },
  activeField: {
    name: 'active',
    label: 'Active',
  },
  ignoreEtagOnlyChangesField: {
    name: 'ignoreEtagOnlyChanges',
    label: 'Ignore notifications where only the etag has been modified',
  },
}
