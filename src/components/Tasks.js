import React from 'react'
import { Checkbox } from './Checkbox'

export const Tasks = () => {
  const tasks = []

  const projectName = ''

  return (
    <div className="tasks" data-testid="tasks">
      <h2 data-testid="project-name">{projectName}</h2>
      <ul className="tasks_list">
        {tasks.map(task => (
          <li key={task.id}>
            <Checkbox />
            <span>{task.task}</span>
          </li>
        ) )}
      </ul>
    </div>
  )
}
