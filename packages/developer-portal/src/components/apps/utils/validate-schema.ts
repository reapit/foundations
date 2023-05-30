import { Dispatch, SetStateAction } from 'react'
import { AppEditFormSchema } from '../edit/form-schema/form-fields'
import { appEditValidationSchema } from '../edit/form-schema/validation-schema'

export const handleSetIncompletedFields =
  (values: AppEditFormSchema, setIncompleteFields: Dispatch<SetStateAction<(keyof AppEditFormSchema)[]>>) => () => {
    const validate = async () => {
      try {
        await appEditValidationSchema.validate(
          {
            ...values,
            isListed: true,
          },
          { abortEarly: false },
        )
        setIncompleteFields([])
      } catch (err: any) {
        const fields = err?.inner?.reduce(
          (fieldList: (keyof AppEditFormSchema)[], field: { path: keyof AppEditFormSchema }) => {
            if (!fieldList.includes(field.path)) {
              fieldList.push(field.path)
            }

            return fieldList
          },
          [] as (keyof AppEditFormSchema)[],
        )

        setIncompleteFields(fields as (keyof AppEditFormSchema)[])
      }
    }

    validate()
      .catch(error => console.error(error))
  }
