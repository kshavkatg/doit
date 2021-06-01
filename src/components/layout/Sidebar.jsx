import React, { useState } from 'react'
import { 
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from 'react-icons/fa'
import { useSelectedProjectValue } from '../../context'
import { AddProject } from '../AddProject'
import { Projects } from '../Projects'

export const Sidebar = () => {
  const { setSelectedProject } = useSelectedProjectValue()
  const [ active, setActive ] = useState('inbox')
  const [ showProjects, setShowProjects ] = useState(true)

  return (
    <div className="sidebar" data-testid="sedebar">
      <ul className="sidebar_generic">
        <li>
          <div
            data-testid="inbox"
            className={ active === 'inbox'? 'active' : undefined }
            onClick={() => {
              setActive('inbox')
              setSelectedProject('INBOX')
            }}
            onKeyDown={(e) => {
              if(e.key === 'Enter') {
                setActive('inbox')
                setSelectedProject('INBOX')
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Show inbox tasks"
          >
            <span><FaInbox /></span>
            <span> Inbox</span>
          </div>
        </li> 
        <li>
          <div
            data-testid="today"
            className={ active === 'today'? 'active' : undefined }
            onClick={() => {
              setActive('today')
              setSelectedProject('TODAY')
            }}
             onKeyDown={(e) => {
              if(e.key === 'Enter') {
                setActive('today')
                setSelectedProject('TODAY')
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Show today's tasks"
          >
            <span><FaRegCalendar /></span>
            <span> Today</span>
          </div>
        </li>
        <li>
          <div
            data-testid="next_7"
            className={ active === 'next_7'? 'active' : undefined }
            onClick={() => {
              setActive('next_7')
              setSelectedProject('NEXT_7')
            }}
             onKeyDown={(e) => {
              if(e.key === 'Enter') {
                setActive('next_7')
                setSelectedProject('NEXT_7')
              }
            }}
            tabIndex={0}
            role="button"
            aria-label="Show tasks for the next week"
          >
            <span><FaRegCalendarAlt /></span>
            <span> Next 7 days</span>
          </div>
        </li>
      </ul>
      <div 
        className="sidebar_middle" 
        onClick={() => setShowProjects(!showProjects)}
        onKeyDown={(e) => {
          if(e.key === 'Enter') setShowProjects(!showProjects)
        }}
        tabIndex={0}
        role="button"
      >
        <span><FaChevronDown className={!showProjects? 'hidden-projects' : undefined} /></span>
        <h2> Projects</h2>
      </div>
      <ul className="sidebar_projects">{showProjects && <Projects />}</ul>
      {showProjects && <AddProject />}
    </div>
  )
}
