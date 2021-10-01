<script lang="ts">
  import SignInButton from './sign-in-button.svelte'
  import CloseIcon from './close-icon.svelte'
import { ReapitConnectBrowserSession } from '@reapit/connect-session';
  
  let showPermissionBlock: boolean = false
  export let reapitConnectBrowserSession: ReapitConnectBrowserSession

  $: handler = () => showPermissionBlock = !showPermissionBlock
  $: agreeHandler = () => reapitConnectBrowserSession.connectAuthorizeRedirect()
</script>

<style>
  .reapit-connect-permission-container {
    max-width: 290px;
    margin-top: 1rem;
    margin-bottom: 1rem;
    font-family: 'PT Sans',Helvetica,Arial,sans-serif;
  }

  .reapit-connect-permission-container .permission-info {
    display: none;
    border: 1px solid lightgrey;
    border-radius: 1rem 1rem 0rem 0rem;
  }

  .reapit-connect-permission-container.is-active .permission-info {
    display: block;
    max-width: 290px;
    padding: .5rem;
  }

  .reapit-connect-permission-container .permission-info .header {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .reapit-connect-permission-container .permission-info hr {
    border: 0;
    border-top: 1px solid lightgray;
    margin-top: .1rem;
  }

  .reapit-connect-permission-container .title {
    margin: 0;
    padding: .5rem;
    width: 100%;
    font-size: 1.2rem;
    text-align: center;
  }

  .reapit-connect-permission-container .permission-content {
    padding-left: 1rem;
    padding-right: 1rem;
    font-size: 1rem;
    line-height: 1.25rem;
  }

  .reapit-connect-permission-container .permission-content ul {
    list-style-type: none;
    padding-left: .75rem;
  }

  .reapit-connect-permission-container .permission-content ul li {
    margin-top: .5rem;
  }

  .reapit-connect-permission-container .permission-content ul li:before {
    content: '';
    padding: 0px 0 3px 24px;
    background-repeat: no-repeat;
    color: rgb(35, 164, 222);
  }

  .reapit-connect-permission-container .permission-content ul li:nth-child(1):before {
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMWVtIiBoZWlnaHQ9IjFlbSIgdmlld0JveD0iMCAwIDIwIDIwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0yLjkyODkxIDEyLjkyODlDNC4wMTgwOSAxMS44Mzk4IDUuMzE0NDkgMTEuMDMzNSA2LjcyODk0IDEwLjU0NTRDNS4yMTQwMiA5LjUwMTk5IDQuMjE4NzUgNy43NTU3OCA0LjIxODc1IDUuNzgxMjVDNC4yMTg3NSAyLjU5MzQ4IDYuODEyMjMgMCAxMCAwQzEzLjE4NzggMCAxNS43ODEyIDIuNTkzNDggMTUuNzgxMiA1Ljc4MTI1QzE1Ljc4MTIgNy43NTU3OCAxNC43ODYgOS41MDE5OSAxMy4yNzEgMTAuNTQ1NEMxNC42ODU1IDExLjAzMzUgMTUuOTgxOSAxMS44Mzk4IDE3LjA3MTEgMTIuOTI4OUMxOC45NTk4IDE0LjgxNzcgMjAgMTcuMzI4OSAyMCAyMEgxOC40Mzc1QzE4LjQzNzUgMTUuMzQ3NSAxNC42NTI1IDExLjU2MjUgMTAgMTEuNTYyNUM1LjM0NzU0IDExLjU2MjUgMS41NjI1IDE1LjM0NzUgMS41NjI1IDIwSDBDMCAxNy4zMjg5IDEuMDQwMiAxNC44MTc3IDIuOTI4OTEgMTIuOTI4OVpNMTAgMTBDMTIuMzI2MiAxMCAxNC4yMTg4IDguMTA3NSAxNC4yMTg4IDUuNzgxMjVDMTQuMjE4OCAzLjQ1NSAxMi4zMjYyIDEuNTYyNSAxMCAxLjU2MjVDNy42NzM3OSAxLjU2MjUgNS43ODEyNSAzLjQ1NSA1Ljc4MTI1IDUuNzgxMjVDNS43ODEyNSA4LjEwNzUgNy42NzM3OSAxMCAxMCAxMFoiIGZpbGw9IiMyM2EzZGUiPjwvcGF0aD48L3N2Zz4=');
  }

  .reapit-connect-permission-container .permission-content ul li:nth-child(2):before {
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMWVtIiBoZWlnaHQ9IjFlbSIgdmlld0JveD0iMCAwIDIwIDIwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnPjxwYXRoIGQ9Ik0xOC4xMjUgMi41SDEuODc1MDFDMC44NDEwNjcgMi41IDAgMy4zNDEwNyAwIDQuMzc1MDFWMTUuNjI1QzAgMTYuNjU5IDAuODQxMDY3IDE3LjUgMS44NzUwMSAxNy41SDE4LjEyNUMxOS4xNTg5IDE3LjUgMjAgMTYuNjU5IDIwIDE1LjYyNVY0LjM3NTAxQzIwIDMuMzQxMDcgMTkuMTU4OSAyLjUgMTguMTI1IDIuNVpNMTguMTI1IDMuNzQ5OTlDMTguMjA5OSAzLjc0OTk5IDE4LjI5MDcgMy43Njc2MSAxOC4zNjQ1IDMuNzk4MzhMMTAgMTEuMDQ4TDEuNjM1NDIgMy43OTgzOEMxLjcwOTI3IDMuNzY3NjUgMS43OTAwNSAzLjc0OTk5IDEuODc0OTcgMy43NDk5OUgxOC4xMjVaTTE4LjEyNSAxNi4yNUgxLjg3NTAxQzEuNTMwMTcgMTYuMjUgMS4yNDk5OSAxNS45Njk4IDEuMjQ5OTkgMTUuNjI1VjUuMTE5MDFMOS41OTA0NSAxMi4zNDc0QzkuNzA4MjYgMTIuNDQ5MyA5Ljg1NDEzIDEyLjUgMTAgMTIuNUMxMC4xNDU5IDEyLjUgMTAuMjkxNyAxMi40NDk0IDEwLjQwOTYgMTIuMzQ3NEwxOC43NSA1LjExOTAxVjE1LjYyNUMxOC43NSAxNS45Njk4IDE4LjQ2OTggMTYuMjUgMTguMTI1IDE2LjI1WiIgZmlsbD0iIzIzYTNkZSI+PC9wYXRoPjwvZz48ZGVmcz48Y2xpcFBhdGggaWQ9ImNsaXAwIj48cmVjdCB3aWR0aD0iMWVtIiBoZWlnaHQ9IjFlbSIgZmlsbD0id2hpdGUiPjwvcmVjdD48L2NsaXBQYXRoPjwvZGVmcz48L3N2Zz4=');
  }

  .reapit-connect-permission-container .permission-content ul li:nth-child(3):before {
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMWVtIiBoZWlnaHQ9IjFlbSIgdmlld0JveD0iMCAwIDIwIDIwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxnPjxwYXRoIGQ9Ik0xOS4xMjc2IDE5LjIxODdWNy40MTk3OEMxOS4xMjc2IDcuMjA0MDQgMTguOTExMSA3LjAyOTE2IDE4LjY0NDEgNy4wMjkxNkgxNS40OTM4VjMuMDU1MzNDMTUuNDkzOCAyLjgzOTU4IDE1LjI3NzMgMi42NjQ3IDE1LjAxMDMgMi42NjQ3SDEzLjk4VjEuMjYwMTNDMTMuOTggMS4wNDQzOSAxMy43NjM2IDAuODY5NTA3IDEzLjQ5NjUgMC44Njk1MDdINS44OTY5N0M1LjYyOTkxIDAuODY5NTA3IDUuNDEzNDQgMS4wNDQzOSA1LjQxMzQ0IDEuMjYwMTNWMi42NjQ3SDQuMzgzMjdDNC4xMTYyMiAyLjY2NDcgMy44OTk3NCAyLjgzOTU4IDMuODk5NzQgMy4wNTUzM1Y5LjcwMzc3SDEuMjQ2NzFDMC45Nzk2NTcgOS43MDM3NyAwLjc2MzE4MSA5Ljg3ODY1IDAuNzYzMTgxIDEwLjA5NDRWMTkuMjE4N0MwLjc2MzUyNiAxOS40MTU1IDAuNzYyODk2IDE5LjY5MTMgMC43NjMyMTcgMTkuOTk5OUgxOS4xMjc2QzE5LjEyNzYgMTkuNzM4NCAxOS4xMjc2IDE5LjU2NTIgMTkuMTI3NiAxOS4yMTg3Wk02LjM4MDUgMS42NTA3NkgxMy4wMTI5VjIuNjY0N0g2LjM4MDVWMS42NTA3NlpNMS43MzAyNCAxMC40ODVIMy44OTk3NFYxOS4yMTg3SDEuNzMwMjRWMTAuNDg1Wk00Ljg2NjggMy40NDU5NUgxNC41MjY3VjE5LjIxODdIMTIuMTE5N1YxNi42NDE0QzEyLjExOTcgMTYuNDI1NyAxMS45MDMyIDE2LjI1MDggMTEuNjM2MiAxNi4yNTA4SDcuNzU3M0M3LjQ5MDI1IDE2LjI1MDggNy4yNzM3NyAxNi40MjU3IDcuMjczNzcgMTYuNjQxNFYxOS4yMTg3SDQuODY2OFYzLjQ0NTk1Wk04LjI0MDg4IDE5LjIxODdWMTcuMDMyMUgxMS4xNTI3VjE5LjIxODdIOC4yNDA4OFpNMTUuNDkzOCAxOS4yMTg3VjcuODEwNDFIMTguMTYwNlYxOS4yMTg3SDE1LjQ5MzhaIiBmaWxsPSIjMjNhM2RlIj48L3BhdGg+PHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0wLjc2Mjk4NCAxOS4yMTg4VjEwLjA5NDVDMC43NjI5ODQgOS44Nzg3NCAwLjk3OTQ2IDkuNzAzODUgMS4yNDY1MSA5LjcwMzg1SDMuODk5NTVWMy4wNTU0MUMzLjg5OTU1IDIuODM5NjcgNC4xMTYwMiAyLjY2NDc5IDQuMzgzMDggMi42NjQ3OUg1LjQxMzI0VjEuMjYwMjJDNS40MTMyNCAxLjA0NDQ3IDUuNjI5NzEgMC44Njk1OTIgNS44OTY3NyAwLjg2OTU5MkgxMy40OTYzQzEzLjc2MzQgMC44Njk1OTIgMTMuOTc5OCAxLjA0NDQ3IDEzLjk3OTggMS4yNjAyMlYyLjY2NDc5SDE1LjAxMDFDMTUuMjc3MSAyLjY2NDc5IDE1LjQ5MzYgMi44Mzk2NyAxNS40OTM2IDMuMDU1NDFWNy4wMjkyNEgxOC42NDM5QzE4LjkxMDkgNy4wMjkyNCAxOS4xMjc0IDcuMjA0MTMgMTkuMTI3NCA3LjQxOTg3VjIwSDAuNzYzMDJDMC43NjI4NTYgMTkuODQyNSAwLjc2Mjk0IDE5LjY5MzUgMC43NjMwMTUgMTkuNTU5MkMwLjc2MzA4OCAxOS40MzA0IDAuNzYzMTUzIDE5LjMxNTEgMC43NjI5ODQgMTkuMjE4OFpNMTUuNjg0MSA2Ljg1NTMzSDE4LjY0MzlDMTguOTkzNiA2Ljg1NTMzIDE5LjMxNzkgNy4wODg2OCAxOS4zMTc5IDcuNDE5ODdWMjAuMTczOUgwLjU3MjcyNUwwLjU3MjU0NCAyMC4wMDAyQzAuNTcyMzc5IDE5Ljg0MTggMC41NzI0NjMgMTkuNjkzIDAuNTcyNTM5IDE5LjU1ODlDMC41NzI2MTIgMTkuNDMwNSAwLjU3MjY3NyAxOS4zMTU3IDAuNTcyNTA4IDE5LjIxOTFMMC41NzI1MDggMTAuMDk0NUMwLjU3MjUwOCA5Ljc2MzI5IDAuODk2ODQzIDkuNTI5OTQgMS4yNDY1MSA5LjUyOTk0SDMuNzA5MDdWMy4wNTU0MUMzLjcwOTA3IDIuNzI0MjMgNC4wMzM0MSAyLjQ5MDg3IDQuMzgzMDggMi40OTA4N0g1LjIyMjc2VjEuMjYwMjJDNS4yMjI3NiAwLjkyOTAzIDUuNTQ3MSAwLjY5NTY3OSA1Ljg5Njc3IDAuNjk1Njc5SDEzLjQ5NjNDMTMuODQ2IDAuNjk1Njc5IDE0LjE3MDMgMC45MjkwMyAxNC4xNzAzIDEuMjYwMjJWMi40OTA4N0gxNS4wMTAxQzE1LjM1OTcgMi40OTA4NyAxNS42ODQxIDIuNzI0MjIgMTUuNjg0MSAzLjA1NTQxVjYuODU1MzNaTTEyLjgyMjMgMS44MjQ3NUg2LjU3MDc3VjIuNDkwODdIMTIuODIyM1YxLjgyNDc1Wk0zLjcwOTA3IDEwLjY1OUgxLjkyMDUyVjE5LjA0NDlIMy43MDkwN1YxMC42NTlaTTE0LjMzNjEgMy42MTk5NUg1LjA1NzA4VjE5LjA0NDlINy4wODMxVjE2LjY0MTVDNy4wODMxIDE2LjMxMDMgNy40MDc0MyAxNi4wNzcgNy43NTcxIDE2LjA3N0gxMS42MzZDMTEuOTg1NyAxNi4wNzcgMTIuMzEgMTYuMzEwMyAxMi4zMSAxNi42NDE1VjE5LjA0NDlIMTQuMzM2MVYzLjYxOTk1Wk04LjQzMTE2IDE3LjIwNlYxOS4wNDQ5SDEwLjk2MlYxNy4yMDZIOC40MzExNlpNMTUuNjg0MSA3Ljk4NDQxVjE5LjA0NDlIMTcuOTY5OVY3Ljk4NDQxSDE1LjY4NDFaTTYuMzgwMyAxLjY1MDg0VjIuNjY0NzlIMTMuMDEyN1YxLjY1MDg0SDYuMzgwM1pNMS43MzAwNCAxMC40ODUxVjE5LjIxODhIMy44OTk1NVYxMC40ODUxSDEuNzMwMDRaTTQuODY2NjEgMy40NDYwNFYxOS4yMTg4SDcuMjczNTdWMTYuNjQxNUM3LjI3MzU3IDE2LjQyNTggNy40OTAwNSAxNi4yNTA5IDcuNzU3MSAxNi4yNTA5SDExLjYzNkMxMS45MDMgMTYuMjUwOSAxMi4xMTk1IDE2LjQyNTggMTIuMTE5NSAxNi42NDE1VjE5LjIxODhIMTQuNTI2NVYzLjQ0NjA0SDQuODY2NjFaTTguMjQwNjggMTkuMjE4OEgxMS4xNTI1VjE3LjAzMjFIOC4yNDA2OFYxOS4yMTg4Wk0xNS40OTM2IDE5LjIxODhIMTguMTYwNFY3LjgxMDQ5SDE1LjQ5MzZWMTkuMjE4OFoiIGZpbGw9IiMyM2EzZGUiPjwvcGF0aD48L2c+PGRlZnM+PGNsaXBQYXRoIGlkPSJjbGlwMCI+PHJlY3Qgd2lkdGg9IjFlbSIgaGVpZ2h0PSIxZW0iIGZpbGw9IndoaXRlIj48L3JlY3Q+PC9jbGlwUGF0aD48L2RlZnM+PC9zdmc+');
  }

  .reapit-connect-permission-container .permission-content ul li:nth-child(4):before {
    background-image: url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMWVtIiBoZWlnaHQ9IjFlbSIgdmlld0JveD0iMCAwIDIwIDIwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2RkIiBkPSJNMS41NzI0NCAxNi40NDE3SDEyLjQ2NjdDMTIuNzY2MiAxNy4zNDY0IDEzLjYwNzYgMTggMTQuNTk2OSAxOEMxNS41ODYxIDE4IDE2LjQyNzUgMTcuMzQ2NCAxNi43MjcgMTYuNDQxN0gxOC40Mjc2QzE4LjgyMjYgMTYuNDQxNyAxOS4xNDI4IDE2LjExNiAxOS4xNDI4IDE1LjcxNDNDMTkuMTQyOCAxNS4zMTI2IDE4LjgyMjYgMTQuOTg2OSAxOC40Mjc2IDE0Ljk4NjlIMTYuNzI3QzE2LjQyNzUgMTQuMDgyMiAxNS41ODYxIDEzLjQyODYgMTQuNTk2OCAxMy40Mjg2QzEzLjYwNzUgMTMuNDI4NiAxMi43NjYxIDE0LjA4MjIgMTIuNDY2NiAxNC45ODY5SDEuNTcyNEMxLjE3NzM3IDE0Ljk4NjkgMC44NTcxMTcgMTUuMzEyNiAwLjg1NzExNyAxNS43MTQzQzAuODU3MTE3IDE2LjExNiAxLjE3NzM3IDE2LjQ0MTcgMS41NzI0NCAxNi40NDE3Wk0xNC41OTY5IDE0Ljg4MzRDMTUuMDQ3MyAxNC44ODM0IDE1LjQxMzggMTUuMjU2MiAxNS40MTM4IDE1LjcxNDNDMTUuNDEzOCAxNi4xNzI0IDE1LjA0NzMgMTYuNTQ1MiAxNC41OTY5IDE2LjU0NTJDMTQuMTQ2NCAxNi41NDUyIDEzLjc3OTkgMTYuMTcyNCAxMy43Nzk5IDE1LjcxNDNDMTMuNzc5OSAxNS4yNTYyIDE0LjE0NjQgMTQuODgzNCAxNC41OTY5IDE0Ljg4MzRaTTEuNTcyNDQgMTAuNzI3NEgzLjI3Mjk5QzMuNTcyNSAxMS42MzIxIDQuNDEzOTYgMTIuMjg1NyA1LjQwMzE5IDEyLjI4NTdDNi4zOTI0MiAxMi4yODU3IDcuMjMzODIgMTEuNjMyMSA3LjUzMzM0IDEwLjcyNzRIMTguNDI3NkMxOC44MjI2IDEwLjcyNzQgMTkuMTQyOCAxMC40MDE3IDE5LjE0MjggOS45OTk5NkMxOS4xNDI4IDkuNTk4MjMgMTguODIyNiA5LjI3MjU0IDE4LjQyNzYgOS4yNzI1NEw3LjUzMzM0IDkuMjcyNTRDNy4yMzM4MiA4LjM2Nzg2IDYuMzkyMzcgNy43MTQyNSA1LjQwMzE0IDcuNzE0MjVDNC40MTM5MSA3LjcxNDI1IDMuNTcyNDYgOC4zNjc4NiAzLjI3Mjk1IDkuMjcyNTRIMS41NzI0QzEuMTc3MzcgOS4yNzI1NCAwLjg1NzExNyA5LjU5ODIzIDAuODU3MTE3IDkuOTk5OTZDMC44NTcxMTcgMTAuNDAxNyAxLjE3NzM3IDEwLjcyNzQgMS41NzI0NCAxMC43Mjc0Wk01LjQwMzE0IDkuMTY5MUM1Ljg1MzYyIDkuMTY5MSA2LjIyMDEzIDkuNTQxODMgNi4yMjAxMyA5Ljk5OTk2QzYuMjIwMTMgMTAuNDU4MSA1Ljg1MzYyIDEwLjgzMDggNS40MDMxNCAxMC44MzA4QzQuOTUyNjYgMTAuODMwOCA0LjU4NjE1IDEwLjQ1ODEgNC41ODYxNSA5Ljk5OTk2QzQuNTg2MTUgOS41NDE4MyA0Ljk1MjY2IDkuMTY5MSA1LjQwMzE0IDkuMTY5MVpNOS40MDIwNyA1LjAxMzJIMS41NzI0NEMxLjE3NzM3IDUuMDEzMiAwLjg1NzExNyA0LjY4NzUgMC44NTcxMTcgNC4yODU3N0MwLjg1NzExNyAzLjg4NDA0IDEuMTc3MzcgMy41NTgzNSAxLjU3MjQgMy41NTgzNUg5LjQwMjA3QzkuNzAxNTggMi42NTM2NyAxMC41NDMgMi4wMDAwNiAxMS41MzIzIDIuMDAwMDZDMTIuNTIxNSAyLjAwMDA2IDEzLjM2MyAyLjY1MzY3IDEzLjY2MjUgMy41NTgzNUwxOC40Mjc2IDMuNTU4MzVDMTguODIyNiAzLjU1ODM1IDE5LjE0MjggMy44ODQwNCAxOS4xNDI4IDQuMjg1NzdDMTkuMTQyOCA0LjY4NzUgMTguODIyNiA1LjAxMzIgMTguNDI3NiA1LjAxMzJMMTMuNjYyNSA1LjAxMzJDMTMuMzYzIDUuOTE3ODcgMTIuNTIxNSA2LjU3MTQ4IDExLjUzMjMgNi41NzE0OEMxMC41NDMgNi41NzE0OCA5LjcwMTU4IDUuOTE3ODcgOS40MDIwNyA1LjAxMzJaTTEyLjM0OTMgNC4yODU3MkMxMi4zNDkzIDMuODI3NTkgMTEuOTgyNyAzLjQ1NDg2IDExLjUzMjMgMy40NTQ4NkMxMS4wODE4IDMuNDU0ODYgMTAuNzE1MyAzLjgyNzY0IDEwLjcxNTMgNC4yODU3N0MxMC43MTUzIDQuNzQzOSAxMS4wODE4IDUuMTE2NTkgMTEuNTMyMyA1LjExNjU5QzExLjk4MjcgNS4xMTY1OSAxMi4zNDkzIDQuNzQzODUgMTIuMzQ5MyA0LjI4NTcyWiIgZmlsbD0iIzIzYTNkZSI+PC9wYXRoPjwvc3ZnPg==');
  }

  .reapit-connect-permission-container .reapit-connect-button.is-primary {
    display: inline-block;
    background-color: #0061a8;
    max-height: 48px;
    max-width: 290px;
    cursor: pointer;
    border: 0;
    padding: 0;
    color: white;
    padding: 0;
    font-weight: bold;
  }

  .reapit-connect-permission-container .reapit-connect-button.is-primary:hover {
    background-color: #23a4de;
  }

  .reapit-connect-permission-container .reapit-connect-button.is-primary.no-svg {
    max-width: 290px;
    width: 290px;
    padding: .75rem;
    font-size: 1.25rem;
    max-height: 48px;
  }

  .reapit-connect-permission-container .reapit-connect-button.is-close {
    border-radius: 100%;
    border: none;
    cursor: pointer;
    color: lightgray;
    background: none;
  }

</style>

<div class="reapit-connect-session">
  <div class={`reapit-connect-permission-container${showPermissionBlock ? ' is-active' : ''}`}>
    <div class="permission-info">
      <div class="header">
        <button class="reapit-connect-button is-close" on:click={() => showPermissionBlock = false}><CloseIcon /></button>
        <h3 class="title">Login With Reapit</h3>
      </div>
      <hr />
      <div class="permission-content">
        <p>COMPANY would like to share the following information from your reapit identity:</p>
        <ul>
          <li>Your name</li>
          <li>Your email</li>
          <li>Information about your company</li>
          <li>Permissions and other meta information about you in the Reapit system.</li>
        </ul>
      </div>
    </div>
    {#if showPermissionBlock}
      <button class="reapit-connect-button is-primary no-svg" on:click={agreeHandler}>Agree</button>
    {/if}
    {#if !showPermissionBlock}
      <button class="reapit-connect-button is-primary" on:click={handler}><SignInButton/></button>
    {/if}
  </div>
</div>
