import { useQuery, useMutation } from '@apollo/react-hooks'
import { CreateOfficeModel } from '@reapit/foundations-ts-definitions'
import CREATE_OFFICE from '../components/ui/offices-tab/gql/create-office.graphql'
import GET_OFFICES from '../components/ui/offices-tab/gql/get-offices.graphql'

const prepareCreateOfficeParams = (data: any): CreateOfficeModel => {
  const name = data[0].value as string
  const buildingName = data[1].value as string
  const buildingNumber = data[2].value as string
  const line1 = data[3].value as string
  const line2 = data[4].value as string
  const line3 = data[5].value as string
  const line4 = data[6].value as string
  const postcode = data[7].value as string
  const workPhone = data[8].value as string
  const email = data[9].value as string

  return {
    name,
    address: {
      buildingName,
      buildingNumber,
      line1,
      line2,
      line3,
      line4,
      postcode,
    },
    workPhone,
    email,
  }
}
export const createOfficeAsync = (filedata: any) => {
  console.log('filedata', filedata)
  const createOfficeParams = prepareCreateOfficeParams(filedata)
  console.log('createOfficeParams', createOfficeParams)
  const [createOffice] = useMutation<CreateOfficeModel, CreateOfficeModel>(CREATE_OFFICE)

  const { loading, error, data } = useQuery(GET_OFFICES, {
    variables: { pageSize: 10, pageNumber: 1 },
  })

  console.log('data query', data)

  // createOffice({
  //   variables: createOfficeParams,
  // })

}