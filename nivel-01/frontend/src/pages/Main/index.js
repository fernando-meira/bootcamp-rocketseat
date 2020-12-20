import React, { useState, useCallback, useEffect } from "react"

import Header from "../../components/Header"
import api from "../../services/api"

import { Container } from "./styles"

const Main = () => {
  const [projects, setProjects] = useState([])
  const [newProject, setNewProject] = useState("")

  const fetchProjects = useCallback(async () => {
    try {
      const { data } = await api.get("projects")

      setProjects(data)
    } catch (error) {
      console.log(error)
    }
  }, [])

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault()

      const project = {
        title: newProject,
        url: "https://github.com/fernando-meira",
        techs: ["Node", "Express", "TypeScript"],
      }

      try {
        const { data } = await api.post("projects", {
          ...project,
        })

        setProjects([...projects, data])
        setNewProject("")
      } catch (error) {
        console.log(error)
      }
    },
    [projects, newProject]
  )

  useEffect(() => {
    fetchProjects()
  }, [])

  return (
    <Container>
      <Header title="Projects" />

      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
        />

        <button type="submit">Adicionar</button>
      </form>
    </Container>
  )
}

export default Main
