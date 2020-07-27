<script lang="ts">
  import { ReapitConnectBrowserSession } from '@reapit/connect-session'
  import SignInButton from './sign-in-button.svelte'
  import SignOutButton from './sign-out-button.svelte'
  import { onMount } from 'svelte'

  export let reapitConnectBrowserSession: ReapitConnectBrowserSession

  let hasSession: boolean 
  let clickHandler: () => void

  $: hasSession = reapitConnectBrowserSession.connectHasSession


  const handleLoginClick = () => {
    reapitConnectBrowserSession.connectAuthorizeRedirect()
  }

  const handleLogoutClick = () => {
    reapitConnectBrowserSession.connectLogoutRedirect()
  }

  $: clickHandler = hasSession ? handleLogoutClick : handleLoginClick

  onMount(async () => {
    const params = new URLSearchParams(window.location.search)
    const authorizationCode = params.get('code')
    if (authorizationCode) {
      const session = await reapitConnectBrowserSession.connectSession()

      if(session) {
        hasSession = true
      }
    }
  })

</script>

<style>
  .reapit-connect-login-button {
    display: inline-block;
    background-color: #0061a8;
    max-height: 48px;
    max-width: 290px;
  }

  .reapit-connect-login-button:hover {
    background-color: #23a4de;
  }
</style>

<svelte:options accessors={true} />
<div class="reapit-connect-login-button" on:click={clickHandler}>
  {#if hasSession}
    <SignOutButton />
  {/if}
  {#if !hasSession}
    <SignInButton />
  {/if}
</div>
