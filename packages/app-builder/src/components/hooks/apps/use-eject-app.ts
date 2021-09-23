import { gql, useMutation } from '@apollo/client'

const EjectAppMutation = gql`
  mutation EjectApp($id: ID!) {
    _ejectApp(id: $id)
  }
`

const downloadBase64File = (contentBase64, fileName) => {
  const linkSource = `data:application/zip;base64,${contentBase64}`
  const downloadLink = document.createElement('a')
  document.body.appendChild(downloadLink)

  downloadLink.href = linkSource
  downloadLink.target = '_self'
  downloadLink.download = fileName
  downloadLink.click()
}

export const useEjectApp = () => {
  const [ejectAppMutation, { loading }] = useMutation(EjectAppMutation)

  const ejectApp = async (appId: string, appName: string) => {
    const { data } = await ejectAppMutation({ variables: { id: appId } })
    if (data._ejectApp) {
      downloadBase64File(data._ejectApp, `${appName}.zip`)
    }
  }

  return {
    loading,
    ejectApp,
  }
}
