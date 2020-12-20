import React from "react"

import { Container } from "./styles"

export default function Header({ title, children }) {
  return (
    <Container>
      <h1>{title}</h1>
      {children}
    </Container>
  )
}
