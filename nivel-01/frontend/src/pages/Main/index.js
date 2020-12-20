import React, { useState, useCallback, useEffect } from "react"

import Header from "../../components/Header"
import api from "../../services/api"

import { Container } from "./styles"

const Main = () => {
  const [projects, setProjects] = useState([])

  const fetchProjects = useCallback(async () => {
    try {
      const { data } = await api.get("projects")

      setProjects(data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  useEffect(() => {
    fetchProjects()
  }, [])

  const handleAddProjects = useCallback(async () => {
    const newProject = {
      title: `New Project ${Date.now()}`,
      url: "https://github.com/fernando-meira",
      techs: ["Node", "Express", "TypeScript"],
    }

    try {
      const { data } = await api.post("projects", {
        ...newProject,
      })

      setProjects([...projects, data])
    } catch (error) {
      console.log(error)
    }
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
