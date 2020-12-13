import React from "react"

import { Header } from "./components"

function App() {
  return (
    <>
      <h1>Hello World</h1>
      <Header title="HomePage" />
      <Header title="Projects" />
      <Header>
        <ul>
          <li>Laranja</li>

          <li>Uva</li>

          <li>Amora</li>
        </ul>
      </Header>
    </>
  )
}

export default App
