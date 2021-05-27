import React from 'react'
import { useProjectsValue } from '../context'

export const ProjectOverlay = ({
  setProject,
  showProjectOverlay,
  setShowProjectOverlay
}) => {

  const { projects } = useProjectsValue()
  
  return (
    projects && showProjectOverlay 
    && (
      <div
        className="project-overlay"
        data-testid="project-overlay"
      >
        <ul className="project-overlay_list">
          {projects.map((project, i) => (
            <li
              key={i}
              data-testid="project-overlay-action"
              onClick={() => {
                setProject(project.projectId)
                setShowProjectOverlay(!showProjectOverlay)
            }}
            >
              {project.name}
            </li>
          ))}
        </ul>
      </div>
    )
  )
}
