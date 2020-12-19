import React, { useCallback, useState } from "react"

import { Header } from "./components"

function App() {
  const [projects, setProjects] = useState([
    "Desenvolvimento de app",
    "Front-end web",
  ])

  console.log(projects)

  const handleAddProject = useCallback(() => {
    setProjects([...projects, `Novo Projeto ${Date.now()}`])
  }, [projects])

  return (
    <>
      <Header title="Projects" />
      <ul>
        {projects.map((project, index) => (
          <li key={index}>{project}</li>
        ))}
      </ul>

      <button type="button" onClick={handleAddProject}>
        Adicionar projeto
      </button>
    </>
  )
}

export default App
