<script lang="ts">
  import { ReapitConnectBrowserSession } from '@reapit/connect-session'
  import SignInButton from './sign-in-button.svelte'
  import SignOutButton from './sign-out-button.svelte'
  import { onMount } from 'svelte'

  export let reapitConnectBrowserSession: ReapitConnectBrowserSession
  export let connectHasSessionCallback: (session: ReapitConnectBrowserSession) => any

  let hasSession: boolean
  let isFetching: boolean
  let clickHandler: () => void

  $: hasSession = reapitConnectBrowserSession.connectHasSession
  $: isFetching = false

  const handleLoginClick = () => {
    reapitConnectBrowserSession.connectAuthorizeRedirect()
  }

  const handleLogoutClick = () => {
    reapitConnectBrowserSession.connectLogoutRedirect()
  }

  $: clickHandler = hasSession ? handleLogoutClick : handleLoginClick

  $: if (hasSession) {
    connectHasSessionCallback(reapitConnectBrowserSession)
  }

  onMount(async () => {
    const params = new URLSearchParams(window.location.search)
    const authorizationCode = params.get('code')
    if (authorizationCode) {
      isFetching = true

      const session = await reapitConnectBrowserSession.connectSession()

      isFetching = false

      if (session) {
        hasSession = true
      }
    }
  })
</script>

<style>
  .reapit-connect-component {
    display: inline-block;
    background-color: #0061a8;
    max-height: 48px;
    max-width: 290px;
  }

  .reapit-connect-component:hover {
    background-color: #23a4de;
  }
</style>

<svelte:options accessors={true} />
<div class="reapit-connect-component" on:click={clickHandler}>
  {#if !isFetching}
    {#if hasSession}
      <SignOutButton />
    {/if}
    {#if !hasSession}
      <SignInButton />
    {/if}
  {/if}
</div>
