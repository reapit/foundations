import LoginButton from './login-with-reapit.svelte'

export interface LoginInitializers {
  clientId: string
  redirectUri: string
  containerId: string
}

export const LoginWithReapitComponent = ({ clientId, redirectUri, containerId }: LoginInitializers) =>
  new LoginButton({
    target: document.querySelector(containerId) || document.body,
    props: {
      clientId,
      redirectUri,
    },
  })

Object.defineProperty(window, 'LoginWithReapitComponent', {
  value: LoginWithReapitComponent,
})
