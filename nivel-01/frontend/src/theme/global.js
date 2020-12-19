import { createGlobalStyle } from "styled-components"

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body, #root {
    width: 100%;
    min-height: 100vh;

    font-family: sans-serif;
  }

  body {
    -webkit-font-smoothing: antialiased;
    
    background-size: cover;
    background-color: #9593D9;
  }
`
