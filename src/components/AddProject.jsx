import React, { useState } from 'react' 
import { useProjectsValue } from '../context'
import { generatePushID } from '../helpers'
import { firebase } from '../firebase'

export const AddProject = ({ shouldShow = false }) => {
  const [show, setShow] = useState(shouldShow)
  const [projectName, setProjectName] = useState('')

  const projectId = generatePushID()
  const { projects, setProjects } = useProjectsValue()

  const addProject = () => 
    projectName && 
    firebase
      .firestore()
      .collection('projects')
      .add({
        projectId,
        name: projectName,
        userId: 'vgWJG1rdEs1wuKBQEL7C',
      })
      .then(() => {
        setProjects([...projects])
        setProjectName('')
        setShow(false)
      })

  return (
    <div className="add-project" data-testid="add-project">
      {show && (
        <div className="add-project_input">
          <input
            value={projectName}
            onChange={e => setProjectName(e.target.value)}
            className="add-project_name"
            data-testid="project-name"
            type="text"
            placeholder="Name your project"
          />
          <button
            className="add-project_submit"
            type="button"
            onClick={() => addProject()}
            data-testid="add-project-submit"
          >
            Add Project
          </button>
          <span
            data-testid="hide-project-overlay"
            className="add-project_cancel"
            onClick={() => setShow(false)}
            onKeyDown={(e) => {
              if(e.key === 'Enter') setShow(false)
            }}
            tabIndex={0}
            role="button"
            aria-label="Cencel adding project"
          >
            Cancel
          </span>
        </div>
      )}
      <span 
        className="add-project_plus"
        data-testid="add-project-action"
        onClick={() => setShow(!show)}
        onKeyDown={(e) => {
              if(e.key === 'Enter') setShow(!show)
        }}
        tabIndex={0}
        role="button"
        aria-label="Add Project"
      >+</span>
      <span 
        data-testid="add-project-action"
        className="add-project_text"
        onClick={() => setShow(!show)}
        onKeyDown={(e) => {
              if(e.key === 'Enter') setShow(!show)
        }}
        tabIndex={0}
        role="button"
        aria-label="Add Project"
      >
        Add Project
      </span>
    </div>
  )
}
