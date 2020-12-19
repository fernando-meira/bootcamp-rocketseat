import React, { useState, useCallback } from "react"

import Header from "../../components/Header"

import { Container } from "./styles"

const Main = () => {
  const [projects, setProjects] = useState([
    "First project with ReactJS",
    "First project with React Native",
  ])

  const handleAddProjects = useCallback(() => {
    setProjects([...projects, `newProject ${Date.now()}`])
  }, [projects])

  return (
    <Container>
      <Header title="Projects" />

      <ul>
        {projects.map((project, index) => (
          <li key={index}>{project}</li>
        ))}
      </ul>

      <button type="button" onClick={handleAddProjects}>
        Add new project
      </button>
    </Container>
  )
}

export default Main
