/* eslint-disable */
const initChatlioBot = (loginIdentity) => {
  return new Promise((resolve) => {
    // @ts-ignore
    window._chatlio = window._chatlio || []

    !(function () {
      var t = document.getElementById('chatlio-widget-embed')
      // @ts-ignore
      if (t && window.ChatlioReact && _chatlio.init) return void _chatlio.init(t, ChatlioReact)
      for (
        var e = function (t) {
            return function () {
              // @ts-ignore
              _chatlio.push([t].concat(arguments))
            }
          },
          i = ['configure', 'identify', 'track', 'show', 'hide', 'isShown', 'isOnline', 'page', 'open', 'showOrHide'],
          a = 0;
        a < i.length;
        a++
      )
        // @ts-ignore
        _chatlio[i[a]] || (_chatlio[i[a]] = e(i[a]))
      var n = document.createElement('script'),
        c = document.getElementsByTagName('script')[0]
      ;(n.id = 'chatlio-widget-embed'),
        (n.src = 'https://w.chatlio.com/w.chatlio-widget.js'),
        (n.async = !0),
        n.setAttribute('data-embed-version', '2.3')
      n.setAttribute('data-widget-id', process.env.chatbotAppId)
      // @ts-ignore
      c.parentNode.insertBefore(n, c)

      if (loginIdentity) {
        document.addEventListener('chatlio.ready', function () {
          // @ts-ignore
          _chatlio.identify(loginIdentity.developerId || '', {
            name: loginIdentity.name || '',
            email: loginIdentity.email || '',
          })
        })
      }
      // @ts-ignore
      resolve()
    })()
  })
}

const initZendeskBot = (loginIdentity) => {
  const head = document.querySelector('head')
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.id = 'ze-snippet'
  // @ts-ignore
  script.src = process.env.zendeskUri
  // @ts-ignore
  head.appendChild(script)

  script.onload = () => {
    // @ts-ignore
    zE(function () {
      // @ts-ignore
      zE.identify({
        name: loginIdentity.name,
        email: loginIdentity.email,
      })
    })
  }
}

const openChatbot = (loginIdentity) => {
  const isLocal = process.env.appEnv === 'local'

  if (!isLocal) {
    // @ts-ignore
    if (!window.zE) {
      initZendeskBot(loginIdentity)
    }
  }
}

export { openChatbot, initChatlioBot, initZendeskBot }
