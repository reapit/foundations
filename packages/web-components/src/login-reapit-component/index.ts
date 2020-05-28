import LoginButton from './login-reapit-component.svelte'

export interface LoginInitializers {
  clientId: string
  redirectUri: string
  containerId: string
}

export const LoginReapitComponent = ({ clientId, redirectUri, containerId }: LoginInitializers) =>
  new LoginButton({
    target: document.querySelector(containerId) || document.body,
    props: {
      clientId,
      redirectUri,
    },
  })

Object.defineProperty(window, 'LoginReapitComponent', {
  value: LoginReapitComponent,
})
