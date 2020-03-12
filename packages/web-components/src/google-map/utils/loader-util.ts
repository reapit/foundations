export default function(url: string, callback: () => {}, options = { async: true, defer: true }) {
  const tag = document.createElement('script')
  tag.src = url
  tag.async = options.async
  tag.defer = options.defer
  tag.onload = callback
  document.body.appendChild(tag)
}
