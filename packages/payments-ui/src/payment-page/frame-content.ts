export const frameContent = (acsUrl: string, cReq: string, threeDSSessionData: string) => `
  <form id="three-d-secure-form" action="${acsUrl}" method="post">
    <input type="hidden" name="creq" value="${cReq}" />
    <input type="hidden" name="threeDSSessionData" value="${threeDSSessionData}" />
  </form>
`
