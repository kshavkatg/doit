import React, { useState } from 'react'
import { useProjectsValue, useSelectedProjectsValue } from '../context'

export const Projects = ({ activeValue = null }) => {
const [ active, setActive ] = useState(activeValue)
const { setProjects } = useSelectedProjectsValue()
const { projects } = useProjectsValue()
console.log(projects)
  return (
    projects && 
    projects.map(project => (
      <li
        key={project.projectId}
        data-doc-id={project.docId}
        data-testid="project-action"
        className={
          active === project.projectId
            ? 'active sidebar_project'
            : 'sidebar_project'
        }
        onClick={() => {
          setActive(project.projectId)
          setProjects(project.projectId)
        }}
        >
          {projects[0].name}
        </li>
    ))
    
  )
}
