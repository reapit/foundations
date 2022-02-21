import { gql, useLazyQuery } from '@apollo/client'

export const useGetAppointmentEtag = () => {
  const getAppointmentEtagQuery = gql`
    query getAppointmentEtag($id: String!) {
      GetAppointmentById(id: $id) {
        _eTag
      }
    }
  `
  const [getAppointmentEtag] = useLazyQuery(getAppointmentEtagQuery)

  return async (id: string) => {
    const { data } = await getAppointmentEtag({ variables: { id } })
    return data.GetAppointmentById._eTag
  }
}
