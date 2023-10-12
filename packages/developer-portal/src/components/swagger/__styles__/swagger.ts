/* istanbul ignore file */
// Can't add tests to this file because of the way Jest transpiles Swagger UI throws an error
/* purgecss start ignore */
import { css } from '@linaria/core'

/*
  Overrides file to make Swagger UI look more like the rest of the site.
  Some pretty horrible Sass in here however, need to be very specific to override defaults.
*/
export const swagger = css`
  // Can't reset the global scrollbar to default styles
  // Need to write custom styles
  *::-webkit-scrollbar {
    display: block;
    width: 12px;
    background-color: #f2f4f6;
  }

  *::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #f2f4f6;
  }

  *::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #f2f4f6;
  }

  *::-webkit-scrollbar-thumb:hover {
    background-color: #f2f4f6;
  }

  height: 100vh;
  width: 100%;
  background: #fff;

  .swagger-ui {
    width: 100%;

    p,
    a,
    .info,
    .markdown {
      font-family: 'Inter', Helvetica, sans-serif;
      font-size: 1rem;
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    .title,
    .model-title {
      font-family: 'Inter', Helvetica, sans-serif;
    }

    .info a {
      color: #4e56ea;
    }

    .info table {
      font-family: 'Inter', Helvetica, sans-serif;
      font-size: 1rem;
    }

    a {
      color: #4e56ea;
    }

    .loading,
    .scheme-container {
      display: none;
    }

    hgroup.main {
      pre.base-url {
        display: none;
      }
    }

    h2,
    .info h2 {
      font-family: 'Inter', Helvetica, sans-serif;
      font-size: 2rem;
      font-weight: bold;
    }

    .info h2 {
      margin-bottom: 1rem;
    }

    code,
    .prop-format {
      font-family: 'Source Code Pro', monospace;
      font-size: 1rem;
      color: unset;
      background: unset;
    }

    .auth-wrapper {
      padding-right: 1.5rem;
    }

    .wrapper {
      padding: 0;
      max-width: 100%;
    }

    .wrapper .block {
      background: #fff;
    }

    .information-container {
      display: none;
    }

    section.models {
      border: none;
      border-radius: none;

      .model-container {
        background: #f2f4f6;
        margin: 1rem 0;
      }
    }

    .model {
      td,
      .prop-type {
        font-family: 'Source Code Pro', monospace;
      }

      .prop-type {
        color: #607890;
      }
    }

    .opblock-tag,
    .opblock-summary-path {
      font-size: 1rem;
      font-weight: bold;
    }

    .opblock-tag {
      padding: 0.5rem 1rem;

      .markdown p {
        margin: 0;
      }

      small {
        font-size: 1rem;
        font-family: 'Inter', Helvetica, sans-serif;
      }
    }

    p,
    .markdown,
    .opblock-summary-description {
      font-family: 'Inter', Helvetica, sans-serif;
      color: #607890;
    }
  }
`
/* purgecss end ignore */

export const swaggerHidden = css`
  display: none;
`
