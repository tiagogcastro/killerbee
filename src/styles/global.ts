import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    outline: 0;
    border: none;
    text-decoration: none;
    list-style: none;
    font-family: 'IBM Plex Sans', sans-serif;
  }
  :root {
    --purple: #6200ee;
    --semi-white: #f9f9f9;
    --full-white: #FFFFFF;
    --black: #000000;
    --semi-gray: rgba(0, 0, 0, 0.87);
    --gray: rgba(0, 0, 0, 0.6);
    --white-gray: rgba(0, 0, 0, 0.12);
  }
  #root {
    width: 100%;
    height: 100vh;
  }
  body {
    background: var(--semi-white);
    width: 100%;
    height: 100vh;
  }
`