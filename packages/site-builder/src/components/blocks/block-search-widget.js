// import { blockImage } from './block-image'

export const blockSearchWidget = {
  // id: 'search-widget',
  label: 'Search Widget',
  // draggable: true,
  attributes: { 'data-gjs-type': 'search-widget' },
  content: {
    script: function() {
      // alert('{[blockImage]} ')
      const styles = document.createElement('link')
      styles.href = 'https://web-components.reapit.cloud/search-widget.css'
      styles.rel = 'stylesheet'
      document.head.appendChild(styles)

      const initializeWidget = () => {
        // alert(this.id)
        new window.ReapitSearchWidgetComponent({
          theme: {
            baseBackgroundColor: '#fff',
            basefontSize: '16px',
            basefontColor: '#556986',
            inverseFontColor: '#fff',
            secondaryfontColor: '#95aac9',
            primaryHeadingFontSize: '22px',
            secondaryHeadingFontSize: '18px',
            baseFontFamily: '"Open Sans", sans-serif',
            headingFontFamily: '"Montserrat", sans-serif',
            primaryAccentColor: '#887e96',
            secondaryAccentColor: '#7d9d88',
            mapAccentColor: '',
            breakPoints: {
              mobile: '',
              tablet: '',
              laptop: '',
              desktop: '',
            },
          },
          apiKey: '',
          parentSelector: `#${this.id}`,
        })
      }

      const script = document.createElement('script')
      script.src = 'https://web-components.reapit.cloud/search-widget.js'
      script.async = true
      script.defer = true
      script.onload = initializeWidget
      document.body.appendChild(script)
    },
    style: {
      display: 'flex',
    },
  },
}
