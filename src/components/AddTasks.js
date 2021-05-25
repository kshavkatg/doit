import React, { useState } from 'react'
import { useSelectedProjectValue } from '../context'
import { firebase } from '../firebase'
import moment from 'moment'

export const AddTasks = ({ 
  shouldShowMain = false,
  showAddTaskMain = true,
  showQuickAddTask,
  setShowQuikAddTask
}) => {
  const [task, setTask] = useState('')
  const [taskDate, setTaskDate] = useState('')
  const [project, setProject] = useState('')
  const [showMain, setShowMain] = useState(shouldShowMain)
  const [showProjectOverlay, setShowProjectOverlay] = useState(false)
  const [showTaskDate, setShowTaskDate] = useState(false)

  const { selectedProject } = useSelectedProjectValue()

  const addTask = () => {
    const projectId = project || selectedProject
    let collatedDate = ''

    if (projectId === 'TODAY') {
      collatedDate = moment().format('DD/MM/YYYY')
    } else if (projectId === 'NEXT_7') {
      collatedDate = moment().add(7, 'days').format('DD/MM/YYYY')
    }

    return (
      task && projectId && 
      firebase
        .firestore()
        .collection('tasks')
        .add({
          archived: false,
          projectId,
          task,
          date: collatedDate || taskDate,
          userId: 'vgWJG1rdEs1wuKBQEL7C'
        })
        .then(() => {
          setTask('')
          setProject('')
          setShowMain('')
          setShowProjectOverlay(false)
        })
    )

   }

  return (
    <div
      className={showQuickAddTask? 'add-task add-task_overlay' : 'add-task'}
      data-testid="add-task-comp"
    >
      {showAddTaskMain && (
        <div 
          className="add-task_shallow"
          data-testid="show-main-action"
          onClick={() => setShowMain(!showMain)}
        >
          <span className="add-task_plus">+</span>
          <span className="add-task_text">Add Task</span>
        </div>
      )}
    </div>
  )
}
