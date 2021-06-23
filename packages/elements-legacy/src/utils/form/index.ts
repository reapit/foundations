import { FieldMetaProps } from 'formik'

export const checkError = (meta: FieldMetaProps<any>): boolean => meta.touched && !!meta.error
