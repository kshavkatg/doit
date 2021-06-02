import React from 'react'
import { Checkbox } from './Checkbox'
import { useTasks } from '../hooks'
import { useProjectsValue, useSelectedProjectValue } from '../context'
import { collatedTaskExist, getCollatedTitle, getTitle } from '../helpers'
import { collatedTasks } from '../constants'
import { AddTasks } from './AddTasks'

export const Tasks = () => {
  const {selectedProject} = useSelectedProjectValue()
  const {projects} = useProjectsValue()
  const {tasks} = useTasks(selectedProject)

  let projectName = ''


  if(projects && selectedProject && !collatedTaskExist(selectedProject)) {
    projectName = getTitle(projects, selectedProject).name
  }

  if (collatedTaskExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name
  }
  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="project-name">{projectName}</h2>
      <ul className="tasks_list">
        {tasks.map(task => (
          <li key={task.id}>
            <Checkbox id={task.id} />
            <span>{task.task}</span>
          </li>
        ) )}
      </ul>
      <AddTasks />
    </div>
  )
}
