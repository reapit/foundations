<script lang="ts">
  import { ReapitConnectBrowserSession } from '@reapit/connect-session'
  import { onMount } from 'svelte'
  import Logout from './logout.svelte'
  import PermissionBlock from './permission.svelte'

  export let reapitConnectBrowserSession: ReapitConnectBrowserSession
  export let connectHasSessionCallback: (session: ReapitConnectBrowserSession) => any
  export let companyName: string

  let hasSession: boolean
  let isFetching: boolean

  $: hasSession = reapitConnectBrowserSession.connectHasSession
  $: isFetching = false

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

</style>

<div class="reapit-connect-component">
  {#if !isFetching}
    {#if hasSession}
      <Logout reapitConnectBrowserSession={reapitConnectBrowserSession} />
    {/if}
    {#if !hasSession}
      <PermissionBlock companyName={companyName} reapitConnectBrowserSession={reapitConnectBrowserSession} />
    {/if}
  {/if}
</div>
