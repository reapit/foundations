import agentAndSon from '../images/agent-and-son.png'
import ourApproach from '../images/approach.jpg'
import heroImage from '../images/header.jpg'

export const reapitAndSons = `
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Open+Sans&display=swap');
    <style>
    /* Base */
    body {
      margin: 0;
      font-size: 16px;
    }
  
    /* Font */
    body {
      font-family: 'Open Sans', sans-serif;
    }
  
    /* Navbar */
    #path-bar {
      fill: #8a8a8a;
    }
  
    #navbar {
      padding: 0rem 1.75rem;
      color: #8a8a8a;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  
    @media (max-width: 565px) {
      #navbar {
        padding: 0rem 0.5rem;
      }
    }
  
    #navbar img {
      margin: 1.75rem 0rem;
    }
  
    #navbar > svg {
      font-family: 'Open Sans', sans-serif;
    }
  
    /* Widget */
  
    #reapit-search-widget-container {
      width: 100vw;
      min-height: 550px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      flex-direction: column;
      margin-bottom: 2rem;
    }

    #reapit-search-widget .search-widget {
      z-index: 1;
      width: 80%;
      margin: 0 auto;
    }

    @media (max-width: 768px) {
      #reapit-search-widget .search-widget {
        width: 90%;
      }
    }

    #reapit-search-widget .search-widget {
      background: rgba(255, 255, 255, 0.9);
    }
  
    #main-image {
      position: absolute;
      top: 0;
      width: 100%;
      height: 550px;
      object-fit: cover;
    }
  
    #widget > img {
      width: 100vw;
    }
  
    /* Place holder */
    #place-holder {
      padding: 1.75rem 0rem;
    }
  
    /* Our approach */
    #approach {
      display: flex;
      color: white;
      z-index: 1;
      position: relative;
    }
  
    #approach div {
      flex: 1;
    }
  
    #approach > #our-approach {
      color: #8a8a8a;
      padding: 0 2rem 4rem 2rem;
      display: flex;
      flex-direction: column;
      font-size: 20px;
    }
  
    #approach > #img-approach {
      padding: 0px 2rem 4rem 2rem;
    }
  
    #approach button {
      margin-top: 1rem;
      background: #887d97;
      color: white;
      padding: 0.75rem 1.75rem;
      border: 0rem;
      margin-left: auto;
      font-weight: bold;
      font-size: 1em;
    }
  
    #approach img {
      width: 100%;
      object-fit: cover;
    }
  
    @media (max-width: 565px) {
      #approach > #our-approach {
        padding: 1rem;
        font-size: 1rem;
      }
  
      #approach > #img-approach {
        padding: 1rem;
      }
    }
  
    /* Our approuch - handle responsive */
    @media (max-width: 768px) {
      #approach {
        display: block;
      }
    }
  
    @media (min-width: 1024px) {
      #approach > #our-approach > h1 {
        font-size: 48px;
      }
    }
  
    #approach > #our-approach > h1 {
      margin-top: 0;
    }
  </style>
  <!-- Navbar -->
  <div id="navbar">
    <!-- Menu Icon -->
    <svg
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
      width="36"
      height="36"
      viewBox="0 0 24 24"
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path id="path-bar" d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </svg>
    <img src="${agentAndSon}" />
    <!-- Header -->
    <!-- <h1>AGENT & SONS</h1> -->
  
    <!-- Empty div for align purpose -->
    <div></div>
  </div>
  
  <!-- Widget -->
  <div id="widget">
    <div id="reapit-search-widget-container">
      <img id="main-image" src="${heroImage}" />
    </div>
  </div>
  
  <!-- Our approach -->
  <div id="approach">
    <div id="our-approach">
      <h1>Our Approach</h1>
      <p>
        Agent and Sons are an independent Estate Agent based in London,
        incorporating a professional team offering services in Sales and Lettings.
        Our dedicated Property Managers and Negotiators have a vast knowledge in
        the local and surrounding areas which allows us to provide a personal
        service.
      </p>
      <p>
        Being an independent agent allows us to put our clients first. Whether you
        are selling, letting, buying or renting our experienced and friendly team
        can help.
      </p>
      <button>MORE</button>
    </div>
    <div id="img-approach">
      <img src="${ourApproach}" />
    </div>
  </div>
  
`
