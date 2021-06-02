import React, { useState } from 'react'

import { useProjectsValue, useSelectedProjectValue } from '../context'
import { IndividualProject } from './IndividualProject'


export const Projects = ({ activeValue = null }) => {
const [ active, setActive ] = useState(activeValue)
const { setSelectedProject } = useSelectedProjectValue()
const { projects } = useProjectsValue()
  return (
    projects && 
    projects.map(project => (
      <li
        key={project.projectId}
        data-doc-id={project.docId}
        data-testid="project-action-parent"
        
        className={
          active === project.projectId
            ? 'active sidebar_project'
            : 'sidebar_project'
        }
      >
        <div
          onClick={() => {
            setActive(project.projectId)
            setSelectedProject(project.projectId)
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setActive(project.projectId)
              setSelectedProject(project.projectId)
            }
          }}
          data-testid="project-action"
          tabIndex={0}
          role="button"
          aria-label={`Show ${project.name}'s tasks `}
        >
          <IndividualProject project={project}/>
        </div>
      </li>
    ))
    
  )
}
