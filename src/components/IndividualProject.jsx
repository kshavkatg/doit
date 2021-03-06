import React, {useState} from 'react'
import { FaTrashAlt } from 'react-icons/fa'
import { useProjectsValue, useSelectedProjectValue } from '../context'
import { firebase } from '../firebase'
 
export const IndividualProject = ({ project }) => {
  const [ showConfirm, setShowConfirm ] = useState(false)
  const { projects, setProjects } = useProjectsValue()
  const { setSelectedProject } = useSelectedProjectValue()

  const deleteProject = docId => {
    firebase
      .firestore()
      .collection('projects')
      .doc(docId)
      .delete()
      .then(() => {
        setProjects([...projects])
        setSelectedProject('INBOX')
      })
  }

  return (
    <>
      <span className="sidebar_dot">•</span>
      <span className="sidebar_project-name">{project.name}</span>
      <span 
        className="sidebar_project-delete"
        data-testid="delete-project"
        onClick={() => setShowConfirm(!showConfirm)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') setShowConfirm(!showConfirm)
        }}
        tabIndex={0}
        role="button"
        aria-label={`Delete ${project.name} project`}
      >
          <FaTrashAlt />
      </span>
        {showConfirm &&
          <div className="project-delete-modal">
            <div className="project-delete-modal_inner">
              <p>Are you sure you want to delete this project?</p>
              <div>
                <button
                  type="button"
                  onClick={() => deleteProject(project.docId)}
                >
                  Delete
                </button>
                <span 
                  onClick={() => setShowConfirm(!showConfirm)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') setShowConfirm(!showConfirm)
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label="Cencel delete project"
                >
                  Cancel
                </span>
              </div>
            </div>
          </div>
        }
    </>
  )
}
