/* istanbul ignore file */
// Can't add tests to this file because of the way Jest transpiles Swagger UI throws an error
/* purgecss start ignore */
import { css } from '@linaria/core'
import { bluePrimaryMedium, greyDark, greyLight } from '../../../core/__styles__/colors'

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
    background-color: #f5f5f5;
  }

  *::-webkit-scrollbar-track {
    border-radius: 10px;
    background-color: #f5f5f5;
  }

  *::-webkit-scrollbar-thumb {
    border-radius: 10px;
    background-color: #555;
  }

  *::-webkit-scrollbar-thumb:hover {
    background-color: #828587;
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
      font-family: 'PT Sans', Helvetica, sans-serif;
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
      font-family: 'PT Sans', Helvetica, sans-serif;
    }

    .info a {
      color: ${bluePrimaryMedium};
    }

    .info table {
      font-family: 'PT Sans', Helvetica, sans-serif;
      font-size: 1rem;
    }

    a {
      color: ${bluePrimaryMedium};
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
      font-family: 'PT Sans', Helvetica, sans-serif;
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
      color: ${greyDark};
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
        background: ${greyLight};
        margin: 1rem 0;
      }
    }

    .model {
      td,
      .prop-type {
        font-family: 'Source Code Pro', monospace;
      }

      .prop-type {
        color: ${greyDark};
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
        font-family: 'PT Sans', Helvetica, sans-serif;
      }
    }

    p,
    .markdown,
    .opblock-summary-description {
      font-family: 'PT Sans', Helvetica, sans-serif;
      color: ${greyDark};
    }
  }
`
/* purgecss end ignore */

export const swaggerHidden = css`
  display: none;
`
