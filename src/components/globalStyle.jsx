import { createGlobalStyle } from 'styled-components'

export const GlobalStyles = createGlobalStyle`
   *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
   }

   body {
      height: 100vh;
      -webkit-fonnt-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow: hidden;
   }
`
