import React, {useState} from 'react'
import { FaTrashAlt, FaDotCircle } from 'react-icons/fa'
import { useProjectsValue, useSelectedProjectValue } from '../context'
import { firebase } from '../firebase'
 
export const IndividualProject = ({ project }) => {
  const [ showConfirm, setShowConfirm ] = useState(false)
  const { projects, setProjects } = useProjectsValue()
  const { setSelectedProjects } = useSelectedProjectValue()

  const deleteProject = docId => {
    firebase
      .firestore()
      .collection('projects')
      .doc(docId)
      .delete()
      .then(() => {
        setProjects([...projects])
        setSelectedProjects('INBOX')
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
        >
          <FaTrashAlt />
        </span>
        {showConfirm &&
          <div className="project-delete-modal">
            <div className="project-delete-modal_inner">
              <p>Are you sure you want to delete this project?</p>
              <button
                type="button"
                onClick={() => deleteProject(project.docId)}
              >
                Delete
              </button>
              <span onClick={() => setShowConfirm(!showConfirm)}>Cancel</span>
            </div>
          </div>
        }
    </>
  )
}
