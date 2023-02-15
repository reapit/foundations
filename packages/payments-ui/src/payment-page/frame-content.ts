export const frameContent = (acsUrl: string, cReq: string, threeDSSessionData: string) => `
<style>
  div {
    font-family: 'PT Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: normal;
    color: #646464;
    font-size: 16px;
    line-height: 1.25rem;
    letter-spacing: -1%;
    margin-bottom: 1.25rem;
  }

  button {
    display: inline-flex;
    position: relative;
    height: 2.5rem;
    padding: 0 1.75rem;
    justify-content: center;
    align-items: center;
    text-align: center;
    white-space: nowrap;
    cursor: pointer;
    text-transform: uppercase;
    border-radius: 4px;
    border: none;
    font-size: 1rem;
    font-family: 'PT Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-weight: bold;
    color: #fff;
    background-color: #ffb71b;
    outline-color: #ffb71b;
  }
</style>

<form action="${acsUrl}" method="post">
  <input type="hidden" name="creq" value="${cReq}" />
  <input type="hidden" name="threeDSSessionData" value="${threeDSSessionData}" />
  <div>
    Your bank requires you to perform a 3D security check before completing this transaction. By clicking the below
    button you will be redirected to the 3D secure page and returned back to Reapit Payments on completion.
  </div>
  <button type="submit" value="Go">Perform Check</button>
</form>
`
