import React, { useState, useCallback, useEffect } from "react"

import Header from "../../components/Header"
import api from "../../services/api"

import { Container } from "./styles"

const Main = () => {
  const [projects, setProjects] = useState([])

  const fetchProjects = useCallback(async () => {
    try {
      const { data } = await api.get("projects")

      console.log("data", data)
      setProjects(data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleAddProjects = useCallback(() => {
    setProjects([...projects, `newProject ${Date.now()}`])
  }, [projects])

  return (
    <Container>
      <Header title="Projects" />

      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>

      <button type="button" onClick={handleAddProjects}>
        Add new project
      </button>
    </Container>
  )
}

export default Main
