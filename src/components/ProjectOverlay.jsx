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
          {projects.map((project) => (
            <li key={project.projectId}>
              <div
                data-testid="project-overlay-action"
                onClick={() => {
                  
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    setProject(project.projectId)
                    setShowProjectOverlay(!showProjectOverlay)
                  }
                }}
                tabIndex={0}
                role="button"
                aria-label="Select the Task Project"
              >
                {project.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  )
}
