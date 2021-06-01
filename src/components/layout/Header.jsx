import React, { useState } from 'react'
import { FaPizzaSlice } from 'react-icons/fa'
import { AddTasks } from '../AddTasks'

export const Header = ({ darkMode, setDarkMode }) => {
  const [shouldShowMain, setShouldShowMain] = useState(false)
  const [showQuickAddTask, setShowQuickAddTask] = useState(false)
  
  return (
    <header className="header" data-testid="header" >
      <nav>
        <div className="logo">
          <img src="/images/logo.png" alt="Todolist" />
        </div>
        <div className="settings">
          <ul>
            <li
              data-testid="quick-add-task-action"
              className="settings_add"
              onClick={() => {
                setShowQuickAddTask(true)
                setShouldShowMain(false)
              }}
            >
              +
            </li>
            <li
              data-testid="dark-mode-action"
              className="settings_darkmode"
              onClick={() => setDarkMode(!darkMode)}
            >
              <FaPizzaSlice />
            </li>
          </ul>
        </div>
        <AddTasks 
          showAddTaskMain={false}
          shouldShowMain={shouldShowMain}
          showQuickAddTask={showQuickAddTask}
          setShowQuickAddTask={setShowQuickAddTask}
        />
      </nav>
    </header>
  )
}