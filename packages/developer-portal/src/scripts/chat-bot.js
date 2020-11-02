const initChatBot = loginIdentity => {
  return new Promise(resolve => {
    window._chatlio = window._chatlio || []

    !(function() {
      var t = document.getElementById('chatlio-widget-embed')
      if (t && window.ChatlioReact && _chatlio.init) return void _chatlio.init(t, ChatlioReact)
      for (
        var e = function(t) {
            return function() {
              _chatlio.push([t].concat(arguments))
            }
          },
          i = ['configure', 'identify', 'track', 'show', 'hide', 'isShown', 'isOnline', 'page', 'open', 'showOrHide'],
          a = 0;
        a < i.length;
        a++
      )
        _chatlio[i[a]] || (_chatlio[i[a]] = e(i[a]))
      var n = document.createElement('script'),
        c = document.getElementsByTagName('script')[0]
      ;(n.id = 'chatlio-widget-embed'),
        (n.src = 'https://w.chatlio.com/w.chatlio-widget.js'),
        (n.async = !0),
        n.setAttribute('data-embed-version', '2.3')
      n.setAttribute('data-widget-id', window.reapit.config.chatbotAppId)
      c.parentNode.insertBefore(n, c)

      if (loginIdentity) {
        document.addEventListener('chatlio.ready', function() {
          _chatlio.identify(loginIdentity.developerId || '', {
            name: loginIdentity.name || '',
            email: loginIdentity.email || '',
          })
        })
      }
      resolve()
    })()
  })
}

const openChatbot = loginIdentity => {
  if (window._chatlio) {
    window._chatlio.open()
  } else {
    initChatBot(loginIdentity).then(() => {
      if (window._chatlio) {
        window._chatlio.open()
      }
    })
  }
}

module.exports = { openChatbot, initChatBot }
