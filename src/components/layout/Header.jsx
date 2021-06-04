import React, { useState } from 'react'
import { FaPizzaSlice, FaBars } from 'react-icons/fa'
import { AddTasks } from '../AddTasks'

export const Header = ({ darkMode, setDarkMode, showSidebar, setShowSidebar }) => {
  const [shouldShowMain, setShouldShowMain] = useState(false)
  const [showQuickAddTask, setShowQuickAddTask] = useState(false)
  
  return (
    <header className="header" data-testid="header" >
      <nav>
          <div className="menu-bar"
            onClick={() => {
              setShowSidebar(!showSidebar)
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setShowSidebar(!showSidebar)
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Show/hide sidebar"
          >
            <FaBars />
          </div>
          {/* <div className="logo">
            <img src="/images/logo.png" alt="Todolist" />
          </div> */}
        <div className="settings">
          <ul>
            <li>
              <div
                data-testid="quick-add-task-action"
                className="settings_add"
                onClick={() => {
                  setShowQuickAddTask(true)
                  setShouldShowMain(false)
                }}
                onKeyDown={() => {
                  setShowQuickAddTask(true)
                  setShouldShowMain(false)
                }}
                role="button"
                tabIndex={0}
              >
                +
              </div>
            </li>
            <li
              
            >
              <div
                data-testid="dark-mode-action"
                className="settings_darkmode"
                onClick={() => setDarkMode(!darkMode)}
                onKeyDown={() => setDarkMode(!darkMode)}
                tabIndex={0}
                role="button"
              >
                <FaPizzaSlice />
              </div>
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
