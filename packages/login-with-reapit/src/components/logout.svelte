<script lang="ts">
  import SignOutButton from './sign-out-button.svelte'
  import { ReapitConnectBrowserSession } from '@reapit/connect-session'

  export let reapitConnectBrowserSession: ReapitConnectBrowserSession

  const handleLogoutClick = () => {
    reapitConnectBrowserSession.connectLogoutRedirect()
  }
</script>

<style>
  button {
    display: inline-block;
    background-color: #0061a8;
    max-height: 48px;
    max-width: 290px;
    cursor: pointer;
    border: 0;
    padding: 0;
  }
  button:hover {
    background-color: #23a4de;
  }
</style>

<button on:click={handleLogoutClick}><SignOutButton /></button>
